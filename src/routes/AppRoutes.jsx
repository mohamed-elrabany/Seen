import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Suspense, lazy } from "react";

import { action as loginAction } from "../pages/auth/Login";
import { action as registerAction } from "../pages/auth/Register";
import { action as reminderAction } from "../pages/reminders/AddReminder";

const LandingPage = lazy(() => import("../pages/landing/LandingPage"));
const Home = lazy(() => import("../pages/dashboard/Home"));
const Community = lazy(() => import("../pages/community/Community"));
const Search= lazy(() => import("../pages/community/Search"));
const CreatePost = lazy(() => import("../pages/community/CreatePost"));
const PostDetails = lazy(() => import("../pages/community/PostDetails"));
const Login = lazy(() => import("../pages/auth/Login"));
const Register = lazy(() => import("../pages/auth/Register"));
const Profile = lazy(() => import("../pages/profile/Profile"));
const Settings = lazy(() => import("../pages/settings/Settings"));
const Assistant = lazy(() => import("../pages/assistant/Assistant"));
const Chats = lazy(() => import("../pages/chats/Chats"));
const Analysis = lazy(() => import("../pages/analysis/Analysis"));
const AddReminder = lazy(() => import("../pages/reminders/AddReminder"));
const AddLog= lazy(() => import("../pages/logs/AddLog"));
const LogDetails= lazy(() => import("../pages/logs/LogDetails"));

import RootLayout from "./RootLayout";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoutes";
import ErrorPage from "../pages/error/ErrorPage";
import LoadingPage from "../pages/loading/LoadingPage";

const lazy_load = (Component) => (
  <Suspense fallback={<LoadingPage />}>
    <Component />
  </Suspense>
);

const router = createBrowserRouter([
  {
    element: <PublicRoute />,
    errorElement: <ErrorPage />,
    children: [
      {
        element: <RootLayout />,
        children: [
          {
            index: true,
            element: lazy_load(LandingPage),
          },
          {
            path: "login",
            element: lazy_load(Login),
            action: loginAction,
          },
          {
            path: "register",
            element: lazy_load(Register),
            action: registerAction,
          },
        ],
      },
    ],
  },
  {
    element: <ProtectedRoute />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "home",
        element: lazy_load(Home),
      },
      {
        path: "community/:category?",
        element: lazy_load(Community),
      },
      {
        path: "community/search",
        element: lazy_load(Search),
      },
      {
        path: "community/create",
        element: lazy_load(CreatePost),
      },
      {
        path: "community/posts/:postId",
        element: lazy_load(PostDetails),
      },
      {
        path: "profile",
        element: lazy_load(Profile),
      },
      {
        path: "settings",
        element: lazy_load(Settings),
      },
      {
        path: "assistant",
        element: lazy_load(Assistant),
      },
      {
        path: "chats",
        element: lazy_load(Chats),
      },
      {
        path: "reports",
        element: lazy_load(Analysis),
      },
      {
        path: "add-reminder",
        element: lazy_load(AddReminder),
        action: reminderAction,
      },
      {
        path: "add-log",
        element: lazy_load(AddLog),
      },
      {
        path: "logs/:logId",
        element: lazy_load(LogDetails),
      },
    ],
  },
]);

export default function AppRoutes() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
