import TeamForm from "../components/TeamForm";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Team } from "../types";
const env = import.meta.env.VITE_BASE_API_URL;

function CreateTeamPage() {
  const navigate = useNavigate();

  // Function to handle form submission
  const handleSubmit = async (data: Team) => {
    try {
      const teamName = data.teamName;
      const createdBy = data.createdBy; // Replace with actual user data

      const teamData = { teamName, createdBy };
      console.log("Team Data:", teamData);

      // Make API call using async/await
      const response = await axios.post(`${env}/teams.json`, teamData);
      const teamId = response.data.name; // Get the new team's ID

      // Redirect to the new team's page
      navigate(`/teams/${teamId}`);
    } catch (error) {
      console.error("Error creating team:", error);
      alert("Failed to create team. Please try again.");
    }
  };

  return (
    <div>
      <TeamForm
        onSubmit={handleSubmit}
        buttonText="Create Team"
        formHeading="Create New Team"
      />
    </div>
  );
}

export default CreateTeamPage;
