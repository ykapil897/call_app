interface Props {

  title: string;

  description: string;

}

export function EmptyState({
  title,
  description
}: Props) {

  return (

    <div
      className="
        p-10
        rounded-3xl
        bg-slate-900/70
        border
        border-slate-700
        text-center
      "
    >

      <h2
        className="
          text-2xl
          font-bold
        "
      >
        {title}
      </h2>

      <p
        className="
          text-slate-400
          mt-3
        "
      >
        {description}
      </p>

    </div>

  );

}