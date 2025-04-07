import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { API_URL } from "../config/api";

import BackButton from "../components/BackButton";
import Loader from "../components/Loader";

import "../pages/CreateProfilePage.css";
import { useForm } from "react-hook-form";
import { Member } from "../types";
import ProfileForm from "../components/ProfileForm";
const env = import.meta.env.VITE_BASE_API_URL;

function EditProfilePage() {
  const form = useForm<Member>();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = form;

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
        console.log("Fetched profile:", response.data);
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

  // Convert image to Base64
  // const handleFileChange = async (event) => {
  //   const file = event.target.files[0];
  //   if (file) {
  //     const formData = new FormData();
  //     formData.append("file", file);
  //     formData.append(
  //       "upload_preset",
  //       import.meta.env.VITE_UNSIGNED_UPLOAD_PRESET
  //     );
  //     formData.append("cloud_name", import.meta.env.VITE_CLOUD_NAME);

  //     try {
  //       const response = await axios.post(
  //         `https://api.cloudinary.com/v1_1/${
  //           import.meta.env.VITE_CLOUD_NAME
  //         }/upload`,
  //         formData
  //       );
  //       // After successful upload, store the image URL
  //       setImage(response.data.secure_url);
  //     } catch (error) {
  //       console.error("Error uploading the file:", error);
  //     }
  //   }
  // };

  // Handle input change
  // const handleChange = (event) => {
  //   setProfile({ ...profile, [event.target.name]: event.target.value });
  // };

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
      console.log("Profile updated successfully");
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
      />
    </div>
  );
}

export default EditProfilePage;
