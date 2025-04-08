import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { Trash2, UserPen, Smile, Paperclip, Palmtree } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";

import ReactionButtons from "../components/ReactionButtons";
import Loader from "../components/Loader";
import BackButton from "../components/BackButton";
import CustomAnswer from "../components/CustomAnswer";
import Comments from "../components/Comments";
import CardCarousel from "../components/CardCarousal";
import CommentsCard from "../components/CommentsCard";

import dummyImage from "../assets/images/dummy-profile-image.png";
import { AuthContext } from "../context/auth.context";
import { Member } from "../types";

const env = import.meta.env.VITE_BASE_API_URL;

function Profile() {
  const { profileId, teamId } = useParams();
  const [profile, setProfile] = useState<Member | null>(null);
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  const getProfile = async () => {
    try {
      const response = await axios.get(
        `${env}/team/${teamId}/member/${profileId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("auth")}`,
          },
        }
      );
      console.log("Fetched profile:", response.data);

      setProfile(response.data.member);
    } catch (e) {
      console.log("Error", e);
      setProfile(null);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `${env}/team/${teamId}/member/${profileId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("auth")}`,
          },
        }
      );
      if (response.status === 200) {
        alert("Profile deleted successfully");
        navigate(`/teams/${teamId}`);
      }
    } catch (error) {
      console.error("Error deleting profile:", error);
      alert("Error deleting profile. Please try again.");
    }
  };

  if (profile === null) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  //if profile has custom answers then map through the list

  const customAnswers = profile.customAnswers ?? [];

  //if profile has comments then map through the list

  const comments = profile.comments ?? [];

  return (
    <div className="profile-page p-4 md:p-8">
      <div className="flex justify-between items-center mb-4 mt-2">
        <BackButton text="Back to Profiles" to={`/teams/${teamId}`} />
      </div>

      <div className="bg-white shadow-lg rounded-lg p-6 w-full md:w-4/5 mx-auto mb-5">
        <h1 className="text-3xl font-bold mb-4">{profile.name}'s Profile</h1>

        <div className="flex flex-col md:flex-row justify-between mb-3">
          {/* Left Block */}
          <div className="flex flex-col items-center md:w-1/2 mb-4 relative group mr-8 pl-11">
            <div className="bg-white p-4 shadow-md rounded-md mb-4 relative group-hover:shadow-[0_0_10px_rgb(255,165,0)] transition duration-300">
              <Paperclip
                className="text-gray-700 absolute top-0 left-0 -m-4"
                size={70}
              />
              <img
                src={profile.imageUrl || dummyImage}
                alt="Profile"
                className="w-64 h-64 object-cover mb-2"
              />
              <div className="flex justify-center items-center text-lg font-semibold gap-3">
                <Smile className="text-orange-300 mt-3" />
                <Palmtree className="text-green-600 mt-2" />
              </div>
            </div>

            <div className="text-center">
              <h1 className="text-xl font-semibold mt-3">
                My name is {profile.name}
              </h1>
            </div>

            <ReactionButtons />

            <div className="mt-5">
              <a
                href={profile.linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-blue-300"
              >
                <FontAwesomeIcon icon={faLinkedin} size="2x" />
              </a>
            </div>
          </div>

          {/* Right Block */}
          <div className="md:w-1/2 relative">
            <div className="mb-3">
              <h1 className="text-xl font-semibold !text-gray-500">
                More about me 😊
              </h1>
              <div className="mb-10">
                <div className="bg-yellow-100/60 p-2 rounded-lg shadow-inner mb-5">
                  <p className="text-lg">I am {profile.age} years young</p>
                </div>
                <div className="bg-orange-100/60 p-2 rounded-lg shadow-inner mb-5">
                  <h2 className="text-lg">I am from {profile.place}</h2>
                </div>
                <div className="bg-green-100/60 p-2 rounded-lg shadow-inner mb-5">
                  <h2 className="text-lg">My hobbies are {profile.hobbies}</h2>
                </div>
              </div>

              <div className="mb-4">
                <h1 className="text-xl font-semibold !text-gray-500">
                  My answers
                </h1>
                <h2 className="font-semibold mb-3">
                  If this course had a mascot, what would it be?
                </h2>
                <div className="bg-pink-100/60 p-3 rounded-lg shadow-inner mb-10">
                  <p>{profile.question1}</p>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <h2 className="font-semibold mb-3">
                If your life had a theme song, what would it be?
              </h2>
              <div className="bg-blue-100/60 p-3 rounded-lg shadow-inner mb-10">
                <p>{profile.question2}</p>
              </div>
            </div>

            <div className="relative flex justify-end gap-5 p-2">
              <NavLink to={`/teams/${teamId}/members/${profileId}/edit`}>
                <button>
                  <UserPen size={29} className="mt-2" />
                </button>
              </NavLink>
              <button
                className="text-red-500 hover:cursor-pointer"
                onClick={handleDelete}
              >
                <Trash2 size={29} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 bg-gradient-to-br from-white to-gray-100 p-4 sm:p-6 rounded-lg shadow-lg mt-4 md:ml-17 md:mr-17 xl:ml-42 xl:mr-42">
        <h2 className="text-xl font-semibold mb-4 sm:mb-6 text-black drop-shadow-lg">
          Messages from Colleagues
        </h2>

        {/* Split screen container */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left half */}
          <div className="flex flex-col w-full lg:w-1/2 items-start">
            <h2 className="font-semibold text-left ml-5 flex ">
              {profile.customQuestion}
            </h2>
            {/* Custom Question Section */}
            <div className="ml-3">
              <h1 className="text-xs !text-gray-400">
                Add your own answer below 😇
              </h1>
            </div>
            <div className="flex justify-start w-full ml-3">
              <CustomAnswer
                teamId={teamId || ""}
                profileId={profileId || ""}
                user={user}
                onRefresh={() => getProfile()}
              />
            </div>

            <div className="mb-3 w-full -mt-2">
              {customAnswers.length > 0 && (
                <CardCarousel list={customAnswers} />
              )}
            </div>
          </div>

          {/* Right half */}
          <div className="w-full lg:w-1/2">
            <Comments
              teamId={teamId || ""}
              profileId={profileId || ""}
              user={user}
              onRefresh={() => getProfile()}
            />

            {/* Message Box with Scrollable Content */}
            <div className="message-box mt-4 h-90 overflow-y-auto border border-gray-300 rounded-lg p-2">
              <div>
                {comments.length > 0 && <CommentsCard list={comments} />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
