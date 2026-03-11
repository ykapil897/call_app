import { Participant } from "./Participant";

export class Call {

  constructor(
    public callId: string,
    public state: string,
    public participants: Participant[],
    public mediaType: string
  ) {}

}