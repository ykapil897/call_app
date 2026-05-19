import {
  Outlet,
  Link
} from "react-router-dom";

export function AppLayout() {

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