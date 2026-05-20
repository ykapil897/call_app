import { api }
  from "./axios";

export async function
getBalance(
  userId: string
) {

  const res =
    await api.get(
      `/billing/balance?userId=${userId}`
    );

  return res.data.data;

}

export async function
getInvoice(
  callId: string
) {

  const res =
    await api.get(
      `/billing/invoice?callId=${callId}`
    );

  return res.data.data;

}