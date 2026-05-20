import { UserRepository }
  from "../repositories/UserRepository";

import { PasswordService }
  from "../services/PasswordService";

export class RegisterUseCase {

  constructor(

    private userRepository:
      UserRepository,

    private passwordService:
      PasswordService

  ) {}

  async execute(
    email: string,
    password: string
  ) {

    const existing =
      await this.userRepository
        .findByEmail(email);

    if (existing) {

      throw new Error(
        "USER_ALREADY_EXISTS"
      );

    }

    const passwordHash =
      await this.passwordService
        .hash(password);

    await this.userRepository
      .create(
        email,
        passwordHash
      );

    const created =
      await this.userRepository
        .findByEmail(email);

    return {

      userId:
        created!.id,

      email:
        created!.email

    };

  }

}