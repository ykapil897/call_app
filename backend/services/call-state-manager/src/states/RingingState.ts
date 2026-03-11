import { CallState } from "./CallState";
import { Call } from "../domain/Call";

export class RingingState implements CallState {

  answer(call: Call) {
    call.state = "CONNECTED";
  }

  hangup(call: Call) {
    call.state = "TERMINATED";
  }

}