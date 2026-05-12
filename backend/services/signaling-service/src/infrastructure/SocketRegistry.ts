import { Socket } from "socket.io";

export const socketRegistry =
  new Map<string, Socket>();