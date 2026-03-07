import { User } from "../domain/User";

export interface UserRepository {

  findByEmail(email: string): Promise<User | null>;

}