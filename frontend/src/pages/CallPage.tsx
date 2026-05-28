import {
  useEffect,
  useState
} from "react";

import {
  useNavigate
} from "react-router-dom";

import {
  socket
} from "../socket/socket";

import {
  SOCKET_EVENTS
} from "../socket/socket.events";

import {
  useCallStore
} from "../stores/call.store";

import {
  useWebRTC
} from "../hooks/useWebRTC";

import {
  CallControls
} from "../components/call/CallControls";

import {
  CallTimer
} from "../components/call/CallTimer";

import {
  RingingScreen
} from "../components/call/RingingScreen";

import {
  getInvoice,
  getBalance
} from "../api/billing.api";

import {
  useAuthStore
} from "../stores/auth.store";

export default function
CallPage() {

  const navigate =
    useNavigate();

  const activeCall =
    useCallStore(
      (s) =>
        s.activeCall
    );

  const user =
    useAuthStore(
      (s) => s.user
    );

  const setSummary =
    useCallStore(
      (s) => s.setSummary
    );

  const setActiveCall =
    useCallStore(
      (s) =>
        s.setActiveCall
    );

  const peerUserId =
    activeCall
      ? activeCall.callerId === user?.userId
        ? activeCall.calleeId
        : activeCall.callerId
      : "";

  console.log(
    "Peer User ID:",
    peerUserId
  );  
  
  const {

    createOffer,

    toggleMute,

    muted,

    remoteAudioRef

  } = useWebRTC(
    peerUserId
  );

  const [seconds, setSeconds] =
    useState(0);

  // const [connected, setConnected] =
  //   useState(false);

  const connected =
    activeCall?.status ===
    "ANSWERED";

  useEffect(() => {

    if (     
      activeCall?.status === "ANSWERED" &&
      activeCall?.callerId === user?.userId
    ) {

      console.log(
        "CREATE OFFER CHECK",
        {
          currentUser:
            user?.userId,
          callerId:
            activeCall?.callerId
        }
      );

      createOffer();

    }

  }, [
    activeCall,
    user
  ]);

  useEffect(() => {

    const interval =
      setInterval(() => {

        setSeconds(
          (s) => s + 1
        );

      }, 1000);

    socket.on(

      SOCKET_EVENTS
        .CALL_ENDED,

      async () => {

        if (!activeCall || !user) {

          setActiveCall(null);

          navigate("/");

          return;

        }

        const callId =
          activeCall.callId;

        const isCaller =
          activeCall.callerId ===
            user.userId;

        setActiveCall(null);

        navigate("/");

        if (isCaller) {

          const invoice =
            await getInvoice(callId);

          const balance =
            await getBalance(
              user.userId
            );

          setSummary({

            duration:
              seconds,

            amount:
              invoice.amount,

            balance:
              balance.balance

          });

        }

      }

    );

    return () => {

      clearInterval(
        interval
      );

      socket.off(
        SOCKET_EVENTS
          .CALL_ENDED
      );

    };

  }, []);

  async function hangup() {

    if (!activeCall || !user) {
      return;
    }

    const callId =
      activeCall.callId;

    const isCaller =
      activeCall.callerId ===
        user.userId;

    socket.emit(
      SOCKET_EVENTS.CALL_ENDED,
      { callId }
    );

    setActiveCall(null);

    navigate("/");

    if (isCaller) {

      const invoice =
        await getInvoice(callId);

      const balance =
        await getBalance(
          user.userId
        );

      setSummary({
        duration: seconds,
        amount: invoice.amount,
        balance: balance.balance
      });

    }

  }

  return (

    <div
      className="
        min-h-screen
        flex
        flex-col
        items-center
        justify-center
        gap-10
      "
    >

      {
        !connected
          ? (

            <RingingScreen />

          )
          : (

            <>

              <div
                className="
                  w-40
                  h-40
                  rounded-full
                  bg-green-500/20
                  animate-pulse
                "
              />

              <h1
                className="
                  text-4xl
                  font-bold
                "
              >
                Active Call
              </h1>

              <CallTimer
                seconds={seconds}
              />

            </>

          )
      }

      <CallControls
        muted={muted}
        onMute={toggleMute}
        onHangup={hangup}
      />

      <audio
        autoPlay
        ref={remoteAudioRef}
      />

    </div>

  );

}