import { ActiveCall }
  from "../domain/ActiveCall";

export class ActiveCallStore {

  private calls =
    new Map<string, ActiveCall>();

  set(call: ActiveCall) {

    this.calls.set(
      call.callId,
      call
    );

  }

  get(callId: string) {

    return this.calls.get(callId);

  }

  delete(callId: string) {

    this.calls.delete(callId);

  }

  findByUser(userId: string) {

    for (
      const call of this.calls.values()
    ) {

      if (
        call.callerId === userId ||
        call.calleeId === userId
      ) {

        return call;

      }

    }

    return null;

  }

}