import { SessionRepository } from "../repositories/SessionRepository";

export class LogoutSessionUseCase {

  constructor(private repo: SessionRepository) {}

  async execute(sessionId: string) {

    await this.repo.remove(sessionId);

  }

}