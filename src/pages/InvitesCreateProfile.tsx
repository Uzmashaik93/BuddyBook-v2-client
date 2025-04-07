import { useForm } from "react-hook-form";
import ProfileForm from "../components/ProfileForm";
import { Member } from "../types";
import { useParams } from "react-router-dom";
import axios from "axios";
const env = import.meta.env.VITE_BASE_API_URL;

function InvitesCreateProfile() {
  const form = useForm<Member>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;
  const { teamId } = useParams();

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
      console.log("Profile created:", response.data);
      navigate("/teams");
    } catch (error) {
      console.error("Error creating profile:", error);
    }
  };

  return (
    <div>
      <ProfileForm form={form} onSubmit={onSubmit} />
    </div>
  );
}

export default InvitesCreateProfile;
