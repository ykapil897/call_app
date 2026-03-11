import { CallState } from "./CallState";
import { Call } from "../domain/Call";

export class TerminatedState implements CallState {

  answer(call: Call) {}

  hangup(call: Call) {}

}