import { Kafka }
  from "kafkajs";

export const kafka =
  new Kafka({

    clientId: "billing-service",

    brokers: [
      process.env.KAFKA_BROKER || "kafka:9092"
    ]

  });

export const consumer =
  kafka.consumer({
    groupId: "billing-group"
  });