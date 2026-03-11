import { CallRepository } from "../repositories/CallRepository";

export class HangupCallUseCase {

  constructor(private repo: CallRepository) {}

  async execute(callId: string) {

    const call = await this.repo.find(callId);

    if (!call) throw new Error("CALL_NOT_FOUND");

    call.state = "TERMINATED";

    await this.repo.save(call);

  }

}