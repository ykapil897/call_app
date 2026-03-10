import { RedisSessionRepository } from "../infrastructure/RedisSessionRepository";
import { CreateSessionUseCase } from "../application/CreateSessionUseCase";
import { HeartbeatUseCase } from "../application/HeartbeatUseCase";
import { LogoutSessionUseCase } from "../application/LogoutSessionUseCase";
import { GetActiveSessionsUseCase } from "../application/GetActiveSessionsUseCase";

export class SessionFactory {

  private static instance: any;

  static build() {

    if (!this.instance) {

      const repo = new RedisSessionRepository();

      this.instance = {
        createSession: new CreateSessionUseCase(repo),
        heartbeat: new HeartbeatUseCase(repo),
        logout: new LogoutSessionUseCase(repo),
        getActive: new GetActiveSessionsUseCase(repo)
      };

    }

    return this.instance;

  }

}