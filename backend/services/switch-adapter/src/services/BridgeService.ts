import { FreeSwitchAdapter } from "../adapters/FreeSwitchAdapter"

export class BridgeService {

  private adapter: FreeSwitchAdapter

  constructor() {

    this.adapter = new FreeSwitchAdapter()

  }

  async init() {

    await this.adapter.connect()

  }

  async start(
    callId: string,
    caller: string,
    callee: string
  ) {

    await this.adapter.bridge(callId, caller, callee)

  }

  async stop(callId: string) {

    await this.adapter.hangup(callId)

  }

}