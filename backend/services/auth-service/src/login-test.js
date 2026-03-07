import http from "k6/http";

export default function () {

 http.post(
   "http://localhost:3001/auth/login",
   JSON.stringify({
     identifier:"test@example.com",
     password:"password"
   }),
   { headers: { "Content-Type":"application/json" } }
 );

}