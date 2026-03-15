import http from "k6/http";

export const options = {
  vus: 2000,
  duration: "30s"
};

export default function () {

  http.post(
    "http://localhost:3005/billing/invoice",
    JSON.stringify({
      userId: "user2",
      callId: Math.random().toString(),
      amount: 5
    }),
    { headers: { "Content-Type": "application/json" } }
  );

}