interface Props {

  open: boolean;

  duration: number;

  amount: number;

  balance: number;

  onClose: () => void;

}

export function
CallSummaryModal({

  open,

  duration,

  amount,

  balance,

  onClose

}: Props) {

  if (!open) {
    return null;
  }

  return (

    <div
      className="
        fixed
        inset-0
        bg-black/70
        flex
        items-center
        justify-center
        z-50
      "
    >

      <div
        className="
          w-[450px]
          p-8
          rounded-3xl
          bg-slate-900
          border
          border-slate-700
          shadow-2xl
        "
      >

        <h1
          className="
            text-3xl
            font-bold
            mb-8
          "
        >
          Call Summary
        </h1>

        <div
          className="
            flex
            flex-col
            gap-4
          "
        >

          <div
            className="
              flex
              justify-between
            "
          >

            <span>
              Duration
            </span>

            <span>
              {duration}s
            </span>

          </div>

          <div
            className="
              flex
              justify-between
            "
          >

            <span>
              Charged
            </span>

            <span
              className="
                text-red-400
              "
            >
              ₹{amount}
            </span>

          </div>

          <div
            className="
              flex
              justify-between
            "
          >

            <span>
              Remaining Balance
            </span>

            <span
              className="
                text-green-400
              "
            >
              ₹{balance}
            </span>

          </div>

        </div>

        <button

          onClick={onClose}

          className="
            w-full
            mt-8
            py-3
            rounded-2xl
            bg-blue-600
            hover:bg-blue-500
            hover:scale-[1.02]
            transition
          "
        >

          Continue

        </button>

      </div>

    </div>

  );

}