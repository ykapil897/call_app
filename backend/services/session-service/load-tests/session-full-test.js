import http from "k6/http";

export const options = {
  stages: [
    { duration: "10s", target: 1000 },
    { duration: "20s", target: 5000 },
    { duration: "10s", target: 0 }
  ]
};

export default function () {

  const payload = JSON.stringify({
    userId: "user1",
    deviceType: "WEB"
  });

  http.post(
    "http://localhost:3002/session/create",
    payload,
    { headers: { "Content-Type": "application/json" } }
  );

}