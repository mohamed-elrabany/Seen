import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Suspense, lazy } from "react";

import { action as loginAction } from "../pages/auth/Login";
import { action as registerAction } from "../pages/auth/Register";

const LandingPage = lazy(() => import("../pages/landing/LandingPage"));
const Home = lazy(() => import("../pages/dashboard/Home"));
const Community = lazy(() => import("../pages/community/Community"));
const CreatePost = lazy(() => import("../pages/community/CreatePost"));
const PostDetails = lazy(() => import("../pages/community/PostDetails"));
const EditPost = lazy(() => import("../pages/community/EditPost"));
const Login = lazy(() => import("../pages/auth/Login"));
const Register = lazy(() => import("../pages/auth/Register"));
const Profile = lazy(() => import("../pages/profile/Profile"));
const Settings = lazy(() => import("../pages/settings/Settings"));
const Assistant = lazy(() => import("../pages/assistant/Assistant"));
const Chats = lazy(() => import("../pages/chats/Chats"));
const Reports = lazy(() => import("../pages/reports/Reports"));

import RootLayout from "./RootLayout";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoutes";
import Loading from "../components/ui/Loading";
import ErrorPage from "../pages/error/ErrorPage";

const lazy_load = (Component) => (
  <Suspense fallback={<Loading />}>
    <Component />
  </Suspense>
);

const router = createBrowserRouter([
  {
    element: <PublicRoute />,
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
        path: "community",
        element: lazy_load(Community),
      },
      {
        path: "community/create",
        element: lazy_load(CreatePost),
      },
      {
        path: "community/edit/:postId",
        element: lazy_load(EditPost),
      },
      {
        path: "community/:postId",
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
        element: lazy_load(Reports),
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
