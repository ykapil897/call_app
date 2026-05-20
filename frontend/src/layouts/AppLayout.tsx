import {
  Outlet,
  Link
} from "react-router-dom";

import {
  useNavigate
} from "react-router-dom";

import {
  logoutSession
} from "../api/session.api";

import {
  useAuthStore
} from "../stores/auth.store";

export function AppLayout() {

    const navigate = useNavigate();

    const auth = useAuthStore();

  return (

    <div
      className="
        min-h-screen
        text-white
      "
    >

      <nav
        className="
          flex
          items-center
          justify-between
          px-6
          py-4
          border-b
          border-slate-800
          backdrop-blur-md
        "
      >

        <h1
          className="
            text-2xl
            font-bold
          "
        >
          Call Platform
        </h1>

        <div
          className="
            flex
            gap-6
          "
        >

          <Link to="/">
            Dashboard
          </Link>

          <Link to="/billing">
            Billing
          </Link>

          <Link to="/history">
            History
          </Link>

          <button

            onClick={async () => {

                if (auth.sessionId) {

                await logoutSession(
                    auth.sessionId
                );

                }

                auth.logout();

                navigate("/login");

            }}

            className="
                text-red-400
                hover:text-red-300
            "
            >

            Logout

            </button>

        </div>

      </nav>

      <main
        className="
          p-6
        "
      >
        <Outlet />
      </main>

    </div>

  );

}