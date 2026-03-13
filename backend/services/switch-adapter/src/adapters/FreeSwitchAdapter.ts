import { SwitchAdapter } from "./SwitchAdapter"
import { getFreeSwitchConnection } from "../infrastructure/freeswitch.client"

export class FreeSwitchAdapter implements SwitchAdapter {

  private connection: any

  async connect() {

    this.connection = await getFreeSwitchConnection()

  }

  async bridge(
    callId: string,
    caller: string,
    callee: string
  ) {

    const cmd =
      `originate {origination_uuid=${callId}}user/${caller} &bridge(user/${callee})`

    this.connection.api(cmd)

  }

  async hangup(callId: string) {

    this.connection.api(`uuid_kill ${callId}`)

  }

}