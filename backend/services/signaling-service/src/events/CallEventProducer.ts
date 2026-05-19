import { producer }
  from "../infrastructure/kafka.client";

import {
  TOPICS
} from "../config/topics";

export class CallEventProducer {

  async publish(data: any) {

    await producer.send({

      topic: TOPICS.CALL_EVENTS,

      messages: [
        {
          key: data.callId,

          value: JSON.stringify(data)
        }
      ]

    });

  }

}