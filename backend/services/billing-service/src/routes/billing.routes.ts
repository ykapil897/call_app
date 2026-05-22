import { FastifyInstance } from "fastify";
import { BillingController } from "../controllers/BillingController";

export async function billingRoutes(app: FastifyInstance) {

  app.post("/createInvoice", BillingController.invoice);

  app.get("/balance", BillingController.balance);

  app.get("/getInvoice", BillingController.getInvoice);
}