import {
  useEffect,
  useState
} from "react";

import {
  useAuthStore
} from "../stores/auth.store";

import {
  getHistory
} from "../api/history.api";

import {
  HistoryCard
} from "../components/cards/HistoryCard";

export default function
HistoryPage() {

  const user =
    useAuthStore(
      (s) => s.user
    );

  const [history, setHistory] =
    useState<any[]>([]);

  useEffect(() => {

    async function load() {

      if (!user) {
        return;
      }

      const data =
        await getHistory(
          user.userId
        );

      setHistory(
        data.items
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
          Call History
        </h1>

        <p
          className="
            text-slate-400
            mt-2
          "
        >
          Previous call records
        </p>

      </div>

      <div
        className="
          flex
          flex-col
          gap-4
        "
      >

        {
          history.map(
            (call) => (

              <HistoryCard

                key={
                  call.call_id
                }

                status={
                  call.status
                }

                duration={
                  call.duration
                }

                endedAt={
                  call.ended_at
                }

                peerId={
                  call.caller_id ===
                  user?.userId
                    ? call.callee_id
                    : call.caller_id
                }

              />

            )
          )
        }

      </div>

    </div>

  );

}