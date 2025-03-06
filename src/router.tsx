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
import { Dashboard } from "./views/DashboardView/DashboardView.tsx";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute.tsx";

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
        element: <PrivateRoute element={<Home />} />,
      },
      {
        path: Route.requests,
        element: <PrivateRoute element={<MyRequests />} />,
      },
      {
        path: Route.profile,
        element: <PrivateRoute element={<ProfileView />} />,

      },
      {
        path: Route.community,
        element: <PrivateRoute element={<Leaderboard />} />,
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
        element: <PrivateRoute element={<Dashboard />} />,
      }
    ],
  },
  {
    path: Route.login,
    element: <HomePageView />,
  },
]);

export default router;
