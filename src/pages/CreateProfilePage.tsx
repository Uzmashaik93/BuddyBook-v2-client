/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
const env = import.meta.env.VITE_BASE_API_URL;

import BackButton from "../components/BackButton";

import "../pages/CreateProfilePage.css";
import { useForm } from "react-hook-form";
import { Member } from "../types";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import ProfileForm from "../components/ProfileForm";
import toast from "react-hot-toast";

function CreateProfilePage() {
  const { teamId } = useParams();

  const navigate = useNavigate();

  const form = useForm<Member>();

  const { getToken } = useContext(AuthContext);

  const onSubmit = async (data: Member) => {
    try {
      await axios.post(
        `${env}/team/${teamId}/member`,
        {
          ...data,
          age: Number(data.age),
        },
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );
      toast.success("Profile created successfully!");
      navigate(`/teams/${teamId}`);
    } catch (error) {
      toast.error("Error creating profile");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center text-center p-6">
      {/* Back Button */}

      <div className="mr-auto">
        <BackButton text="Back to Team" to={`/teams/${teamId}`} />
      </div>
      <ProfileForm
        onSubmit={onSubmit}
        form={form}
        heading={"Create your profile"}
      />
    </div>
  );
}
export default CreateProfilePage;
