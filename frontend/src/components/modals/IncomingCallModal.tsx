import {
  socket
} from "../../socket/socket";

import {
  SOCKET_EVENTS
} from "../../socket/socket.events";

import {
  useCallStore
} from "../../stores/call.store";

import {
  useNavigate
} from "react-router-dom";

export function
IncomingCallModal() {

  const navigate =
    useNavigate();

  const incomingCall =
    useCallStore(
      (s) =>
        s.incomingCall
    );

  const setIncomingCall =
    useCallStore(
      (s) =>
        s.setIncomingCall
    );

  const setActiveCall =
    useCallStore(
      (s) =>
        s.setActiveCall
    );

  if (!incomingCall) {
    return null;
  }

  function acceptCall() {

    socket.emit(

      SOCKET_EVENTS
        .CALL_ACCEPTED,

      {
        callId:
          incomingCall.callId
      }

    );

    setActiveCall({

      callId:
        incomingCall.callId,

      callerId:
        incomingCall.callerId,

      calleeId: "",

      status:
        "ANSWERED"

    });

    navigate(
      `/call/${incomingCall.callId}`
    );

    setIncomingCall(null);

  }

  function rejectCall() {

    socket.emit(

      SOCKET_EVENTS
        .CALL_REJECTED,

      {
        callId:
          incomingCall.callId
      }

    );

    setIncomingCall(null);

  }

  return (

    <div
      className="
        fixed
        inset-0
        bg-black/70
        flex
        items-center
        justify-center
        z-50
      "
    >

      <div
        className="
          p-10
          rounded-3xl
          bg-slate-900
          border
          border-slate-700
          shadow-2xl
          w-[420px]
          text-center
        "
      >

        <div
          className="
            w-24
            h-24
            rounded-full
            bg-green-500/20
            mx-auto
            animate-pulse
            mb-6
          "
        />

        <h1
          className="
            text-3xl
            font-bold
            mb-3
          "
        >
          Incoming Call
        </h1>

        <p
          className="
            text-slate-400
            mb-8
          "
        >
          {
            incomingCall
              .callerId
          }
        </p>

        <div
          className="
            flex
            justify-center
            gap-6
          "
        >

          <button

            onClick={
              rejectCall
            }

            className="
              px-8
              py-3
              rounded-2xl
              bg-red-600
              hover:bg-red-500
              hover:scale-105
              transition
            "
          >

            Reject

          </button>

          <button

            onClick={
              acceptCall
            }

            className="
              px-8
              py-3
              rounded-2xl
              bg-green-600
              hover:bg-green-500
              hover:scale-105
              transition
            "
          >

            Accept

          </button>

        </div>

      </div>

    </div>

  );

}