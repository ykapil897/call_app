import http from "k6/http";

export const options = {
  vus: 2000,
  duration: "30s"
};

export default function () {

  http.get(
    "http://localhost:3002/session/active?userId=user1"
  );

}