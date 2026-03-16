import client from "prom-client"

export const kafkaEvents = new client.Counter({
  name: "kafka_events_total",
  help: "Total Kafka events"
})

export const consumerLag = new client.Gauge({
  name: "kafka_consumer_lag",
  help: "Consumer lag"
})