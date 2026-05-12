import client from "prom-client";

export const activeSockets =
  new client.Gauge({
    name: "active_signaling_sockets",
    help: "Connected websocket clients"
  });

export const activeCalls =
  new client.Gauge({
    name: "active_webrtc_calls",
    help: "Currently active calls"
  });