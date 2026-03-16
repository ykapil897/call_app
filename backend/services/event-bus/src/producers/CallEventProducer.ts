import { producer } from "../infrastructure/kafka.client"
import { TOPICS } from "../config/topics"

export class CallEventProducer {

  async publishCallStarted(callId: string, userId: string) {

    await producer.send({
      topic: TOPICS.CALL_EVENTS,
      messages: [
        {
          key: callId,
          value: JSON.stringify({
            event: "CALL_STARTED",
            callId,
            userId,
            timestamp: Date.now()
          })
        }
      ]
    })

  }

  async publishCallEnded(callId: string, userId: string, duration: number) {

    await producer.send({
      topic: TOPICS.CALL_EVENTS,
      messages: [
        {
          key: callId,
          value: JSON.stringify({
            event: "CALL_ENDED",
            callId,
            userId,
            duration
          })
        }
      ]
    })

  }

}