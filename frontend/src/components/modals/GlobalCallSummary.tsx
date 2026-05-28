// components/modals/GlobalCallSummary.tsx

import {
  useCallStore
} from "../../stores/call.store";

import {
  CallSummaryModal
} from "./CallSummaryModal";

export function
GlobalCallSummary() {

  const {

    summaryOpen,

    callSummary,

    closeSummary

  } = useCallStore();

  return (

    <CallSummaryModal

      open={summaryOpen}

      duration={
        callSummary?.duration || 0
      }

      amount={
        callSummary?.amount || 0
      }

      balance={
        callSummary?.balance || 0
      }

      onClose={closeSummary}

    />

  );

}