/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import BackButton from "../components/BackButton";
import Loader from "../components/Loader";

import "../pages/CreateProfilePage.css";
import { useForm } from "react-hook-form";
import { Member } from "../types";
import ProfileForm from "../components/ProfileForm";
import toast from "react-hot-toast";
const env = import.meta.env.VITE_BASE_API_URL;

function EditProfilePage() {
  const form = useForm<Member>();
  const { reset } = form;

  const { teamId, profileId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  // const [image, setImage] = useState(null);

  // Fetch existing profile when component loads
  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${env}/team/${teamId}/member/${profileId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("auth")}`,
            },
          }
        );
        reset(response.data.member);
        // Keep the existing image
      } catch (error) {
        console.error("Error fetching profile", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleCancel = () => {
    navigate(`/teams/${teamId}/profile/${profileId}`);
  };

  const onSubmit = async (data: Member) => {
    // const updatedProfile = { ...profile, profileImage: image };

    const updatedProfile = {
      ...data,
      name: data.name,
      place: data.place,
      hobbies: data.hobbies,
      linkedIn: data.linkedIn,
      question1: data.question1,
      question2: data.question2,
      age: Number(data.age),
    };

    try {
      await axios.put(
        `${env}/team/${teamId}/member/${profileId}`,
        updatedProfile,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("auth")}`,
          },
        }
      );
      toast.success("Profile updated");
      navigate(`/teams/${teamId}/profile/${profileId}`);
    } catch (error) {
      console.error("Error updating profile", error);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col justify-center items-center text-center p-6">
      {/* Back Button */}
      <div className="flex mr-auto">
        <BackButton
          text="Back to Team"
          to={`/teams/${teamId}/profile/${profileId}`}
        />
      </div>
      <ProfileForm
        onSubmit={onSubmit}
        showCancel={true}
        form={form}
        onCancel={handleCancel}
        heading={"Edit your profile"}
      />
    </div>
  );
}

export default EditProfilePage;
