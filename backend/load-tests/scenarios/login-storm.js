import http from "k6/http"
import { options } from "../configs/options.js"

export { options }

export default function () {

  const res = http.post(
    "http://localhost:3001/auth/login",
    JSON.stringify({
      identifier: "user1@test.com",
      password: "password"
    }),
    { headers: { "Content-Type": "application/json" } }
  )

}