export function ErrorFallback() {

  return (

    <div
      className="
        min-h-screen
        flex
        items-center
        justify-center
      "
    >

      <div
        className="
          p-10
          rounded-3xl
          bg-slate-900
          border
          border-slate-700
          text-center
        "
      >

        <h1
          className="
            text-3xl
            font-bold
          "
        >
          Something went wrong
        </h1>

        <p
          className="
            text-slate-400
            mt-4
          "
        >
          Please refresh the page
        </p>

      </div>

    </div>

  );

}