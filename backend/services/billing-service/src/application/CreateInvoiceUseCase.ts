import { BillingDomainService } from "../services/BillingDomainService";

export class CreateInvoiceUseCase {

  constructor(private billingService: BillingDomainService) {}

  async execute(userId: string, callId: string, amount: number) {

    await this.billingService.processCallCharge(
      userId,
      callId,
      amount
    );

  }

}