export function
RingingScreen() {

  return (

    <div
      className="
        flex
        flex-col
        items-center
        gap-8
      "
    >

      <div
        className="
          w-40
          h-40
          rounded-full
          bg-green-500/20
          animate-ping
        "
      />

      <div
        className="
          text-center
        "
      >

        <h1
          className="
            text-4xl
            font-bold
          "
        >
          Ringing...
        </h1>

        <p
          className="
            text-slate-400
            mt-2
          "
        >
          Waiting, Let him pick the call!!!
        </p>

      </div>

    </div>

  );

}