import { FastifyRequest } from "fastify"
import { BridgeService } from "../services/BridgeService"

const service = new BridgeService()

export class SwitchController {

  static async start(req: FastifyRequest) {

    const { callId, caller, callee } = req.body as any

    await service.start(callId, caller, callee)

    return {
      success: true,
      data: { callId },
      meta: { serverTime: Date.now() }
    }

  }

  static async stop(req: FastifyRequest) {

    const { callId } = req.body as any

    await service.stop(callId)

    return {
      success: true,
      data: {},
      meta: { serverTime: Date.now() }
    }

  }

}