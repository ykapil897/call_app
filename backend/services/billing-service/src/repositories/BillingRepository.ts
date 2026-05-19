import { Invoice } from "../domain/Invoice"

export interface BillingRepository {

  lockBalance(userId: string, amount: number): Promise<boolean>

  createInvoice(invoice: Invoice): Promise<void>

  invoiceExists(callId: string): Promise<boolean>

  getBalance(userId: string): Promise<number>;

  getInvoiceByCallId(callId: string): Promise<any>;

}