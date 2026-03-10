import http from "k6/http";
import { check } from "k6";

export const options = {
  vus: 2000,
  duration: "30s"
};

export default function () {

  const payload = JSON.stringify({
    userId: "user1",
    deviceType: "WEB"
  });

  const res = http.post(
    "http://localhost:3002/session/create",
    payload,
    { headers: { "Content-Type": "application/json" } }
  );

  check(res, {
    "status 200": (r) => r.status === 200
  });

}