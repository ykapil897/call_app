export function RecentCallsCard() {

  return (

    <div
      className="
        p-6
        rounded-3xl
        bg-slate-900/70
        border
        border-slate-700
        shadow-xl
        hover:scale-105
        transition
      "
    >

      <h2
        className="
          text-xl
          font-semibold
          mb-4
        "
      >
        Recent Calls
      </h2>

      <div
        className="
          text-slate-400
        "
      >
        No recent calls
      </div>

    </div>

  );

}