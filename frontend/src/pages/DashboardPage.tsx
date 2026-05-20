import {
  BalanceCard
} from "../components/cards/BalanceCard";

import {
  RecentCallsCard
} from "../components/cards/RecentCallsCard";

import {
  UserSearchForm
} from "../components/forms/UserSearchForm";

export default function DashboardPage() {

  return (

    <div
      className="
        flex
        flex-col
        gap-8
      "
    >

      <div>

        <h1
          className="
            text-4xl
            font-bold
          "
        >
          Dashboard
        </h1>

        <p
          className="
            text-slate-400
            mt-2
          "
        >
          Realtime calling platform
        </p>

      </div>

      <div
        className="
          grid
          grid-cols-1
          lg:grid-cols-3
          gap-6
        "
      >

        <BalanceCard
          balance={120}
        />

        <RecentCallsCard />

      </div>

      <UserSearchForm />

    </div>

  );

}