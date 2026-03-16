import { consumer } from "../infrastructure/kafka.client"
import { TOPICS } from "../config/topics"
import axios from "axios"

export async function startBillingConsumer() {

  await consumer.connect()

  await consumer.subscribe({
    topic: TOPICS.CALL_EVENTS
  })

  await consumer.run({

    eachMessage: async ({ message }) => {

      const data = JSON.parse(
        message.value!.toString()
      )

      if (data.event === "CALL_ENDED") {

        await axios.post(
          "http://billing-service:3000/billing/invoice",
          {
            userId: data.userId,
            callId: data.callId,
            amount: data.duration * 0.01
          }
        )

      }

    }

  })

}