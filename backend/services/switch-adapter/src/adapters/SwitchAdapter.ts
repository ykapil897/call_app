export interface SwitchAdapter {

  connect(): Promise<void>

  bridge(
    callId: string,
    caller: string,
    callee: string
  ): Promise<void>

  hangup(callId: string): Promise<void>

}