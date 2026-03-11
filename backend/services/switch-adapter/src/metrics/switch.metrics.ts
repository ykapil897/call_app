import client from "prom-client"

export const rtpStreams = new client.Gauge({
  name: "rtp_streams",
  help: "Active RTP streams"
})

export const packetLoss = new client.Gauge({
  name: "rtp_packet_loss",
  help: "Packet loss rate"
})

export const cpuUsage = new client.Gauge({
  name: "switch_cpu_usage",
  help: "FreeSWITCH CPU usage"
})