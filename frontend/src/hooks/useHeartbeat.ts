import {
  useEffect
} from "react";

import {
  heartbeat
} from "../api/session.api";

import {
  useAuthStore
} from "../stores/auth.store";

export function useHeartbeat() {

  const sessionId =
    useAuthStore(
      (s) => s.sessionId
    );

  useEffect(() => {

    if (!sessionId) {
      return;
    }

    const interval =
      setInterval(
        async () => {

          try {

            await heartbeat(
              sessionId
            );

          } catch (err) {

            console.error(err);

          }

        },

        20000
      );

    return () => {

      clearInterval(
        interval
      );

    };

  }, [sessionId]);

}