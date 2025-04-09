import { useContext, useEffect, useState } from "react";
import TeamForm from "../components/TeamForm";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Team } from "../types";
import { AuthContext } from "../context/auth.context";
import toast from "react-hot-toast";
const env = import.meta.env.VITE_BASE_API_URL;

function EditTeamPage() {
  const [teamData, setTeamData] = useState<Team>();
  const { teamId } = useParams();
  const { getToken } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${env}/teams/${teamId}`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      .then((response) => {
        setTeamData(response.data.team);
      })
      .catch((error) => {
        console.error("Error fetching teams:", error);
      });
  }, []);

  const handleSubmit = async (data: Team) => {
    try {
      const updatedTeamData = {
        ...teamData,
        teamName: data.teamName,
        createdBy: data.createdBy,
        timestamp: new Date().toLocaleString(),
      };

      await axios.put(`${env}/teams/${teamId}`, updatedTeamData, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });

      toast.success("Team edited successfully!");
      navigate(`/teams`);
    } catch (error) {
      console.error("Error updating team:", error);
      toast.error("Editing Fail!");
    }
  };

  return (
    <div>
      <TeamForm
        onSubmit={handleSubmit}
        teamData={teamData}
        buttonText="Edit Team"
        formHeading="Edit your Team"
      />
    </div>
  );
}

export default EditTeamPage;
