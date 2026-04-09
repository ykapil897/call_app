import http from "k6/http"
import { check } from "k6"
import {options} from "../configs/options.js"

export { options }

export function setup() {

  const login = http.post(
    "http://localhost:3001/auth/login",
    JSON.stringify({
      identifier: "user1@test.com",
      password: "password"
    }),
    { headers: { "Content-Type": "application/json" } }
  )

  const token = login.json("data.token")
  const userId = login.json("data.user.userId")

  // console.log("TOKEN:", token)
  // console.log("USER ID:", userId)

  return { token, userId }
}

export default function (data) {

  const headers = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${data.token}`
    }
  }

  // ✅ FIXED session payload
  const session = http.post(
    "http://localhost:3002/session/create",
    JSON.stringify({
      userId: data.userId,
      deviceType: "WEB"
    }),
    headers
  )

  // console.log("SESSION:", session.status, session.body)

  check(session, {
    "session created": (r) => r.status === 200
  })

  const call = http.post(
    "http://localhost:3003/call/initiate",
    JSON.stringify({
      calleeId: "user2",
      media: { type: "AUDIO" }
    }),
    headers
  )

  // console.log("CALL INIT:", call.status, call.body)

  const callId = call.json("data.callId")

  http.post(
    "http://localhost:3003/call/answer",
    JSON.stringify({ callId }),
    headers
  )

  http.post(
    "http://localhost:3003/call/hangup",
    JSON.stringify({ callId }),
    headers
  )
}