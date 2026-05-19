import { PostgresBillingRepository } from "../infrastructure/PostgresBillingRepository";
import { BillingDomainService } from "../services/BillingDomainService";
import { CreateInvoiceUseCase } from "../application/CreateInvoiceUseCase";
import { GetBalanceUseCase } from "../application/GetBalanceUseCase";
import { GetInvoiceUseCase } from "../application/GetInvoiceUseCase";

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

  static async balance(req: any) {

    const { userId } = req.query;

    const repo =
      new PostgresBillingRepository();

    const service =
      new BillingDomainService(repo);

    const useCase =
      new GetBalanceUseCase(service);

    const balance =
      await useCase.execute(userId);

    return {
      success: true,
      data: {
        balance
      },
      meta: {
        serverTime: Date.now()
      }
    };

  }

  static async getInvoice(req: any) {

    const { callId } = req.query;

    const repo =
      new PostgresBillingRepository();

    const service =
      new BillingDomainService(repo);

    const useCase =
      new GetInvoiceUseCase(service);

    const invoice =
      await useCase.execute(callId);

    return {
      success: true,
      data: invoice,
      meta: {
        serverTime: Date.now()
      }
    };

  }
  
}