import { consumer }
  from "../infrastructure/kafka.client";

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

        const useCase =
          new CreateInvoiceUseCase(
            service
          );

        const amount =
          data.duration * 0.01;

        await useCase.execute(

          data.callerId,

          data.callId,

          amount

        );

      }

  });

}