import { FastifyInstance } from "fastify";
import { BillingController } from "../controllers/BillingController";

export async function billingRoutes(app: FastifyInstance) {

  app.post("/billing/invoice", BillingController.invoice);

  app.get("/billing/balance", BillingController.balance);

  app.get("/billing/invoice", BillingController.getInvoice);

}