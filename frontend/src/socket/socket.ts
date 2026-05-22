import { io }
  from "socket.io-client";

export const socket =
  io(

    import.meta.env
      .VITE_SIGNALING_URL,
    
    {

      autoConnect: false,

      reconnection: true,

      reconnectionAttempts: 10,

      reconnectionDelay: 1000

    }
    
  );