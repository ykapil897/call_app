import {
  useEffect,
  useRef,
  useState
} from "react";

import {
  socket
} from "../socket/socket";

import {
  SOCKET_EVENTS
} from "../socket/socket.events";

const configuration = {

  iceServers: [

    {
      urls:
        "stun:stun.l.google.com:19302"
    }

  ]

};

export function useWebRTC(
  peerUserId: string
) {

  const peerConnection =
    useRef<RTCPeerConnection | null>(
      null
    );

  const localStream =
    useRef<MediaStream | null>(
      null
    );
    
  const remoteAudioRef =
    useRef<HTMLAudioElement>(
      null
    );

  const [muted, setMuted] =
    useState(false);

  useEffect(() => {

    let mounted = true;

    async function init() {

      const pc =
        new RTCPeerConnection(
          configuration
        );

      pc.onconnectionstatechange =
        () => {

          console.log(
            "CONNECTION STATE:",
            pc.connectionState
          );

        };

      peerConnection.current =
        pc;
        
      const stream =
        await navigator
          .mediaDevices
          .getUserMedia({

            audio: true,

            video: false

          });
      
      if (!mounted) {
        return;
      }

      localStream.current =
        stream;

      stream
        .getTracks()
        .forEach((track) => {

          pc!
            .addTrack(
              track,
              stream
            );

        });

      pc.ontrack =
          (event) => {

            console.log(
              "REMOTE TRACK RECEIVED"
            );

            if (
              remoteAudioRef.current
            ) {

              remoteAudioRef.current.srcObject =
                event.streams[0];
              
              remoteAudioRef.current
                .play()
                .catch(console.error);
                            
              console.log(
                "REMOTE STREAM SET",
                event.streams[0]
              );
            }

          };

      pc.onicecandidate =
          (event) => {

            if (
              event.candidate
            ) {
              
              console.log(
                "ICE GENERATED",
                event.candidate
              );

              socket.emit(

                SOCKET_EVENTS
                  .ICE_CANDIDATE,

                {

                  targetUserId:
                    peerUserId,

                  candidate:
                    event.candidate

                }

              );

              

            }

          };

    }

    init();

    socket.on(

      SOCKET_EVENTS
        .WEBRTC_OFFER,

      async ({
        fromUserId,
        offer
      }) => {

        await peerConnection
          .current!
          .setRemoteDescription(
            offer
          );

        const answer =
          await peerConnection
            .current!
            .createAnswer();

        await peerConnection
          .current!
          .setLocalDescription(
            answer
          );

        socket.emit(

          SOCKET_EVENTS
            .WEBRTC_ANSWER,

          {

            targetUserId:
              fromUserId,

            answer

          }

        );

      }

    );

    socket.on(

      SOCKET_EVENTS
        .WEBRTC_ANSWER,

      async ({
        answer
      }) => {

        const pc =
          peerConnection.current;

        if (!pc) {
          return;
        }

        if (
          pc.signalingState !==
          "have-local-offer"
        ) {

          console.warn(
            "Ignoring answer in state:",
            pc.signalingState
          );

          return;

        }

        await pc.setRemoteDescription(
          new RTCSessionDescription(
            answer
          )
        );

      }

    );

    socket.on(

      SOCKET_EVENTS
        .ICE_CANDIDATE,

      async ({
        candidate
      }) => {

        console.log(
          "ICE RECEIVED",
          candidate
        );

        const pc =
          peerConnection.current;

        if (
          !pc ||
          pc.signalingState === "closed"
        ) {
          return;
        }

        await pc.addIceCandidate(
          new RTCIceCandidate(
            candidate
          )
        );
      }

    );

    return () => {

      mounted = false;

      socket.off(
        SOCKET_EVENTS.WEBRTC_OFFER
      );

      socket.off(
        SOCKET_EVENTS.WEBRTC_ANSWER
      );

      socket.off(
        SOCKET_EVENTS.ICE_CANDIDATE
      );

      peerConnection
        .current
        ?.close();

      localStream.current
        ?.getTracks()
        .forEach((t) =>
          t.stop()
        );

    };

  }, []);

  async function createOffer() {

    const pc =
      peerConnection.current;

    if (!pc) {
      return;
    }

    const offer =
      await pc.createOffer();

    if (
      pc.signalingState !==
      "stable"
    ) {

      console.warn(
        "Ignoring offer in state:",
        pc.signalingState
      );

      return;

    }

    await pc.setLocalDescription(
      new RTCSessionDescription(
        offer
      )
    );

    socket.emit(

      SOCKET_EVENTS
        .WEBRTC_OFFER,

      {

        targetUserId:
          peerUserId,

        offer

      }

    );

  }

  function toggleMute() {

    const enabled =
      !muted;

    localStream.current
      ?.getAudioTracks()
      .forEach((track) => {

        track.enabled =
          !enabled;

      });

    setMuted(enabled);

  }

  return {

    createOffer,

    toggleMute,

    muted,

    remoteAudioRef

  };

}