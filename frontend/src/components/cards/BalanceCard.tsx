interface Props {

  balance: number;

}

export function BalanceCard({
  balance
}: Props) {

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
          text-lg
          text-slate-400
        "
      >
        Current Balance
      </h2>

      <p
        className="
          text-4xl
          font-bold
          mt-4
          text-green-400
        "
      >
        ₹{balance}
      </p>

    </div>

  );

}