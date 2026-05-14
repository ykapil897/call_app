import express from "express";

import cors from "cors";

import {
  healthRoute
} from "./health/health.route";

import {
  metricsRoute
} from "./metrics/metrics.route";

import {
  signalingRoutes
} from "./routes/signaling.routes";

import {
  connectRedis
} from "./infrastructure/RedisClient";

export async function buildApp() {

  await connectRedis();

  const app = express();

  app.use(cors());

  app.use(express.json());

  healthRoute(app);

  metricsRoute(app);

  signalingRoutes(app);

  return app;

}