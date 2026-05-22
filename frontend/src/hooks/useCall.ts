import { socket }
  from "../socket/socket";

import { SOCKET_EVENTS }
  from "../socket/socket.events";

export function useCall() {

  function callUser(
    calleeId: string
  ) {

    socket.emit(
      SOCKET_EVENTS.CALL_USER,
      {
        calleeId
      }
    );

  }

  return {
    callUser
  };

}