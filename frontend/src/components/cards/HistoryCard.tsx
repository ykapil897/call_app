interface Props {

  status: string;

  duration: number;

  endedAt: string;

  peerId: string;

}

export function HistoryCard({
  status,
  duration,
  endedAt,
  peerId
}: Props) {

  function statusColor() {

    switch (status) {

      case "ANSWERED":
      case "ENDED":
        return "text-green-400";

      case "MISSED":
        return "text-red-400";

      case "REJECTED":
        return "text-yellow-400";

      default:
        return "text-slate-400";

    }

  }

  return (

    <div
      className="
        p-5
        rounded-3xl
        bg-slate-900/70
        border
        border-slate-700
        hover:scale-[1.02]
        transition
        shadow-xl
      "
    >

      <div
        className="
          flex
          items-center
          justify-between
        "
      >

        <div>

          <p
            className="
              text-lg
              font-semibold
            "
          >
            {peerId}
          </p>

          <p
            className="
              text-slate-400
              text-sm
              mt-1
            "
          >
            {
              new Date(
                endedAt
              ).toLocaleString()
            }
          </p>

        </div>

        <div
          className="
            text-right
          "
        >

          <p
            className={`
              font-bold
              ${statusColor()}
            `}
          >
            {status}
          </p>

          <p
            className="
              text-slate-400
              mt-1
            "
          >
            {duration}s
          </p>

        </div>

      </div>

    </div>

  );

}