import { create }
  from "zustand";

interface User {

  userId: string;

  email: string;

}

interface AuthStore {

  token: string | null;

  user: User | null;

  sessionId: string | null;

  setAuth: (
    token: string,
    user: User
  ) => void;

  setSession: (
    sessionId: string
  ) => void;

  hydrate: () => void;

  logout: () => void;

}

export const useAuthStore =
  create<AuthStore>(
    (set) => ({

      token: null,

      user: null,

      sessionId: null,

      setAuth:
        (token, user) => {

          localStorage.setItem(
            "token",
            token
          );

          localStorage.setItem(
            "user",
            JSON.stringify(user)
          );

          set({
            token,
            user
          });

        },

      setSession:
        (sessionId) => {

          localStorage.setItem(
            "sessionId",
            sessionId
          );

          set({
            sessionId
          });

        },

      hydrate: () => {

        const token =
          localStorage.getItem(
            "token"
          );

        const user =
          localStorage.getItem(
            "user"
          );

        const sessionId =
          localStorage.getItem(
            "sessionId"
          );

        set({

          token,

          sessionId,

          user:
            user
              ? JSON.parse(user)
              : null

        });

      },

      logout: () => {

        localStorage.clear();

        set({

          token: null,

          user: null,

          sessionId: null

        });

      }

    })
  );