import { CallFactory } from "../factories/CallFactory";
import { CallRepository } from "../repositories/CallRepository";

export class InitiateCallUseCase {

  constructor(private repo: CallRepository) {}

  async execute(caller: string, media: string) {

    const call = CallFactory.create(media, caller);

    await this.repo.save(call);

    return call;

  }

}