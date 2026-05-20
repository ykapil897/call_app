export interface User {

  userId: string;

  email: string;

}

export interface LoginResponse {

  token: string;

  user: User;

}