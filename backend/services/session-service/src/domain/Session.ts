export class Session {

  constructor(
    public sessionId: string,
    public userId: string,
    public deviceType: string,
    public lastSeen: number
  ) {}

}