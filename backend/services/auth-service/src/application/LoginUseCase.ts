import { UserRepository } from "../repositories/UserRepository";
import { PasswordService } from "../services/PasswordService";
import { TokenService } from "../services/TokenService";

export class LoginUseCase {

  constructor(
    private userRepository: UserRepository,
    private passwordService: PasswordService,
    private tokenService: TokenService
  ) {}

  async execute(email: string, password: string) {

    const user = await this.userRepository.findByEmail(email);

    if (!user) throw new Error("INVALID_CREDENTIALS");

    const valid = await this.passwordService.verify(
      password,
      user.passwordHash
    );

    if (!valid) throw new Error("INVALID_CREDENTIALS");

    const token = this.tokenService.generate(user.id);

    return {
      token,
      user: {
        userId: user.id,
        email: user.email
      }
    };

  }

}