import { CallRepository } from "../repositories/CallRepository";

export class AnswerCallUseCase {

  constructor(private repo: CallRepository) {}

  async execute(callId: string) {

    const call = await this.repo.find(callId);

    if (!call) throw new Error("CALL_NOT_FOUND");

    call.state = "CONNECTED";

    await this.repo.save(call);

    return call;

  }

}