import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { Trash2, UserPen, UserPlus } from "lucide-react"; // Import icons
import { useNavigate } from "react-router-dom";
import "../pages/TeamsPage.css";
import Loader from "../components/Loader";
import { Team, TeamInvite } from "../types";
import { colorSets } from "../constants";
import { AuthContext } from "../context/auth.context";
import TeamsCard from "../components/TeamsCard";
import { toast } from "react-hot-toast";
const env = import.meta.env.VITE_BASE_API_URL;

function TeamsPage() {
  const [teams, setTeams] = useState<Team[]>([]);

  const [loading, setLoading] = useState(true); // New state to track loading
  const [invites, setInvites] = useState<TeamInvite[]>([]);

  const navigate = useNavigate();

  const { user, getToken } = useContext(AuthContext);

  // Fetch teams when the component mounts
  useEffect(() => {
    fetchTeams();
    getInvites();
  }, []);

  const getInvites = async () => {
    try {
      const response = await axios.get(`${env}/invites`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth")}`,
        },
      });
      setInvites(response.data.invites);
    } catch (error) {
      console.log("Error", error);
    }
  };

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
          toast.error("Team deleted successfully!");
        })
        .catch((error) => {
          console.log("Error", error);
        });
    }
  };

  const handleInviteDecline = async (inviteId: string) => {
    try {
      const updatedData = {
        status: "DECLINED",
      };
      await axios.put(`${env}/invites/${inviteId}`, updatedData, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      toast.error("Inivite Declined");
      window.location.reload();
    } catch (error) {
      console.error("Error declining invite:", error);
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
                <TeamsCard
                  key={team.id}
                  team={team}
                  colors={colors}
                  showView={true}
                  onViewTeam={() => {
                    handleRequestAccess(team, "view");
                  }}
                  actions={
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
                  }
                />
              );
            })}
          </div>
        ) : (
          <p className="text-center text-gray-500 mt-4">No teams available.</p>
        )}

        {/* Display the list of invites if there are any */}
        {invites.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-black drop-shadow-lg mb-4">
              Invites
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {invites.map((invite, index) => {
                const colors = colorSets[index % colorSets.length];
                return user && user.email === invite.invitedUserEmail ? (
                  <TeamsCard
                    key={invite.id}
                    team={invite.team}
                    colors={colors}
                    showView={false}
                    actions={
                      <div className="flex justify-center space-x-4 relative z-10">
                        <button
                          onClick={() => {
                            navigate(
                              `/team/${invite.team.id}/invite/${invite.id}/create`
                            );
                          }}
                          className="text-xs bg-gray-300 hover:bg-gray-500 text-black font-bold py-1 px-3 rounded-full transition duration-300"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => handleInviteDecline(invite.id)}
                          className="text-xs bg-red-300 hover:bg-red-500 text-white font-bold py-1 px-3 rounded-full transition duration-300"
                        >
                          Decline
                        </button>
                      </div>
                    }
                  />
                ) : null;
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TeamsPage;
