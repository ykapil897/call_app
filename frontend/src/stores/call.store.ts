import { create }
  from "zustand";

interface IncomingCall {

  callId: string;

  callerId: string;

}

interface ActiveCall {

  callId: string;

  callerId: string;

  calleeId: string;

  status: string;

}

interface CallSummary {

  duration: number;

  amount: number;

  balance: number;

}

interface CallStore {

  incomingCall:
    IncomingCall | null;

  activeCall:
    ActiveCall | null;

  summaryOpen: boolean;

  callSummary:
    CallSummary | null;

  setIncomingCall:
    (
      call: IncomingCall | null
    ) => void;

  setActiveCall:
    (
      call: ActiveCall | null
    ) => void;

  setSummary:
    (
      summary: CallSummary
    ) => void;

  closeSummary:
    () => void;

}

export const useCallStore =
  create<CallStore>(
    (set) => ({

      incomingCall: null,

      activeCall: null,

      summaryOpen: false,

      callSummary: null,

      setIncomingCall:
        (incomingCall) =>
          set({
            incomingCall
          }),

      setActiveCall:
        (activeCall) =>
          set({
            activeCall
          }),

      setSummary:
        (callSummary) =>

          set({

            summaryOpen: true,

            callSummary

          }),

      closeSummary:
        () =>

          set({

            summaryOpen: false,

            callSummary: null

          })

    })
  );