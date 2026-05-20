import {
  useState
} from "react";

import {
  LoginForm
} from "../components/forms/LoginForm";

import {
  RegisterForm
} from "../components/forms/RegisterForm";

export default function
LoginPage() {

  const [mode, setMode] =
    useState<
      "login" |
      "register"
    >("login");

  return (

    <div
      className="
        flex
        items-center
        justify-center
        min-h-screen
        bg-gradient-to-br
        from-slate-950
        via-slate-900
        to-slate-950
      "
    >

      <div
        className="
          w-full
          max-w-md
          p-8
          rounded-3xl
          bg-slate-900/70
          border
          border-slate-700
          backdrop-blur-xl
          shadow-2xl
        "
      >

        <div
          className="
            flex
            justify-center
            mb-8
          "
        >

          <div
            className="
              flex
              bg-slate-800
              rounded-2xl
              p-1
            "
          >

            <button

              onClick={() =>
                setMode(
                  "login"
                )
              }

              className={`
                px-5
                py-2
                rounded-xl
                transition
                ${
                  mode === "login"
                    ? "bg-blue-600"
                    : ""
                }
              `}
            >

              Login

            </button>

            <button

              onClick={() =>
                setMode(
                  "register"
                )
              }

              className={`
                px-5
                py-2
                rounded-xl
                transition
                ${
                  mode === "register"
                    ? "bg-green-600"
                    : ""
                }
              `}
            >

              Register

            </button>

          </div>

        </div>

        <h1
          className="
            text-4xl
            font-bold
            mb-6
            text-center
          "
        >

          {
            mode === "login"
              ? "Welcome Back"
              : "Create Account"
          }

        </h1>

        {
          mode === "login"
            ? <LoginForm />
            : <RegisterForm />
        }

      </div>

    </div>

  );

}