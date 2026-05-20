interface Props {

  title: string;

  value: string;

}

export function BillingCard({
  title,
  value
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
          text-slate-400
          text-lg
        "
      >
        {title}
      </h2>

      <p
        className="
          text-4xl
          font-bold
          mt-4
          text-green-400
        "
      >
        {value}
      </p>

    </div>

  );

}