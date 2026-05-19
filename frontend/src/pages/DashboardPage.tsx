export default function DashboardPage() {

  return (

    <div>

      <h1
        className="
          text-3xl
          font-bold
          mb-6
        "
      >
        Dashboard
      </h1>

      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-3
          gap-6
        "
      >

        <div
          className="
            p-6
            rounded-2xl
            bg-slate-900/60
            border
            border-slate-700
            hover:scale-105
            transition
          "
        >
          Balance Card
        </div>

        <div
          className="
            p-6
            rounded-2xl
            bg-slate-900/60
            border
            border-slate-700
            hover:scale-105
            transition
          "
        >
          Online Users
        </div>

        <div
          className="
            p-6
            rounded-2xl
            bg-slate-900/60
            border
            border-slate-700
            hover:scale-105
            transition
          "
        >
          Recent Calls
        </div>

      </div>

    </div>

  );

}