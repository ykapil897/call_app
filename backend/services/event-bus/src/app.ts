import { producer } from "./infrastructure/kafka.client"
import { startBillingConsumer } from "./consumers/BillingConsumer"

export async function startApp() {

  await producer.connect()

  await startBillingConsumer()

}