export interface ActiveCall {

  callId: string;

  callerId: string;

  calleeId: string;

  status: string;

  createdAt: number;

  answeredAt?: number;

  endedAt?: number;

  timeout?: NodeJS.Timeout;

}