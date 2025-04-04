import "../pages/MembersPage.css";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import Loader from "../components/Loader";
import { Plus, User } from "lucide-react";
import { colorSetsMembers } from "../constants";
import { AuthContext } from "../context/auth.context";
import { Member, Team } from "../types";
const env = import.meta.env.VITE_BASE_API_URL;

function MembersPage() {
  const { id } = useParams();
  console.log(id);
  const { getToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const [team, setTeam] = useState<{
    id: string;
    teamName: string;
    createdBy: string;
    createdAt: string;
    updatedAt: string;
  } | null>(null);
  const [members, setMembers] = useState([]);

  // Function to get a random color set
  const getRandomColorSet = () => {
    const randomIndex = Math.floor(Math.random() * colorSetsMembers.length);
    return colorSetsMembers[randomIndex];
  };

  // Fetch team data when the component mounts

  const fetchTeamData = async () => {
    try {
      if (!id) {
        console.error("Team ID is not defined");
        return;
      }
      const response = await axios.get(`${env}/team/${id}`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      console.log(response.data);

      const { members } = response.data;

      if (members) {
        setMembers(members);
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  useEffect(() => {
    axios
      .get(`${env}/teams/${id}`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      .then((response) => {
        const teamObject = response.data.team;

        setTeam(teamObject);
      });
    if (id) {
      fetchTeamData();
    }
  }, [id]);

  if (team === null) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  return (
    <div>
      <div className="mt-9 ml-9">
        <BackButton text="Back to Teams" to="/teams" />
      </div>

      <div className="flex flex-col md:flex-row flex-wrap items-center gap-4 justify-center w-full px-6 pb-6 md:px-10 md:pb-0 md:mb-8 mt-4">
        <div className="text-center flex-1">
          <h2 className="text-4xl font-bold text-black drop-shadow-lg">
            Team Name:{team?.teamName}
          </h2>
          <h1 className="text-xs !mb-0 !text-gray-400 font-bold mt-1">
            Created by {team?.createdBy}
          </h1>
        </div>
      </div>

      <button
        onClick={() => {
          navigate(`/profile/create/${id}`);
        }}
        className="flex gap-1 bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 shadow-md mx-auto  mb-10 hover:cursor-pointer"
      >
        <Plus strokeWidth={4} size={25} />
        Add Your Profile
      </button>

      <div className="flex justify-evenly flex-wrap gap-6 ml-10 mr-10 mb-10">
        {!members.length ? (
          <div className="flex items-center justify-center text-gray-300 mt-30">
            No Profiles Created!
          </div>
        ) : (
          members.map((profileObj: Member) => {
            // Assign a unique random color set to each card

            const colors = getRandomColorSet();

            return (
              <div
                key={profileObj.id}
                className={`${colors.bg} ${colors.border} border-2 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden h-55 w-56 flex flex-col items-center p-4`} // Smaller card size
              >
                {/* Image Container */}
                <div className="w-20 h-20 overflow-hidden rounded-full flex items-center justify-center">
                  {profileObj.profileImage ? (
                    <img
                      className="w-full h-full object-cover"
                      src={profileObj.profileImage}
                      alt="Profile"
                    />
                  ) : (
                    <User className="user-icon" />
                  )}
                </div>
                {/* Text Content */}
                <div className="text-center mt-4">
                  <h3 className="text-l font-semibold text-gray-800">
                    {profileObj.name}
                  </h3>
                  <p className="text-sm text-gray-600">{profileObj.place}</p>
                </div>
                {/* Button */}
                <div className="mt-4">
                  <NavLink to={`/teams/${id}/profile/${profileObj.id}`}>
                    <button className="px-4 py-2 bg-transparent border border-gray-400 rounded-full text-xs font-bold text-gray-700 hover:bg-gray-100 transition-colors duration-300 shadow-sm">
                      View Profile
                    </button>
                  </NavLink>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default MembersPage;
