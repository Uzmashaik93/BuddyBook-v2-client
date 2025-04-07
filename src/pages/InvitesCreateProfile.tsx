import { useForm } from "react-hook-form";
import ProfileForm from "../components/ProfileForm";
import { Member } from "../types";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import BackButton from "../components/BackButton";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
const env = import.meta.env.VITE_BASE_API_URL;

function InvitesCreateProfile() {
  const form = useForm<Member>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;
  const { teamId, inviteId } = useParams();
  const navigate = useNavigate();
  const { getToken } = useContext(AuthContext);

  const onSubmit = async (data: Member) => {
    try {
      const response = await axios.post(
        `${env}/team/${teamId}/member`,
        {
          ...data,
          age: Number(data.age),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("auth")}`,
          },
        }
      );
      await updateInviteStatus();
      console.log("Profile created:", response.data);
      navigate("/teams");
    } catch (error) {
      console.error("Error creating profile:", error);
    }
  };

  const updateInviteStatus = async () => {
    const updatedData = {
      status: "ACCEPTED",
    };
    try {
      const response = await axios.put(
        `${env}/invites/${inviteId}`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );
      console.log("Invite status updated:", response.data);
      navigate("/teams");
    } catch (error) {
      console.error("Error updating invite status:", error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center text-center p-6">
      {/* Back Button */}

      <div className="mr-auto">
        <BackButton text="Back to Team" to={`/teams/${teamId}`} />
      </div>
      <ProfileForm onSubmit={onSubmit} form={form} />
    </div>
  );
}

export default InvitesCreateProfile;
