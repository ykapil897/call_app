import { SessionRepository } from "../repositories/SessionRepository";

export class GetActiveSessionsUseCase {

  constructor(private repo: SessionRepository) {}

  async execute(userId: string) {

    return this.repo.findByUser(userId);

  }

}