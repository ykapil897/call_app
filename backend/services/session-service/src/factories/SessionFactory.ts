import { RedisSessionRepository } from "../infrastructure/RedisSessionRepository";
import { CreateSessionUseCase } from "../application/CreateSessionUseCase";
import { HeartbeatUseCase } from "../application/HeartbeatUseCase";
import { LogoutSessionUseCase } from "../application/LogoutSessionUseCase";
import { GetActiveSessionsUseCase } from "../application/GetActiveSessionsUseCase";

export class SessionFactory {

  static build() {

    const repo = new RedisSessionRepository();

    return {

      createSession: new CreateSessionUseCase(repo),

      heartbeat: new HeartbeatUseCase(repo),

      logout: new LogoutSessionUseCase(repo),

      getActive: new GetActiveSessionsUseCase(repo)

    };

  }

}