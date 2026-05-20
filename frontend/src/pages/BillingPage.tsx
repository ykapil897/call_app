import {
  useEffect,
  useState
} from "react";

import {
  useAuthStore
} from "../stores/auth.store";

import {
  getBalance
} from "../api/billing.api";

import {
  BillingCard
} from "../components/cards/BillingCard";

export default function
BillingPage() {

  const user =
    useAuthStore(
      (s) => s.user
    );

  const [balance, setBalance] =
    useState(0);

  useEffect(() => {

    async function load() {

      if (!user) {
        return;
      }

      const data =
        await getBalance(
          user.userId
        );

      setBalance(
        data.balance
      );

    }

    load();

  }, []);

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
          Billing
        </h1>

        <p
          className="
            text-slate-400
            mt-2
          "
        >
          Billing and balance details
        </p>

      </div>

      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          gap-6
        "
      >

        <BillingCard
          title="Current Balance"
          value={`₹${balance}`}
        />

      </div>

    </div>

  );

}