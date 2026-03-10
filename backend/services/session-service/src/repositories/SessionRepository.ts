import { Session } from "../domain/Session";

export interface SessionRepository {

  create(session: Session): Promise<void>;

  heartbeat(sessionId: string): Promise<void>;

  remove(sessionId: string): Promise<void>;

  findByUser(userId: string): Promise<Session[]>;

}