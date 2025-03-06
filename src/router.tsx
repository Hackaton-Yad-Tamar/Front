import { RequestPage } from "@mui/icons-material";
import { createBrowserRouter, Navigate } from "react-router-dom";
import Root from "./components/Root";
import { mockUser } from "./mockUser";
import Home from "./views/FamilyView/pages/Home";
import HomePageView from "./views/HomePageView/HomePageView";
import ProfileView from "./views/ProfileView/ProfileView";
import Leaderboard from "./views/Leaderboard/Leaderboard";

export enum Route {
  login = "/login",
  home = "home",
  volunteer = "/volunteer",
  requests = "/requests",
  profile = "/profile",
  community = "/community",
}

const router = createBrowserRouter([
  {
    path: "/",
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
        element: <RequestPage />,
      },
      {
        path: Route.profile,
        element: <ProfileView user={mockUser} />,
      },
      {
        path: Route.community,
        element: <Leaderboard />,
      }
    ],
  },
  {
    path: Route.login,
    element: <HomePageView />,
  },
]);

export default router;
