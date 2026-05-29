import { createServer }
  from "http";

import { Server }
  from "socket.io";

import {
  buildApp
} from "./app";

import { producer }
  from "./infrastructure/kafka.client";

import {
  serverConfig
} from "./config/server";

import {
  registerSignalingGateway
} from "./gateways/signaling.gateway";

import {
  startBillingReadyConsumer
} from "./consumers/BillingReadyConsumer";

async function start() {

  const app =
    await buildApp();

  const httpServer =
    createServer(app);

  const io =
    new Server(
      httpServer,
      {
        cors: {
          origin: "*",
          methods: [
            "GET",
            "POST"
          ]
        }
      }
    );

  registerSignalingGateway(io);

  await producer.connect();

  await startBillingReadyConsumer(io);

  httpServer.listen(
    serverConfig.port,
    serverConfig.host,
    () => {

      console.log(
        `Server running on port ${serverConfig.port}`
      );

    }
  );

}

start();