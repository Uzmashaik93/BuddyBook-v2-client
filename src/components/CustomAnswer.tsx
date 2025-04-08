/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import axios from "axios";
import { SetStateAction, useState } from "react";
const env = import.meta.env.VITE_BASE_API_URL;

interface CustomAnswerProps {
  teamId: string;
  profileId: string;
  user: {
    email: string;
    displayName: string;
  };
  onRefresh: () => void;
}

function CustomAnswer({
  teamId,
  profileId,
  user,
  onRefresh,
}: CustomAnswerProps) {
  const [answer, setAnswer] = useState("");

  const handleChange = (e: { target: { value: SetStateAction<string> } }) => {
    setAnswer(e.target.value);
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    axios
      .post(
        `${env}/custom/member/${profileId}`,
        {
          email: user.email,
          name: user.displayName,
          answer,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("auth")}`,
          },
        }
      )
      .then((response) => {
        console.log("Answer submitted successfully", response.data);
        setAnswer("");
        onRefresh();
      })
      .catch((error) => {
        console.log("Error", error);
      });
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
