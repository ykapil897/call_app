import { Kafka } from "kafkajs"
import { PostgresHistoryRepository } from "../infrastructure/PostgresHistoryRepository"
import { CallRecord } from "../domain/CallRecord"

const kafka = new Kafka({
  brokers: ["kafka:9092"]
})

export async function startHistoryConsumer() {

  const consumer = kafka.consumer({
    groupId: "history-service"
  })

  await consumer.connect()

  await consumer.subscribe({
    topic: "call_events"
  })

  const repo = new PostgresHistoryRepository()

  await consumer.run({

    eachMessage: async ({ message }) => {

      const data = JSON.parse(message.value!.toString())

      if (data.event === "CALL_ENDED") {

        const record = new CallRecord(
          data.callId,
          data.callerId,
          data.calleeId,
          data.duration,
          data.timestamp
        )

        await repo.save(record)

      }

    }

  })

}