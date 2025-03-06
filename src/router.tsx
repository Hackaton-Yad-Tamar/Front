import { createBrowserRouter, Navigate } from "react-router-dom";
import Root from "./components/Root";
import ChangePassword from "./views/ChangePassword/ChangePassword";
import ResetPassword from "./views/ChangePassword/ForgotPassword";
import NewPassword from "./views/ChangePassword/NewPassword";
import Home from "./views/FamilyView/pages/Home";
import MyRequests from "./views/FamilyView/pages/MyRequests";
import HomePageView from "./views/HomePageView/HomePageView";
import Leaderboard from "./views/Leaderboard/Leaderboard";
import ProfileView from "./views/ProfileView/ProfileView";
import {Dashboard} from "./views/DashboardView/DashboardView.tsx";

export enum Route {
  root = "/",
  login = "/login",
  home = "home",
  volunteer = "/volunteer",
  requests = "/requests",
  profile = "/profile",
  community = "/community",
  resetPassword = "/reset-password",
  changePassword = "/change-password",
  forgotPassword = "/forgot-password",
  dashboard = "/dashboard",
}
const router = createBrowserRouter([
  {
    path: Route.root,
    element: <Root />,
    children: [
      {
        index: true,
        element: <Navigate to={Route.login} />,
      },
      {
        path: Route.home,
        element: <Home />,
      },
      {
        path: Route.requests,
        element: <MyRequests />,
      },
      {
        path: Route.profile,
        element: <ProfileView />,
      },
      {
        path: Route.community,
        element: <Leaderboard />,
      },
      {
        path: Route.resetPassword,
        element: <NewPassword />,
      },
      {
        path: Route.changePassword,
        element: <ChangePassword />,
      },
      {
        path: Route.forgotPassword,
        element: <ResetPassword />,
      },
      {
        path: Route.dashboard,
        element: <Dashboard />,
      }
    ],
  },
  {
    path: Route.login,
    element: <HomePageView />,
  },
]);

export default router;
