import { PostgresBillingRepository } from "../infrastructure/PostgresBillingRepository";
import { BillingDomainService } from "../services/BillingDomainService";
import { CreateInvoiceUseCase } from "../application/CreateInvoiceUseCase";

export class BillingController {

  static async invoice(req: any) {

    const { userId, callId, amount } = req.body;

    const repo = new PostgresBillingRepository();

    const service = new BillingDomainService(repo);

    const useCase = new CreateInvoiceUseCase(service);

    await useCase.execute(userId, callId, amount);

    return {
      success: true,
      data: {},
      meta: { serverTime: Date.now() }
    };

  }

}