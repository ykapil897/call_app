import { v4 as uuid } from "uuid";
import { BillingRepository } from "../repositories/BillingRepository";
import { Invoice } from "../domain/Invoice";

export class BillingDomainService {

  constructor(private repo: BillingRepository) {}

  async processCallCharge(userId: string, callId: string, amount: number) {

    const exists = await this.repo.invoiceExists(callId);

    if (exists) {
      return;
    }

    const locked = await this.repo.lockBalance(userId, amount);

    if (!locked) {
      throw new Error("INSUFFICIENT_BALANCE");
    }

    const invoice = new Invoice(uuid(), callId, amount);

    await this.repo.createInvoice(invoice);

  }

  async getBalance(userId: string) {

    return this.repo.getBalance(userId);

  }

  async getInvoice(callId: string) {

    return this.repo.getInvoiceByCallId(callId);

  }

}