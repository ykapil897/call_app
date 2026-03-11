import { Call } from "../domain/Call";

export interface CallState {

  answer(call: Call): void;

  hangup(call: Call): void;

}