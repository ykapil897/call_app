import { BillingDomainService } from "../services/BillingDomainService";

export class GetBalanceUseCase {

  constructor(
    private billingService: BillingDomainService
  ) {}

  async execute(userId: string) {

    return this.billingService.getBalance(userId);

  }

}