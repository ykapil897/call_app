import { Server }
  from "socket.io";

import { v4 as uuid }
  from "uuid";

import {
  RedisPresenceRepository
} from "../repositories/RedisPresenceRepository";

import {
  ActiveCallStore
} from "../stores/ActiveCallStore";

import {
  CallEventProducer
} from "../events/CallEventProducer";

import {
  CallEventType
} from "../config/events";

const presenceRepo =
  new RedisPresenceRepository();

const callStore =
  new ActiveCallStore();

const producer =
  new CallEventProducer();

export function
registerSignalingGateway(
  io: Server
) {

  io.on(
    "connection",
    async (socket) => {

      const userId =
        socket.handshake.query
          .userId as string;

      if (!userId) {

        socket.disconnect();

        return;

      }

      await presenceRepo.setOnline(
        userId,
        socket.id
      );

      console.log(
        `${userId} connected`
      );

      socket.on(
        "PING",
        async () => {

          await presenceRepo.refresh(
            userId
          );

        }
      );

      socket.on(
        "WEBRTC_OFFER",
        async ({
          targetUserId,
          offer
        }) => {

          const targetSocketId =
            await presenceRepo.getSocketId(
              targetUserId
            );

          if (!targetSocketId) {
            return;
          }

          io.to(
            targetSocketId
          ).emit(
            "WEBRTC_OFFER",
            {
              fromUserId:
                userId,
              offer
            }
          );

        }
      );

      socket.on(
        "WEBRTC_ANSWER",
        async ({
          targetUserId,
          answer
        }) => {

          const targetSocketId =
            await presenceRepo.getSocketId(
              targetUserId
            );

          if (!targetSocketId) {
            return;
          }

          io.to(
            targetSocketId
          ).emit(
            "WEBRTC_ANSWER",
            {
              fromUserId:
                userId,
              answer
            }
          );

        }
      );

      socket.on(
        "ICE_CANDIDATE",
        async ({
          targetUserId,
          candidate
        }) => {

          const targetSocketId =
            await presenceRepo.getSocketId(
              targetUserId
            );

          if (!targetSocketId) {
            return;
          }

          io.to(
            targetSocketId
          ).emit(
            "ICE_CANDIDATE",
            {
              fromUserId:
                userId,
              candidate
            }
          );

        }
      );

      socket.on(
        "CALL_USER",
        async ({ calleeId }) => {

          const existingCall =
            callStore.findByUser(
              userId
            );

          if (existingCall) {

            socket.emit(
              "CALL_FAILED",
              {
                reason:
                  "USER_BUSY"
              }
            );

            return;

          }

          const calleeSocketId =
            await presenceRepo.getSocketId(
              calleeId
            );

          if (!calleeSocketId) {

            socket.emit(
              "CALL_FAILED",
              {
                reason:
                  "USER_OFFLINE"
              }
            );

            return;

          }

          const callId =
            uuid();

          const timeout =
            setTimeout(
              async () => {

                const call =
                  callStore.get(
                    callId
                  );

                if (
                  !call ||
                  call.status ===
                    "ANSWERED"
                ) {
                  return;
                }

                call.status =
                  "MISSED";

                await producer.publish({

                  event:
                    CallEventType.CALL_MISSED,

                  callId,

                  callerId:
                    userId,

                  calleeId,

                  timestamp:
                    Date.now()

                });

                io.to(
                  socket.id
                ).emit(
                  "CALL_MISSED",
                  {
                    callId
                  }
                );

                callStore.delete(
                  callId
                );

              },

              60000
            );

          callStore.set({

            callId,

            callerId:
              userId,

            calleeId,

            status:
              "CREATED",

            createdAt:
              Date.now(),

            timeout

          });

          io.to(socket.id).emit(
            "CALL_CREATED",
            {
              callId,
              callerId: userId,
              calleeId
            }
          );

          await producer.publish({

            event:
              CallEventType.CALL_CREATED,

            callId,

            callerId:
              userId,

            calleeId,

            timestamp:
              Date.now()

          });

          io.to(
            calleeSocketId
          ).emit(
            "INCOMING_CALL",
            {
              callId,
              callerId:
                userId
            }
          );

        }
      );

      socket.on(
        "CALL_ACCEPTED",
        async ({ callId }) => {

          const call =
            callStore.get(
              callId
            );

          if (!call) {
            return;
          }

          clearTimeout(
            call.timeout
          );

          call.status =
            "ANSWERED";

          call.answeredAt =
            Date.now();

          await producer.publish({

            event:
              CallEventType.CALL_ANSWERED,

            callId,

            callerId:
              call.callerId,

            calleeId:
              call.calleeId,

            timestamp:
              call.answeredAt

          });

          const callerSocketId =
            await presenceRepo.getSocketId(
              call.callerId
            );

          if (
            callerSocketId
          ) {

            io.to(
              callerSocketId
            ).emit(
              "CALL_ACCEPTED",
              {
                callId,
                callerId:
                  call.callerId,
                calleeId:
                  call.calleeId
              }
            );

            io.to(socket.id).emit(
              "CALL_ACCEPTED",
              {
                callId,
                callerId: call.callerId,
                calleeId: call.calleeId
              }
            );

          }

        }
      );

      socket.on(
        "CALL_REJECTED",
        async ({ callId }) => {

          const call =
            callStore.get(
              callId
            );

          if (!call) {
            return;
          }

          clearTimeout(
            call.timeout
          );

          call.status =
            "REJECTED";

          await producer.publish({

            event:
              CallEventType.CALL_REJECTED,

            callId,

            callerId:
              call.callerId,

            calleeId:
              call.calleeId,

            timestamp:
              Date.now()

          });

          const callerSocketId =
            await presenceRepo.getSocketId(
              call.callerId
            );

          if (
            callerSocketId
          ) {

            io.to(
              callerSocketId
            ).emit(
              "CALL_REJECTED",
              {
                callId
              }
            );

          }

          callStore.delete(
            callId
          );

        }
      );

      socket.on(
        "CALL_ENDED",
        async ({ callId }) => {

          const call =
            callStore.get(
              callId
            );

          if (!call) {
            return;
          }

          const endedAt =
            Date.now();

          const duration =
            call.answeredAt
              ? Math.floor(
                  (
                    endedAt -
                    call.answeredAt
                  ) / 1000
                )
              : 0;

          await producer.publish({

            event:
              CallEventType.CALL_ENDED,

            callId,

            callerId:
              call.callerId,

            calleeId:
              call.calleeId,

            duration,

            endedBy:
              userId,

            timestamp:
              endedAt

          });

          const peerId = userId === call.callerId
            ? call.calleeId
            : call.callerId 

          const peerSocketId =
            await presenceRepo.getSocketId(
              peerId
            );

          if (peerSocketId) {

            io.to(
              peerSocketId
            ).emit(
              "CALL_ENDED",
              {
                callId
              }
            );

          }

          callStore.delete(
            callId
          );

        }
      );

      socket.on(
        "disconnect",
        async () => {

          console.log(
            `${userId} disconnected`
          );

          await presenceRepo.remove(
            userId
          );

          const activeCall =
            callStore.findByUser(
              userId
            );

          if (!activeCall) {
            return;
          }

          const endedAt =
            Date.now();

          const duration =
            activeCall.answeredAt
              ? Math.floor(
                  (
                    endedAt -
                    activeCall.answeredAt
                  ) / 1000
                )
              : 0;

          await producer.publish({

            event:
              CallEventType.CALL_ENDED,

            callId:
              activeCall.callId,

            callerId:
              activeCall.callerId,

            calleeId:
              activeCall.calleeId,

            duration,

            endedBy:
              userId,

            timestamp:
              endedAt

          });

          // FIND OTHER USER
          const peerId =
            activeCall.callerId ===
            userId
              ? activeCall.calleeId
              : activeCall.callerId;

          // GET PEER SOCKET
          const peerSocketId =
            await presenceRepo.getSocketId(
              peerId
            );

          // NOTIFY PEER
          if (peerSocketId) {

            io.to(
              peerSocketId
            ).emit(
              "CALL_ENDED",
              {
                callId:
                  activeCall.callId,

                reason:
                  "DISCONNECTED"
              }
            );

          }

          callStore.delete(
            activeCall.callId
          );

        }
      );

    }
  );

}