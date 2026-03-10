import { SessionRepository } from "../repositories/SessionRepository";

export class HeartbeatUseCase {

  constructor(private repo: SessionRepository) {}

  async execute(sessionId: string) {

    await this.repo.heartbeat(sessionId);

  }

}