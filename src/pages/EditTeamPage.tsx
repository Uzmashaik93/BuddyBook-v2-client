import React, { useEffect, useState } from "react";
import TeamForm from "../components/TeamForm";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Team } from "../types";
const env = import.meta.env.VITE_BASE_API_URL;

function EditTeamPage() {
  const [teamData, setTeamData] = useState<Team>();
  const { teamId } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${env}/teams/${teamId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth")}`,
        },
      })
      .then((response) => {
        console.log("Fetched teams:", response.data);
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

      const response = await axios.put(
        `${env}/teams/${teamId}`,
        updatedTeamData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("auth")}`,
          },
        }
      );

      console.log("Team updated successfully:", response.data);
      alert("Team updated successfully!");

      navigate(`/teams`);
    } catch (error) {
      console.error("Error updating team:", error);
      alert("Failed to update team. Please try again.");
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
