import { BillingDomainService } from "../services/BillingDomainService";

export class GetInvoiceUseCase {

  constructor(
    private billingService: BillingDomainService
  ) {}

  async execute(callId: string) {

    return this.billingService.getInvoice(callId);

  }

}