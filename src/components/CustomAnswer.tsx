/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import axios from "axios";
import { SetStateAction, useContext, useState } from "react";
import { AuthContext, AuthUser } from "../context/auth.context";
import toast from "react-hot-toast";
const env = import.meta.env.VITE_BASE_API_URL;

interface CustomAnswerProps {
  teamId: string;
  profileId: string;
  user?: AuthUser;
  onRefresh: () => void;
}

function CustomAnswer({ profileId, user, onRefresh }: CustomAnswerProps) {
  const [answer, setAnswer] = useState("");

  const { getToken } = useContext(AuthContext);
  const handleChange = (e: { target: { value: SetStateAction<string> } }) => {
    setAnswer(e.target.value);
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      await axios.post(
        `${env}/custom/member/${profileId}`,
        {
          email: user?.email,
          name: user?.username,
          answer,
        },
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );
      toast.success("Answer Submitted!");
      setAnswer("");
      onRefresh();
    } catch (error) {
      console.log("Error", error);
    }
  };

  return (
    <div className="relative w-full max-w-xs">
      <form onSubmit={handleSubmit} className="flex">
        <input
          className="w-full h-10 px-4 text-sm text-black placeholder-gray-400 bg-gray-50 border border-purple-50 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#a9a9b3] transition-all duration-200 ease-in-out"
          name="answer"
          type="text"
          value={answer}
          placeholder="Type your answer and hit enter..."
          onChange={handleChange}
          required
        />
      </form>
    </div>
  );
}

export default CustomAnswer;
