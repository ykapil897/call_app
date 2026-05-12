import { CallState } from "./CallState";

export class Call {

  constructor(
    public callId: string,
    public callerId: string,
    public calleeId: string,
    public state: CallState,
    public mediaType: string,
    public startedAt: number
  ) {}

}