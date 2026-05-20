export function SkeletonCard() {

  return (

    <div
      className="
        p-6
        rounded-3xl
        bg-slate-900/70
        border
        border-slate-700
        animate-pulse
      "
    >

      <div
        className="
          h-5
          w-40
          bg-slate-700
          rounded
        "
      />

      <div
        className="
          h-10
          w-24
          bg-slate-700
          rounded
          mt-5
        "
      />

    </div>

  );

}