import http from "k6/http";

export const options = {
  vus: 1000,
  duration: "30s"
};

export default function () {

  http.post(
    "http://localhost:3002/session/create",
    JSON.stringify({
      userId: "user1",
      deviceType: "WEB"
    }),
    { headers: { "Content-Type": "application/json" } }
  );

}