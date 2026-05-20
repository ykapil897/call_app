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
    useRef<RTCPeerConnection>();

  const localStream =
    useRef<MediaStream>();

  const remoteAudioRef =
    useRef<HTMLAudioElement>(
      null
    );

  const [muted, setMuted] =
    useState(false);

  useEffect(() => {

    async function init() {

      peerConnection.current =
        new RTCPeerConnection(
          configuration
        );

      const stream =
        await navigator
          .mediaDevices
          .getUserMedia({

            audio: true,

            video: false

          });

      localStream.current =
        stream;

      stream
        .getTracks()
        .forEach((track) => {

          peerConnection.current!
            .addTrack(
              track,
              stream
            );

        });

      peerConnection.current
        .ontrack =
          (event) => {

            if (
              remoteAudioRef.current
            ) {

              remoteAudioRef.current.srcObject =
                event.streams[0];

            }

          };

      peerConnection.current
        .onicecandidate =
          (event) => {

            if (
              event.candidate
            ) {

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

        await peerConnection
          .current!
          .setRemoteDescription(
            answer
          );

      }

    );

    socket.on(

      SOCKET_EVENTS
        .ICE_CANDIDATE,

      async ({
        candidate
      }) => {

        await peerConnection
          .current!
          .addIceCandidate(
            candidate
          );

      }

    );

    return () => {

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

    const offer =
      await peerConnection
        .current!
        .createOffer();

    await peerConnection
      .current!
      .setLocalDescription(
        offer
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