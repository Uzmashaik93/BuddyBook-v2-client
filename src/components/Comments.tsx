import axios from "axios";
import { useState } from "react";
import { AuthUser } from "../context/auth.context";
import toast from "react-hot-toast";
const env = import.meta.env.VITE_BASE_API_URL;

interface CommentsProps {
  teamId: string;
  profileId: string;
  user?: AuthUser;
  onRefresh: () => void;
}

function Comments({ profileId, user, onRefresh }: CommentsProps) {
  const [comment, setComment] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setComment(event.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await axios.post(
        `${env}/comments/member/${profileId}`,
        {
          comment,
          name: user?.username,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("auth")}`,
          },
        }
      );

      toast.success("Comment submitted!");
      setComment("");
      onRefresh();
    } catch (error) {
      console.log("Error", error);
    }
  };
  return (
    <div className="relative w-full max-w-xs mb-9 mt-8">
      <form onSubmit={handleSubmit}>
        <input
          className="w-[90%] md:w-[400px] h-10 px-4 text-sm lg:w-90 text-black placeholder-gray-400 bg-gray-50 border border-purple-50 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#a9a9b3] transition-all duration-200 ease-in-out"
          name="text"
          type="text"
          value={comment}
          placeholder="Leave me a message here... 🙌"
          onChange={handleChange}
          required
        />
      </form>
    </div>
  );
}

export default Comments;
