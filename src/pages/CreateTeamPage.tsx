import TeamForm from "../components/TeamForm";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Team } from "../types";
const env = import.meta.env.VITE_BASE_API_URL;
import { toast } from "react-hot-toast";

function CreateTeamPage() {
  const navigate = useNavigate();

  // Function to handle form submission
  const handleSubmit = async (data: Team) => {
    try {
      const teamName = data.teamName;

      const teamData = { teamName };
      console.log("Team Data:", teamData);

      // Make API call using async/await
      await axios.post(`${env}/teams`, teamData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth")}`,
        },
      });

      toast.success("Team Created Successfully!");
      navigate("/teams");
    } catch (error) {
      console.error("Error creating team:", error);
      toast.error("Failed to create team!");
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
