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

import {
  CallSummaryModal
} from "../components/modals/CallSummaryModal";

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

  const {

    summaryOpen,

    callSummary,

    setSummary,

    closeSummary

  } = useCallStore();

  const setActiveCall =
    useCallStore(
      (s) =>
        s.setActiveCall
    );

  const peerUserId =
    activeCall?.callerId ||
    "";

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

  const [connected, setConnected] =
    useState(false);

  useEffect(() => {

    createOffer();

  }, []);

  useEffect(() => {

    const interval =
      setInterval(() => {

        setSeconds(
          (s) => s + 1
        );

      }, 1000);

    socket.on(

      SOCKET_EVENTS
        .CALL_ACCEPTED,

      () => {

        setConnected(true);

      }

    );

    socket.on(

      SOCKET_EVENTS
        .CALL_ENDED,

      async () => {

        if (
          activeCall &&
          user
        ) {

          const invoice =
            await getInvoice(
              activeCall.callId
            );

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

        setActiveCall(
          null
        );

        navigate("/");

      }

    );

    return () => {

      clearInterval(
        interval
      );

      socket.off(
        SOCKET_EVENTS
          .CALL_ACCEPTED
      );

      socket.off(
        SOCKET_EVENTS
          .CALL_ENDED
      );

    };

  }, []);

  function hangup() {

    socket.emit(

      SOCKET_EVENTS
        .CALL_ENDED,

      {
        callId:
          activeCall?.callId
      }

    );

    setActiveCall(
      null
    );

    navigate("/");

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

      <CallSummaryModal

        open={summaryOpen}

        duration={
          callSummary?.duration || 0
        }

        amount={
          callSummary?.amount || 0
        }

        balance={
          callSummary?.balance || 0
        }

        onClose={closeSummary}

      />

      <audio
        autoPlay
        ref={remoteAudioRef}
      />

    </div>

  );

}