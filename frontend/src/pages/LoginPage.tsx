import {
  LoginForm
} from "../components/forms/LoginForm";

export default function LoginPage() {

  return (

    <div
      className="
        flex
        items-center
        justify-center
        min-h-screen
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

        <h1
          className="
            text-4xl
            font-bold
            mb-6
          "
        >
          Call Platform
        </h1>

        <LoginForm />

      </div>

    </div>

  );

}