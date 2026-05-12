import { v4 as uuid } from "uuid";

import { Call } from "../domain/Call";

import { CallState }
  from "../domain/CallState";

export class CallService {

  createCall(
    callerId: string,
    calleeId: string
  ) {

    return new Call(
      uuid(),
      callerId,
      calleeId,
      CallState.INITIATED,
      "AUDIO",
      Date.now()
    );

  }

}