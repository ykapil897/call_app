export class CallRecord {

  constructor(
    public callId: string,
    public callerId: string,
    public calleeId: string,
    public duration: number,
    public endedAt: number
  ) {}

}