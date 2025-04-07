import { Users } from "lucide-react"; // Import icons
import { Team } from "../types";
import { ReactNode } from "react";

interface TeamCardProps {
  team: Team;
  colors: {
    bg: string;
    border: string;
    icon: string;
  };
  onViewTeam?: () => void;
  actions: ReactNode;
  showView: boolean;
}

function TeamsCard({
  team,
  colors,
  onViewTeam,
  actions,
  showView,
}: TeamCardProps) {
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
      {showView && (
        <button
          onClick={() => onViewTeam?.()}
          className="text-sm border-1 border-gray-400 hover:text-gray-600 text-black font-bold py-1.5 px-3 rounded-full mb-4 transition duration-300 relative z-10"
        >
          View Team
        </button>
      )}
      {actions}
    </div>
  );
}

export default TeamsCard;
