import {
  kafka
} from "../infrastructure/kafka.client";

import {
  TOPICS
} from "../config/topics";

import {
  RedisPresenceRepository
} from "../repositories/RedisPresenceRepository";

import {
  Server
} from "socket.io";

const consumer =
  kafka.consumer({ groupId: "signaling-group" });

const presenceRepo =
  new RedisPresenceRepository();

export async function
startBillingReadyConsumer(io: Server) {

  await consumer.connect();

  await consumer.subscribe({

    topic:
      TOPICS.BILLING_EVENTS

  });

  await consumer.run({

    eachMessage:
      async ({ message }) => {

        const data =
          JSON.parse(
            message.value!.toString()
          );

        if (
          data.event !==
          "BILLING_READY"
        ) {
          return;
        }

        const socketId =
          await presenceRepo.getSocketId(
            data.callerId
          );

        if (!socketId) {
          return;
        }

        io.to(socketId).emit(
          "BILLING_READY",
          {
            callId:
              data.callId
          }
        );

      }

  });

}