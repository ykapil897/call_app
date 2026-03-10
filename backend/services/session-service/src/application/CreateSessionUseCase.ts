import { SessionRepository } from "../repositories/SessionRepository";
import { Session } from "../domain/Session";
import { randomUUID } from "crypto";

export class CreateSessionUseCase {

  constructor(private repo: SessionRepository) {}

  async execute(userId: string, deviceType: string) {

    const session = new Session(
      randomUUID(),
      userId,
      deviceType,
      Date.now()
    );

    await this.repo.create(session);

    return session;

  }

}