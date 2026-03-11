import http from "k6/http";

export const options = {
  vus: 10000,
  duration: "30s"
};

export default function () {

  http.post(
    "http://localhost:3003/call/initiate",
    JSON.stringify({
      callerId: "user1",
      media: { type: "AUDIO" }
    }),
    {
      headers: { "Content-Type": "application/json" }
    }
  );

}