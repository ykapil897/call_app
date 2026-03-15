import client from "prom-client";

export const dbLockTime = new client.Histogram({
  name: "db_lock_time",
  help: "Time spent waiting for DB locks"
});

export const invoiceRate = new client.Counter({
  name: "invoice_rate",
  help: "Invoices generated"
});