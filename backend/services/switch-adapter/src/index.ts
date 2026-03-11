import { buildApp } from "./app";
import { serverConfig } from "./config/server";

async function start() {

  const app = await buildApp();

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