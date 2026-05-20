import {
  useEffect
} from "react";

import {
  RouterProvider
} from "react-router-dom";

import { router }
  from "./router";

import {
  useAuthStore
} from "./stores/auth.store";

import {
  useHeartbeat
} from "./hooks/useHeartbeat";

import {
  useSocket
} from "./hooks/useSocket";

import {
  IncomingCallModal
} from "./components/modals/IncomingCallModal";

export default function App() {

  const hydrate =
    useAuthStore(
      (s) => s.hydrate
    );

  useEffect(() => {

    hydrate();

  }, []);

  useHeartbeat();

  useSocket();

  return (

    <>

      <RouterProvider
        router={router}
      />

      <IncomingCallModal />

    </>

  );

}