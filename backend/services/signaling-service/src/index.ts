import { Server } from "socket.io";

import { buildApp } from "./app";

import { serverConfig }
  from "./config/server";

import {
  registerSignalingGateway
} from "./gateways/signaling.gateway";

async function start() {

  const app = await buildApp();

  try {

    const io = new Server(
      app.server,
      {
        cors: {
          origin: "*"
        }
      }
    );

    registerSignalingGateway(io);

    await app.listen({
      port: serverConfig.port,
      host: serverConfig.host
    });

    console.log(
      `Server running on port ${serverConfig.port}`
    );

  } catch (err) {

    console.error(err);

    process.exit(1);

  }

}

start();