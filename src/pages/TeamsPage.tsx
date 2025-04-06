import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Users, Trash2, UserPen, UserPlus } from "lucide-react"; // Import icons
import "../pages/TeamsPage.css";
import Loader from "../components/Loader";
import { Team } from "../types";
import { colorSets } from "../constants";
const env = import.meta.env.VITE_BASE_API_URL;

function TeamsPage() {
  const [teams, setTeams] = useState<Team[]>([]);

  const [loading, setLoading] = useState(true); // New state to track loading

  const navigate = useNavigate();

  // Fetch teams when the component mounts
  useEffect(() => {
    fetchTeams();
  }, []);

  //used to populate the created by input field with the user name.

  // Function to fetch teams data from the API
  const fetchTeams = () => {
    axios
      .get(`${env}/teams`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth")}`,
        },
      })
      .then((response) => {
        const teamsObject = response.data;

        setTeams(teamsObject.teams);

        setLoading(false); // Set loading to false after fetching
      })
      .catch((error) => {
        console.error("Error fetching teams:", error);
        setLoading(false); // Ensure loading is set to false even on error
      });
  };

  const handleRequestAccess = (team: Team, action: "view" | "delete") => {
    if (action === "view") {
      console.log("Team ID:", team);

      navigate(`/teams/${team.id}`);
    }

    if (action === "delete") {
      axios
        .delete(`${env}/teams/${team.id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("auth")}`,
          },
        })
        .then(() => {
          navigate(`/teams`);
          fetchTeams(); // Refresh the teams list after deletion
          alert("Team deleted successfully!");
        })
        .catch((error) => {
          console.log("Error", error);
        });
    }
  };

  // Show loading spinner while fetching data
  if (loading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  return (
    <div>
      <div className="max-w-4xl mx-auto px-4 pb-6 sm:px-6 sm:pb-8">
        <h1 className="text-4xl font-bold text-black drop-shadow-lg mb-4 mt-4">
          Teams Page
        </h1>

        <button
          onClick={() => navigate("/teams/create")}
          className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-full mb-8 transition duration-300 shadow-md"
        >
          Create New Team
        </button>

        {/* Display the list of teams if there are any */}
        {teams.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {teams.map((team, index) => {
              const colors = colorSets[index % colorSets.length];

              return (
                <div
                  key={team.id}
                  className={`rounded-lg p-6 border-2 shadow-lg transform transition-all hover:shadow-2xl transition-shadow duration-300 relative overflow-hidden ${colors.bg} ${colors.border}`}
                >
                  <div className="absolute inset-0 opacity-0 transition-opacity duration-300 hover:opacity-20"></div>
                  <div className="flex justify-center mb-4 relative z-10">
                    <Users className={`w-8 h-8 ${colors.icon}`} />
                  </div>
                  <h2 className="text-lg font-medium mb-2 text-gray-800 relative z-10">
                    Team: {team.teamName}
                  </h2>
                  <p className="text-sm mb-4 relative z-10 text-gray-600">
                    Created by: {team.createdBy.username}
                  </p>
                  <p className="text-sm mb-4 relative z-10 text-gray-800">
                    {team.members ? Object.keys(team.members).length : 0}
                    members
                  </p>
                  <button
                    onClick={() => handleRequestAccess(team, "view")}
                    className="text-sm border-1 border-gray-400 hover:text-gray-600 text-black font-bold py-1.5 px-3 rounded-full mb-4 transition duration-300 relative z-10"
                  >
                    View Team
                  </button>

                  {/* Edit and delete buttons */}
                  <div className="flex justify-center space-x-4 relative z-10">
                    <button
                      onClick={() => navigate(`/teams/${team.id}/edit`)}
                      className="text-xs bg-gray-300 hover:bg-gray-500 text-black font-bold py-1 px-3 rounded-full transition duration-300"
                    >
                      <UserPen className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleRequestAccess(team, "delete")}
                      className="text-xs bg-red-300 hover:bg-red-500 text-white font-bold py-1 px-3 rounded-full transition duration-300"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => navigate(`/invite/${team.id}`)}
                      className="text-xs bg-blue-400 hover:bg-blue-600 text-white font-bold py-1 px-3 rounded-full transition duration-300"
                    >
                      <UserPlus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-center text-gray-500 mt-4">No teams available.</p>
        )}

        {/* Modal for creating or editing a team */}
      </div>
    </div>
  );
}

export default TeamsPage;
