import { buildApp } from "./app";
import { serverConfig } from "./config/server";
import { startHistoryConsumer } from "./consumers/CallHistoryConsumer";

async function start() {

  startHistoryConsumer();

  const app = buildApp();

  try {

    await app.listen({
      port: serverConfig.port,
      host: serverConfig.host
    });

    console.log(`Server running on port ${serverConfig.port}`);

  } catch (err) {

    console.error(err);
    process.exit(1);

  }

}

start();