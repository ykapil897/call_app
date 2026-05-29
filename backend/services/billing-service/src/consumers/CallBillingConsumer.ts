import { kafka }
  from "../infrastructure/kafka.client";

import {
  producer
} from "../infrastructure/kafka.client";

import {
  TOPICS
} from "../config/topics";

import {
  PostgresBillingRepository
} from "../infrastructure/PostgresBillingRepository";

import {
  BillingDomainService
} from "../services/BillingDomainService";

import {
  CreateInvoiceUseCase
} from "../application/CreateInvoiceUseCase";

import { 
  GetBalanceUseCase 
} from "../application/GetBalanceUseCase";

export const consumer =
  kafka.consumer({
    groupId: "billing-group"
  });

export async function
startBillingConsumer() {

  await consumer.connect();

  await consumer.subscribe({

    topic: TOPICS.CALL_EVENTS

  });

  await consumer.run({

    eachMessage:
      async ({ message }) => {

        const data =
          JSON.parse(
            message.value!.toString()
          );

        if (
          data.event !== "CALL_ENDED"
        ) {
          return;
        }

        const repo =
          new PostgresBillingRepository();

        const service =
          new BillingDomainService(
            repo
          );

        const useCaseInvoice =
          new CreateInvoiceUseCase(
            service
          );

        const useCaseBalance =
          new GetBalanceUseCase(
            service
          );

        const amount =
          data.duration * 0.01;

        await useCaseInvoice.execute(

          data.callerId,

          data.callId,

          amount

        );

        await useCaseBalance.execute(

          data.callerId

        );

        await producer.send({

          topic:
            TOPICS.BILLING_EVENTS,

          messages: [

            {

              value:
                JSON.stringify({

                  event:
                    "BILLING_READY",

                  callId:
                    data.callId,

                  callerId:
                    data.callerId

                })

            }

          ]

        });

      }

  });

}