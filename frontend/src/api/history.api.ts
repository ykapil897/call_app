import { api }
  from "./axios";

export async function
getHistory(
  userId: string
) {

  const res =
    await api.get(
      `/call/history?userId=${userId}`
    );

  return res.data.data;

}