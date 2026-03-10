import client from "prom-client";

export const requestRate = new client.Counter({
  name: "gateway_requests_total",
  help: "Total API requests"
});

export const rateLimitHits = new client.Counter({
  name: "gateway_rate_limit_hits",
  help: "Rate limit exceeded"
});

export const errorRate = new client.Counter({
  name: "gateway_errors",
  help: "Gateway errors"
});

client.collectDefaultMetrics();