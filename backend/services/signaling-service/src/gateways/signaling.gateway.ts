import {
  Server,
  Socket
} from "socket.io";

import {
  SIGNALING_EVENTS
} from "../events/signaling.events";

import {
  CallService
} from "../services/CallService";

import {
  PresenceService
} from "../services/PresenceService";

import {
  RedisPresenceRepository
} from "../repositories/RedisPresenceRepository";

import {
  socketRegistry
} from "../infrastructure/SocketRegistry";

const callService =
  new CallService();

const presenceService =
  new PresenceService(
    new RedisPresenceRepository()
  );

export function registerSignalingGateway(
  io: Server
) {

  io.on(
    "connection",
    async (socket: Socket) => {

      const userId =
        socket.handshake.query.userId as string;

      console.log(
        `connected ${userId}`
      );

      socketRegistry.set(
        socket.id,
        socket
      );

      await presenceService.setOnline(
        userId,
        socket.id
      );

      socket.on(
        SIGNALING_EVENTS.CALL_USER,
        async (data) => {

          const calleeSocketId =
            await presenceService.getSocketId(
              data.calleeId
            );

          if (!calleeSocketId) {
            return;
          }

          const calleeSocket =
            socketRegistry.get(
              calleeSocketId
            );

          if (!calleeSocket) {
            return;
          }

          const call =
            callService.createCall(
              userId,
              data.calleeId
            );

          calleeSocket.emit(
            SIGNALING_EVENTS.INCOMING_CALL,
            {
              callId: call.callId,
              callerId: userId,
              mediaType: "AUDIO"
            }
          );

        }
      );

      socket.on(
        SIGNALING_EVENTS.ACCEPT_CALL,
        async (data) => {

          const callerSocketId =
            await presenceService.getSocketId(
              data.callerId
            );

          if (!callerSocketId) {
            return;
          }

          const callerSocket =
            socketRegistry.get(
              callerSocketId
            );

          callerSocket?.emit(
            SIGNALING_EVENTS.CALL_ACCEPTED,
            data
          );

        }
      );

      socket.on(
        SIGNALING_EVENTS.WEBRTC_OFFER,
        async (data) => {

          const calleeSocketId =
            await presenceService.getSocketId(
              data.calleeId
            );

          if (!calleeSocketId) {
            return;
          }

          const calleeSocket =
            socketRegistry.get(
              calleeSocketId
            );

          calleeSocket?.emit(
            SIGNALING_EVENTS.WEBRTC_OFFER,
            data
          );

        }
      );

      socket.on(
        SIGNALING_EVENTS.WEBRTC_ANSWER,
        async (data) => {

          const callerSocketId =
            await presenceService.getSocketId(
              data.callerId
            );

          if (!callerSocketId) {
            return;
          }

          const callerSocket =
            socketRegistry.get(
              callerSocketId
            );

          callerSocket?.emit(
            SIGNALING_EVENTS.WEBRTC_ANSWER,
            data
          );

        }
      );

      socket.on(
        SIGNALING_EVENTS.ICE_CANDIDATE,
        async (data) => {

          const targetSocketId =
            await presenceService.getSocketId(
              data.targetUserId
            );

          if (!targetSocketId) {
            return;
          }

          const targetSocket =
            socketRegistry.get(
              targetSocketId
            );

          targetSocket?.emit(
            SIGNALING_EVENTS.ICE_CANDIDATE,
            data
          );

        }
      );

      socket.on(
        "disconnect",
        async () => {

          console.log(
            `disconnected ${userId}`
          );

          socketRegistry.delete(
            socket.id
          );

          await presenceService.remove(
            userId
          );

        }
      );

    }
  );

}