import { FastifyInstance } from "fastify";
import { BillingController } from "../controllers/BillingController";

export async function billingRoutes(app: FastifyInstance) {

  app.post("/billing/invoice", BillingController.invoice);

}