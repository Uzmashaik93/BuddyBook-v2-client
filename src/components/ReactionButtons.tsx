import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { AuthContext } from "../context/auth.context";

const env = import.meta.env.VITE_BASE_API_URL;

const reactions = [
  { emoji: "👏🏻", label: "Cheer", type: "cheer" },
  { emoji: "❤️", label: "Heart", type: "heart" },
  { emoji: "🎉", label: "Celebrate", type: "celebrate" },
  { emoji: "😊", label: "Smile", type: "smile" },
  { emoji: "✨", label: "Appreciate", type: "appreciate" },
];

function ReactionButtons() {
  const { teamId, profileId } = useParams();
  const { getToken } = useContext(AuthContext);
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [userReaction, setUserReaction] = useState<string | null>(null);

  useEffect(() => {
    const fetchReactions = async () => {
      if (!teamId || !profileId) return;

      try {
        const res = await axios.get(`${env}/reactions/${teamId}/${profileId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("auth")}`,
          },
        });
        setCounts(res.data.counts || {});
        setUserReaction(res.data.userReaction);
      } catch (err) {
        console.error("Error fetching reactions", err);
      }
    };

    fetchReactions();
  }, [teamId, profileId]);

  const handleReaction = async (type: string) => {
    if (!teamId || !profileId) return;

    try {
      const response = await axios.post(
        `${env}/reactions/${profileId}`,
        {
          type,
          teamId,
          profileId,
        },
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );
      console.log("Reactions response:", response);

      // Optimistic UI update
      setCounts((prev) => {
        const updatedCounts = { ...prev };

        // Increase the count for the new reaction
        updatedCounts[type] = (updatedCounts[type] || 0) + 1;

        return updatedCounts;
      });

      setUserReaction(type);
      toast.success("Reaction sent!");
    } catch (err) {
      console.error("Failed to send reaction", err);
      toast.error("Failed to react");
    }
  };

  return (
    <div className="flex justify-center mt-0 mb-4">
      <div className="flex justify-center items-center text-xl shadow-xl z-10 bg-white gap-1.5 p-1 pl-0.5 pr-1 rounded-xl">
        {reactions.map((reaction, index) => {
          const isActive = userReaction === reaction.type;

          return (
            <button
              key={index}
              onClick={() => handleReaction(reaction.type)}
              className={`relative hover:-translate-y-2 hover:scale-110 transition cursor-pointer rounded-full p-2 px-3 ${
                isActive ? "bg-blue-100 text-blue-700" : "bg-white"
              }`}
              data-label={reaction.label}
            >
              <span className="pointer-events-none">{reaction.emoji}</span>{" "}
              <span className="text-xs">{counts[reaction.type] || 0}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default ReactionButtons;
