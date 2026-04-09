import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Suspense, lazy } from "react";


import {action as loginAction} from '../pages/auth/Login';
import { action as registerAction } from "../pages/auth/Register";

const LandingPage = lazy(() => import("../pages/LandingPage"));
const Home = lazy(() => import("../pages/Home"));
const Community = lazy(() => import("../pages/community/Community"));
const CreatePost = lazy(() => import("../pages/community/CreatePost"));
const PostDetails = lazy(() => import("../pages/community/PostDetails"));
const EditPost = lazy(() => import("../pages/community/EditPost"));
const Login = lazy(() => import("../pages/auth/Login"));
const Register = lazy(() => import("../pages/auth/Register"));
import RootLayout from "./RootLayout";
import Loading from "../components/ui/Loading";
import ErrorPage from "../pages/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<Loading />}>
            <LandingPage />
          </Suspense>
        ),
      },
      {
        path: "login",
        element: (
          <Suspense fallback={<Loading />}>
            <Login />
          </Suspense>
        ),
        action: loginAction
      },
      {
        path: "register",
        element: (
          <Suspense fallback={<Loading />}>
            <Register />
          </Suspense>
        ),
        action: registerAction
      },
      {
        path: "home",
        element: (
          <Suspense fallback={<Loading />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "community",
        element: (
          <Suspense fallback={<Loading />}>
            <Community />
          </Suspense>
        ),
      },
      {
        path: "community/create",
        element: (
          <Suspense fallback={<Loading />}>
            <CreatePost />
          </Suspense>
        ),
      },
      {
        path: "community/edit/:postId",
        element: (
          <Suspense fallback={<Loading />}>
            <EditPost />
          </Suspense>
        ),
      },
      {
        path: "community/:postId",
        element: (
          <Suspense fallback={<Loading />}>
            <PostDetails />
          </Suspense>
        ),
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
