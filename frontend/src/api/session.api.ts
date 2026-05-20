import { api }
  from "./axios";

export async function
createSession(
  userId: string
) {

  const res =
    await api.post(
      "/session/create",
      {
        userId,
        deviceType: "WEB"
      }
    );

  return res.data.data;

}

export async function
heartbeat(
  sessionId: string
) {

  await api.post(
    "/session/heartbeat",
    {
      sessionId
    }
  );

}

export async function
logoutSession(
  sessionId: string
) {

  await api.post(
    "/session/logout",
    {
      sessionId
    }
  );

}