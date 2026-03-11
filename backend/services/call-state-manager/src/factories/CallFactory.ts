import { v4 as uuid } from "uuid";
import { Call } from "../domain/Call";
import { Participant } from "../domain/Participant";

export class CallFactory {

  static create(mediaType: string, caller: string) {

    const callerParticipant = new Participant(
      caller,
      "CALLER",
      "ACTIVE"
    );

    return new Call(
      uuid(),
      "RINGING",
      [callerParticipant],
      mediaType
    );

  }

}