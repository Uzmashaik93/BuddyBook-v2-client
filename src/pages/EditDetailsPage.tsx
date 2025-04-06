import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { API_URL } from "../config/api";

import BackButton from "../components/BackButton";
import Loader from "../components/Loader";

import "../pages/CreateProfilePage.css";
import { useForm } from "react-hook-form";
import { Member } from "../types";
const env = import.meta.env.VITE_BASE_API_URL;

function EditProfilePage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Member>();

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

  const handleCancel = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
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

      <div>
        <form
          className="form bg-gradient-to-r from-pink-100 to-blue-100"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="new-profile-title">
            <h2>
              <span>Edit your profile 😎</span>
            </h2>
          </div>
          <div className="flex justify-evenly flex-wrap gap-35">
            <div className="flex flex-col gap-15 w-2xs">
              <div className="flex flex-col">
                <label className="text-center">Hey, what’s your name?</label>
                <input
                  className="input"
                  type="text"
                  {...register("name", { required: true })}
                />
              </div>

              <div className="flex flex-col">
                <label className="text-center">Where are you from?</label>
                <input
                  className="input"
                  type="text"
                  {...register("place", { required: true })}
                />
              </div>

              <div className="flex flex-col">
                <label className="text-center">
                  How many years young are you?
                </label>
                <input
                  className="input"
                  type="number"
                  min="0"
                  {...register("age", { required: true })}
                />
              </div>

              <div className="flex flex-col">
                <label className="text-center">Got any fun hobbies?</label>
                <input
                  className="input"
                  type="text"
                  {...register("hobbies", { required: true })}
                />
              </div>

              <div className="flex flex-col">
                <label className="text-center">Got a LinkedIn?</label>
                <input
                  className="input"
                  type="text"
                  {...register("linkedIn", { required: true })}
                />
              </div>
            </div>

            {/* right side container */}
            <div className="flex flex-col gap-15 w-2xs">
              <div className="flex flex-col">
                <label className="text-center">
                  If this course had a mascot, what would it be?
                </label>
                <input
                  className="input"
                  type="text"
                  {...register("question1", { required: true })}
                />
              </div>

              <div className="flex flex-col">
                <label className="text-center">
                  If your life had a theme song, what would it be?
                </label>
                <input
                  className="input"
                  type="text"
                  {...register("question2", { required: true })}
                />
              </div>
              {/* 
              <div>
                {profile.customQuestions &&
                  profile.customQuestions.map((question, index) => (
                    <div key={index} className="flex flex-col">
                      <label className="text-center">
                        Custom Question #{index + 1}
                      </label>
                      <input
                        className="input"
                        type="text"
                        {...register(`customQuestions[${index}]`, {
                          required: true,
                        })}
                      />
                    </div>
                  ))}
              </div> */}

              {/* <div className="flex flex-col">
                <label className="text-center">Upload your picture</label>

                <input
                  className="input"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                /> */}
              {/* Image Preview */}
              {/* {image && (
                  <div className="flex justify-center mt-4">
                    <img
                      src={image}
                      alt="my cloudinary image"
                      className="w-24 h-24 object-cover rounded-full border"
                    />
                  </div>
                )}
              </div> */}
            </div>
          </div>

          <button className="button-confirm" type="submit">
            Update
          </button>
          <button
            className="button-confirm"
            type="submit"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditProfilePage;
