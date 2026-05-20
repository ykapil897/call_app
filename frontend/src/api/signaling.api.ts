import { api }
  from "./axios";

export async function
checkPresence(
  userId: string
) {

  const res =
    await api.get(
      `/signaling/presence?userId=${userId}`
    );

  return res.data.data;

}