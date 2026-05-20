import {
  useEffect
} from "react";

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

export function useSocket() {

  const user =
    useAuthStore(
      (s) => s.user
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

      SOCKET_EVENTS
        .INCOMING_CALL,

      (data) => {

        setIncomingCall(
          data
        );

      }

    );

    socket.on(

        SOCKET_EVENTS
            .CALL_ACCEPTED,

        (data) => {

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