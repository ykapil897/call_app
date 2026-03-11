import { CallState } from "./CallState";
import { Call } from "../domain/Call";

export class ConnectedState implements CallState {

  answer(call: Call) {}

  hangup(call: Call) {
    call.state = "TERMINATED";
  }

}