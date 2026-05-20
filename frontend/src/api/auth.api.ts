import { api }
  from "./axios";

export async function login(
  identifier: string,
  password: string
) {

  const res =
    await api.post(
      "/auth/login",
      {
        identifier,
        password
      }
    );

  return res.data.data;

}

export async function logout() {

  await api.post(
    "/auth/logout"
  );

}

export async function getUserByEmail(
  email: string
) {

  const res =
    await api.get(
      `/auth/user?email=${email}`
    );

  return res.data.data;

}