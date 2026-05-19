export class CallRecord {

  constructor(

    public callId: string,

    public callerId: string,

    public calleeId: string,

    public status: string,

    public startedAt: number | null,

    public answeredAt: number | null,

    public endedAt: number | null,

    public duration: number

  ) {}

}