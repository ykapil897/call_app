import { Kafka }
  from "kafkajs";

import {
  PostgresHistoryRepository
} from "../infrastructure/PostgresHistoryRepository";

import {
  CallRecord
} from "../domain/CallRecord";

const kafka =
  new Kafka({

    clientId: "history-service",

    brokers: [
      process.env.KAFKA_BROKER || "kafka:9092"
    ]

  });

const consumer =
  kafka.consumer({
    groupId: "history-group"
  });

export async function
startHistoryConsumer() {

  await consumer.connect();

  await consumer.subscribe({

    topic: "call_events"

  });

  const repo =
    new PostgresHistoryRepository();

  await consumer.run({

    eachMessage:
      async ({ message }) => {

        const data =
          JSON.parse(
            message.value!.toString()
          );

        switch (data.event) {

          case "CALL_CREATED":

            await repo.create(

              new CallRecord(

                data.callId,

                data.callerId,

                data.calleeId,

                "CREATED",

                data.timestamp,

                null,

                null,

                0

              )

            );

            break;

          case "CALL_ANSWERED":

            await repo.updateStatus(

              data.callId,

              "ANSWERED",

              {
                answeredAt:
                  data.timestamp
              }

            );

            break;

          case "CALL_REJECTED":

            await repo.updateStatus(

              data.callId,

              "REJECTED",

              {}

            );

            break;

          case "CALL_MISSED":

            await repo.updateStatus(

              data.callId,

              "MISSED",

              {}

            );

            break;

          case "CALL_ENDED":

            await repo.updateStatus(

              data.callId,

              "ENDED",

              {

                endedAt:
                  data.timestamp,

                duration:
                  data.duration

              }

            );

            break;

        }

      }

  });

}