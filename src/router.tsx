import { createBrowserRouter, Navigate } from "react-router-dom";
import Root from "./components/Root";
import { mockUser } from "./mockUser";
import Home from "./views/FamilyView/pages/Home";
import MyRequests from "./views/FamilyView/pages/MyRequests";
import HomePageView from "./views/HomePageView/HomePageView";
import ProfileView from "./views/ProfileView/ProfileView";

export enum Route {
  login = "/login",
  home = "home",
  volunteer = "/volunteer",
  requests = "/requests",
  profile = "/profile",
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
        element: <MyRequests />,
      },
      {
        path: Route.profile,
        element: <ProfileView user={mockUser} />,
      },
    ],
  },
  {
    path: Route.login,
    element: <HomePageView />,
  },
]);

export default router;
