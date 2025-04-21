import "../pages/MembersPage.css";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import Loader from "../components/Loader";
import { Plus, User } from "lucide-react";
import { colorSetsMembers } from "../constants";
import { AuthContext } from "../context/auth.context";
import { Member, Team, TeamInvite } from "../types";
const env = import.meta.env.VITE_BASE_API_URL;

function MembersPage() {
  const { id } = useParams();
  const { getToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [team, setTeam] = useState<Team>();
  const [members, setMembers] = useState([]);
  const [invites, setInvites] = useState<TeamInvite[]>([]);

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

      const { members } = response.data;

      if (members) {
        setMembers(members);
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  const getInvites = async () => {
    try {
      const response = await axios.get(`${env}/invites/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth")}`,
        },
      });

      setInvites(response.data.invites);
    } catch (error) {
      console.log("Error", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${env}/teams/${id}`, {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        });
        const teamObject = response.data.team;
        setTeam(teamObject);

        if (id) {
          await fetchTeamData();
          await getInvites();
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  if (team === null) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  return (
    <div className="mt-15">
      <div className="mt-9 flex justify-center md:justify-start">
        <BackButton text="Back to Teams" to="/teams" />
      </div>

      <div className="flex flex-col md:flex-row flex-wrap items-center gap-4 justify-center w-full px-2 pb-6 md:px-10 md:pb-0 md:mb-8 mt-4">
        <div className="text-center flex-1">
          <h2 className="text-2xl font-bold text-black drop-shadow-lg">
            Team Name:{team?.teamName}
          </h2>
        </div>
      </div>
      <div className="flex justify-center align-middle">
        <div className="flex gap-5">
          <button
            onClick={() => {
              navigate(`/profile/create/${id}`);
            }}
            className="flex gap-1 bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 shadow-md mx-auto  mb-10 hover:cursor-pointer"
          >
            <Plus strokeWidth={4} size={25} /> Profile
          </button>

          {invites && invites.length > 0 && (
            <button
              className="flex gap-1 bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 shadow-md mx-auto  mb-10 hover:cursor-pointer"
              onClick={() => setShowModal(!showModal)}
            >
              Invites List
            </button>
          )}
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-white/10 backdrop-blur-xs bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-gradient-to-br from-pink-100 via-white  to-yellow-50 rounded-lg shadow-lg w-11/12 md:w-1/4 max-h-3/4 overflow-y-auto p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Invites List</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            {invites.length > 0 ? (
              <ul className="space-y-4">
                {invites.map((invite) => (
                  <li
                    key={invite.id}
                    className="border rounded-lg p-4 flex justify-between items-center"
                  >
                    <div>
                      <p className="font-semibold">{invite.invitedUserEmail}</p>
                      <p className="text-sm text-gray-600">
                        Status: {invite.status}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No invites available.</p>
            )}
          </div>
        </div>
      )}
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
                className={`${colors.bg} ${colors.border} border-2 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden h-58 w-56 flex flex-col items-center p-2`} // Smaller card size
              >
                {/* Image Container */}
                <div className="w-20 h-20 overflow-hidden rounded-full flex items-center justify-center">
                  {profileObj.imageUrl ? (
                    <img
                      className="w-full h-full object-cover"
                      src={profileObj.imageUrl}
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
                  {team && team.userId === profileObj.userId && (
                    <p className="text-sm text-gray-600">Admin</p>
                  )}
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
