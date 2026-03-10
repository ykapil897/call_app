import http from "k6/http";

export const options = {
  vus: 5000,
  duration: "20s"
};

export default function () {

  const payload = JSON.stringify({
    sessionId: "test-session"
  });

  http.post(
    "http://localhost:3002/session/heartbeat",
    payload,
    { headers: { "Content-Type": "application/json" } }
  );

}