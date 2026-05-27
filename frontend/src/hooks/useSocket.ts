import {
  useEffect
} from "react";

import toast
  from "react-hot-toast";

import {
  socket
} from "../socket/socket";

import {
  SOCKET_EVENTS
} from "../socket/socket.events";

import {
  useAuthStore
} from "../stores/auth.store";

import {
  useCallStore
} from "../stores/call.store";

import { useNavigate
} from "react-router-dom";


export function useSocket() {

  const navigate =
    useNavigate();

  const user =
  useAuthStore(
    (s) => s.user
  );

  console.log(
    "User in socket hook:",
    user
  );

  const setActiveCall =
      useCallStore(
          (s) =>
          s.setActiveCall
  );

  const setIncomingCall =
    useCallStore(
      (s) =>
        s.setIncomingCall
    );

  useEffect(() => {

    if (!user) {
      console.log(
        "No user, not connecting socket"
      );
      return;
    }

    socket.io.opts.query = {

      userId:
        user.userId

    };

    socket.connect();

    const heartbeat =
      setInterval(() => {

        socket.emit(
          SOCKET_EVENTS.PING
        );

      }, 20000);

    
    socket.on(
      SOCKET_EVENTS.CALL_CREATED,
      (call) => {

        setActiveCall({

          callId:
            call.callId,

          callerId:
            call.callerId,

          calleeId:
            call.calleeId,

          status:
            "CREATED"

        });

        toast.loading("Calling...");

      }
    );
        


    socket.on(
      SOCKET_EVENTS.INCOMING_CALL,
      (data) => {

        setIncomingCall(data);

        toast.success(
          "Incoming call"
        );

      }
    );

    socket.on(

      SOCKET_EVENTS
        .CALL_ACCEPTED,

      (data) => {

        const current =
          useCallStore
            .getState()
            .activeCall;

        if (!current) {
          return;
        }

        // ONLY caller updates here
        if (
          current.callerId !==
          user?.userId
        ) {
          return;
        }

        setActiveCall({

          callId:
            data.callId,

          callerId:
            data.callerId,

          calleeId:
            data.calleeId,

          status:
            "ANSWERED"

        });

        navigate(
          `/call/${data.callId}`
        );

      }

    );

    socket.on(

      SOCKET_EVENTS
        .CALL_REJECTED,

      () => {

        toast.error(
          "Call rejected"
        );

      }

    );

    socket.on(

      SOCKET_EVENTS
        .CALL_ENDED,

      () => {

        toast(
          "Call ended"
        );

      }

    );

    socket.on(

      SOCKET_EVENTS
        .CALL_MISSED,

      () => {

        toast.dismiss();

        toast(
          "Call missed"
        );

        useCallStore
          .getState()
          .setActiveCall(
            null
          );

        useCallStore
          .getState()
          .setIncomingCall(
            null
          );

      }

    );

    return () => {

      clearInterval(
        heartbeat
      );

      socket.disconnect();

    };

  }, [user]);

}