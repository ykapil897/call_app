import { PostgresUserRepository } from "../infrastructure/PostgresUserRepository";
import { PasswordService } from "../services/PasswordService";
import { TokenService } from "../services/TokenService";
import { LoginUseCase } from "../application/LoginUseCase";

export class AuthFactory {

  static createLoginUseCase() {

    const repo = new PostgresUserRepository();

    const passwordService = new PasswordService();

    const tokenService = new TokenService(process.env.JWT_SECRET!);

    return new LoginUseCase(
      repo,
      passwordService,
      tokenService
    );
  }

}