import { UserRepository } from "../repositories/UserRepository";

export class GetUserByEmailUseCase {

  constructor(
    private userRepository: UserRepository
  ) {}

  async execute(email: string) {

    const user =
      await this.userRepository.findByEmail(
        email
      );

    if (!user) {
      throw new Error("USER_NOT_FOUND");
    }

    return {
      userId: user.id,
      email: user.email
    };

  }

}