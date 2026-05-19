import { io }
  from "socket.io-client";

export const socket =
  io(
    "http://localhost:3007",
    {
      autoConnect: false
    }
  );