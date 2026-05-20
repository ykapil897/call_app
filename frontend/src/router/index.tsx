import {
  createBrowserRouter
} from "react-router-dom";

import {
  AppLayout
} from "../layouts/AppLayout";

import LoginPage
  from "../pages/LoginPage";

import DashboardPage
  from "../pages/DashboardPage";

import BillingPage
  from "../pages/BillingPage";

import HistoryPage
  from "../pages/HistoryPage";

import CallPage
  from "../pages/CallPage";

import {
  ProtectedRoute
} from "../components/auth/ProtectedRoute";

export const router =
  createBrowserRouter([

    {
      path: "/login",

      element: <LoginPage />
    },

    {
      path: "/",

      element: (

        <ProtectedRoute>

            <AppLayout />

        </ProtectedRoute>

    ),

      children: [

        {
          index: true,

          element:
            <DashboardPage />
        },

        {
          path: "billing",

          element:
            <BillingPage />
        },

        {
          path: "history",

          element:
            <HistoryPage />
        },

        {
          path: "call/:callId",

          element:
            <CallPage />
        }

      ]

    }

  ]);