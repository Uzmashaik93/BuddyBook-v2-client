import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import TeamsPage from "./pages/TeamsPage";
import MembersPage from "./pages/MembersPage";
import Profile from "./pages/ProfileDetailPage";
import ErrorPage from "./pages/ErrorPage";
import Navbar from "./components/Navbar";
import CreateProfilePage from "./pages/CreateProfilePage";
import About from "./pages/AboutPage";
import EditDetailsPage from "./pages/EditDetailsPage";
import CreateTeamPage from "./pages/CreateTeamPage";
import EditTeamPage from "./pages/EditTeamPage";
import SignUpPage from "./pages/SignUpPage";

function App() {
  return (
    <div>
      <Navbar />

      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/teams" element={<TeamsPage />} />
        <Route path="/teams/create" element={<CreateTeamPage />} />
        <Route path="/teams/:teamId/edit" element={<EditTeamPage />} />
        <Route path="/teams/:id" element={<MembersPage />} />
        <Route path="/profile/create/:teamId" element={<CreateProfilePage />} />
        <Route path="/signup" element={<SignUpPage />} />

        <Route path="/teams/:teamId/profile/:profileId" element={<Profile />} />
        <Route
          path="/teams/:teamId/members/:profileId/edit"
          element={<EditDetailsPage />}
        />
        <Route path="/about" element={<About />} />
        <Route path="/*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;
