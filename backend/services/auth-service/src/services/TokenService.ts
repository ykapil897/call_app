import jwt from "jsonwebtoken";

export class TokenService {

  constructor(private secret: string) {}

  generate(userId: string) {

    return jwt.sign(
      { userId },
      this.secret,
      { expiresIn: "15m" }
    );

  }

  verify(token: string) {

    return jwt.verify(token, this.secret);

  }

}