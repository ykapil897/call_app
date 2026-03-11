import { RedisCallRepository } from "../infrastructure/RedisCallRepository";
import { InitiateCallUseCase } from "../application/InitiateCallUseCase";
import { AnswerCallUseCase } from "../application/AnswerCallUseCase";
import { HangupCallUseCase } from "../application/HangupCallUseCase";

const repo = new RedisCallRepository();

export class CallController {

  static async initiate(req: any) {

    const { callerId, media } = req.body;

    const useCase = new InitiateCallUseCase(repo);

    const call = await useCase.execute(callerId, media.type);

    return {
      success: true,
      data: {
        callId: call.callId,
        state: call.state,
        participants: call.participants
      },
      meta: { serverTime: Date.now() }
    };

  }

  static async answer(req: any) {

    const { callId } = req.body;

    const useCase = new AnswerCallUseCase(repo);

    const call = await useCase.execute(callId);

    return {
      success: true,
      data: { 
        callId: call.callId, 
        state: call.state 
     },
      meta: { serverTime: Date.now() }
    };

  }

  static async hangup(req: any) {

    const { callId } = req.body;

    const useCase = new HangupCallUseCase(repo);

    await useCase.execute(callId);

    return {
      success: true,
      data: {},
      meta: { serverTime: Date.now() }
    };

  }

}