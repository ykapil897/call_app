import { Kafka } from "kafkajs"

export const kafka = new Kafka({
  clientId: "call-platform",
  brokers: ["kafka:9092"]
})

export const producer = kafka.producer()

export const consumer = kafka.consumer({
  groupId: "billing-group"
})