import http from "k6/http";

export let options = {
  vus: 10000,
  duration: "30s",
};

export default function () {

  http.post(
    "http://localhost:3001/auth/login",
    JSON.stringify({
      identifier: "test@example.com",
      password: "password"
    }),
    { headers: { "Content-Type": "application/json" } }
  );

}
