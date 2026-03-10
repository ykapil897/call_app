import client from "prom-client";

export const activeSessions = new client.Gauge({
  name: "active_sessions",
  help: "Active sessions"
});

export const heartbeatLatency = new client.Histogram({
  name: "heartbeat_latency_ms",
  help: "Heartbeat latency"
});