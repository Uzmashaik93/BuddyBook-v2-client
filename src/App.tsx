import "./pages/TeamsPage.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Homepage from "./pages/Homepage";
import TeamsPage from "./pages/TeamsPage";
import MembersPage from "./pages/MembersPage";
import Profile from "./pages/ProfileDetailPage";
import ErrorPage from "./pages/ErrorPage";
import CreateProfilePage from "./pages/CreateProfilePage";
import EditDetailsPage from "./pages/EditDetailsPage";
import CreateTeamPage from "./pages/CreateTeamPage";
import EditTeamPage from "./pages/EditTeamPage";
import SignUpPage from "./pages/SignUpPage";
import LogInPage from "./pages/LogInPage";
import NonAuthPages from "./pages/NonAuthPages";
import AboutPage from "./pages/AboutPage";
import AuthPages from "./pages/AuthPages";
import InivitePage from "./pages/InivitePage";
import InvitesCreateProfile from "./pages/InvitesCreateProfile";

const router = createBrowserRouter([
  {
    path: "/",
    Component: NonAuthPages,
    errorElement: <ErrorPage />,
    children: [
      { index: true, Component: Homepage },
      { path: "signup", Component: SignUpPage },
      { path: "login", Component: LogInPage },
      { path: "about", Component: AboutPage },
    ],
  },
  {
    path: "/teams",
    Component: AuthPages,
    errorElement: <ErrorPage />,
    children: [
      { index: true, Component: TeamsPage },
      {
        path: "/teams/create",
        Component: CreateTeamPage,
      },
      {
        path: "/teams/:teamId/edit",
        Component: EditTeamPage,
      },
      {
        path: "/teams/:id",
        Component: MembersPage,
      },
      {
        path: "/teams/:teamId/profile/:profileId",
        Component: Profile,
      },
      {
        path: "/teams/:teamId/members/:profileId/edit",
        Component: EditDetailsPage,
      },
    ],
  },
  {
    path: "/profile",
    Component: AuthPages,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        path: "/profile/create/:teamId",
        Component: CreateProfilePage,
      },
    ],
  },
  {
    path: "/invite",
    Component: AuthPages,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        path: "/invite/:teamId",
        Component: InivitePage,
      },
      {
        path: "/invite/:teamId/create",
        Component: InvitesCreateProfile,
      },
    ],
  },
]);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
