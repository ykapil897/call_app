import { User } from "../domain/User";

export interface UserRepository {

  findByEmail(email: string): Promise<User | null>;

  create(
    email: string,
    passwordHash: string
  ): Promise<void>;

  findById(id: string): Promise<User | null>;

}