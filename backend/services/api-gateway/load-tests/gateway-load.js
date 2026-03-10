import http from "k6/http";

export const options = {
  vus: 5000,
  duration: "30s"
};

export default function () {

  http.get("http://localhost:3000/session/active?userId=user1", {
    headers: {
      Authorization: "Bearer TOKEN"
    }
  });

}