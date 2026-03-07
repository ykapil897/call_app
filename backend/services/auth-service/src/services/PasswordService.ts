import bcrypt from "bcrypt";

export class PasswordService {

  async verify(password: string, hash: string) {

    return bcrypt.compare(password, hash);

  }

}