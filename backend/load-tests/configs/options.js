export const options = {

  stages: [
    { duration: "30s", target: 500 },
    { duration: "1m", target: 2000 },
    { duration: "2m", target: 5000 },
    { duration: "1m", target: 0 }
  ],

  thresholds: {
    http_req_duration: ["p(95)<700"],
    http_req_failed: ["rate<0.02"]
  }

};