import { Call } from "../domain/Call";

export interface CallRepository {

  save(call: Call): Promise<void>;

  find(callId: string): Promise<Call | null>;

}