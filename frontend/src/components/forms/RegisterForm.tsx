import {
  useState
} from "react";

import {
  useNavigate
} from "react-router-dom";

import {
  register
} from "../../api/register.api";

import {
  createSession
} from "../../api/session.api";

import {
  useAuthStore
} from "../../stores/auth.store";

export function RegisterForm() {

  const navigate =
    useNavigate();

  const setAuth =
    useAuthStore(
      (s) => s.setAuth
    );

  const setSession =
    useAuthStore(
      (s) => s.setSession
    );

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  async function handleSubmit(
    e: React.FormEvent
  ) {

    e.preventDefault();

    try {

      setLoading(true);

      setError("");

      const result =
        await register(
          email,
          password
        );

      setAuth(
        result.token,
        result.user
      );

      const session =
        await createSession(
          result.user.userId
        );

      setSession(
        session.sessionId
      );

      navigate("/");

    } catch {

      setError(
        "Registration failed"
      );

    } finally {

      setLoading(false);

    }

  }

  return (

    <form
      onSubmit={handleSubmit}
      className="
        flex
        flex-col
        gap-4
      "
    >

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) =>
          setEmail(
            e.target.value
          )
        }
        className="
          p-3
          rounded-xl
          bg-slate-800
          border
          border-slate-700
          outline-none
        "
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) =>
          setPassword(
            e.target.value
          )
        }
        className="
          p-3
          rounded-xl
          bg-slate-800
          border
          border-slate-700
          outline-none
        "
      />

      {error && (

        <div
          className="
            text-red-400
            text-sm
          "
        >
          {error}
        </div>

      )}

      <button
        disabled={loading}
        className="
          p-3
          rounded-xl
          bg-green-600
          hover:bg-green-500
          hover:scale-[1.02]
          transition
          font-semibold
        "
      >

        {
          loading
            ? "Creating account..."
            : "Create Account"
        }

      </button>

    </form>

  );

}