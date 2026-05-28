import {
  Link,
  Outlet,
  useLocation,
  useNavigate
} from "react-router-dom";

import {
  Phone,
  Wallet,
  History,
  LayoutDashboard
} from "lucide-react";

import {
  logoutSession
} from "../api/session.api";

import {
  useAuthStore
} from "../stores/auth.store";

import { IncomingCallModal } from "../components/modals/IncomingCallModal";

import {
  GlobalCallSummary
} from "../components/modals/GlobalCallSummary";

export default function
AppLayout() {

  const location =
    useLocation();

  const navigate =
    useNavigate();

  const auth =
    useAuthStore();

  async function logout() {

    try {

      if (auth.sessionId) {

        await logoutSession(
          auth.sessionId
        );

      }

    } finally {

      auth.logout();

      navigate("/login");

    }

  }

  const links = [

    {
      path: "/",
      label: "Dashboard",
      icon: LayoutDashboard
    },

    {
      path: "/history",
      label: "History",
      icon: History
    },

    {
      path: "/billing",
      label: "Billing",
      icon: Wallet
    }

  ];

  return (

    <div
      className="
        min-h-screen
        bg-gradient-to-br
        from-slate-950
        via-slate-900
        to-slate-950
        text-white
      "
    >

      <header
        className="
          sticky
          top-0
          z-40
          backdrop-blur-xl
          bg-slate-950/70
          border-b
          border-slate-800
        "
      >

        <div
          className="
            max-w-7xl
            mx-auto
            px-6
            h-16
            flex
            items-center
            justify-between
          "
        >

          <div
            className="
              flex
              items-center
              gap-3
            "
          >

            <Phone
              className="
                text-green-400
              "
            />

            <h1
              className="
                text-xl
                font-bold
              "
            >
              Call Platform
            </h1>

          </div>

          <nav
            className="
              flex
              items-center
              gap-3
            "
          >

            {
              links.map(
                (link) => {

                  const Icon =
                    link.icon;

                  const active =
                    location.pathname ===
                    link.path;

                  return (

                    <Link

                      key={
                        link.path
                      }

                      to={
                        link.path
                      }

                      className={`
                        px-4
                        py-2
                        rounded-xl
                        flex
                        items-center
                        gap-2
                        transition
                        hover:bg-slate-800
                        ${
                          active
                            ? "bg-slate-800 text-green-400"
                            : "text-slate-300"
                        }
                      `}
                    >

                      <Icon
                        size={18}
                      />

                      {
                        link.label
                      }

                    </Link>

                  );

                }
              )
            }

            <button

              onClick={logout}

              className="
                ml-4
                px-4
                py-2
                rounded-xl
                bg-red-600
                hover:bg-red-500
                transition
              "
            >

              Logout

            </button>

          </nav>

        </div>

      </header>

      <main
        className="
          max-w-7xl
          mx-auto
          px-6
          py-8
        "
      >

        <Outlet />

        <IncomingCallModal />

        <GlobalCallSummary />


      </main>

    </div>

  );

}