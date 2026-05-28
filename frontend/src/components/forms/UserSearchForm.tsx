import {
  useState
} from "react";

import {
  getUserByEmail
} from "../../api/auth.api";

import {
  checkPresence
} from "../../api/signaling.api";

import {
  socket
} from "../../socket/socket";

import {
  SOCKET_EVENTS
} from "../../socket/socket.events";

import {
  useAuthStore
} from "../../stores/auth.store";
import toast from "react-hot-toast";


export function UserSearchForm() {

  const currentUser =
    useAuthStore(
      (s) => s.user
    );


  const [email, setEmail] =
    useState("");

  const [result, setResult] =
    useState<any>(null);

  const [online, setOnline] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  async function searchUser() {

    try {

      setLoading(true);

      setError("");

      const user =
        await getUserByEmail(
          email
        );

      setResult(user);

      const presence =
        await checkPresence(
          user.userId
        );

      setOnline(
        presence.online
      );

    } catch {

      setResult(null);

      setOnline(false);

      setError(
        "User not found"
      );

    } finally {

      setLoading(false);

    }

  }

  function startCall() {

    if (
      !result ||
      !currentUser
    ) {
      return;
    }

    socket.emit(
      SOCKET_EVENTS.CALL_USER,
      {
        calleeId:
          result.userId
      }
    );

    toast.success(
      "Calling..."
     );

  }

  return (

    <div
      className="
        p-6
        rounded-3xl
        bg-slate-900/70
        border
        border-slate-700
        shadow-xl
      "
    >

      <h2
        className="
          text-xl
          font-semibold
          mb-4
        "
      >
        Search User
      </h2>

      <div
        className="
          flex
          gap-3
        "
      >

        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }
          className="
            flex-1
            p-3
            rounded-xl
            bg-slate-800
            border
            border-slate-700
            outline-none
          "
        />

        <button
          onClick={searchUser}
          disabled={loading}
          className="
            px-6
            rounded-xl
            bg-blue-600
            hover:bg-blue-500
            hover:scale-105
            font-semibold
          "
        >
          Search
        </button>

      </div>

      {error && (

        <div
          className="
            mt-4
            text-red-400
          "
        >
          {error}
        </div>

      )}

      {result && (

        <div
          className="
            mt-6
            p-4
            rounded-2xl
            bg-slate-800/70
            border
            border-slate-700
            flex
            items-center
            justify-between
          "
        >

          <div>

            <p
              className="
                font-semibold
              "
            >
              {result.email}
            </p>

            <p
              className={`
                text-sm
                ${
                  online
                    ? "text-green-400"
                    : "text-slate-400"
                }
              `}
            >

              {
                online
                  ? "Online"
                  : "Offline"
              }

            </p>

          </div>

          <button

            disabled={!online}

            onClick={startCall}

            className="
              px-5
              py-2
              rounded-xl
              bg-green-600
              hover:bg-green-500
              disabled:bg-slate-700
              disabled:cursor-not-allowed
              hover:scale-105
              transition
            "
          >

            Call

          </button>

        </div>

      )}

    </div>

  );

}