import axios from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../config/api";

import BackButton from "../components/BackButton";

import "../pages/CreateProfilePage.css";

function CreateProfilePage() {
  const { teamId } = useParams();

  const navigate = useNavigate();

  const [image, setImage] = useState(null);
  const [waitingForImageUrl, setWaitingForImageUrl] = useState(false);

  const handleImage = (event) => {
    setWaitingForImageUrl(true);

    const url = `https://api.cloudinary.com/v1_1/${
      import.meta.env.VITE_CLOUD_NAME
    }/upload`;
    const dataToUpload = new FormData();
    dataToUpload.append("file", event.target.files[0]);
    // VITE_UNSIGNED_UPLOAD_PRESET => name of the unsigned upload preset created in your Cloudinary account
    dataToUpload.append(
      "upload_preset",
      import.meta.env.VITE_UNSIGNED_UPLOAD_PRESET
    );
    axios
      .post(url, dataToUpload)
      .then((response) => {
        // the image url is stored in the property secure_url
        setImage(response.data.secure_url);
        setWaitingForImageUrl(false);
      })
      .catch((error) => {
        console.error("Error uploading the file:", error);
        setWaitingForImageUrl(false);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const {
      name,
      place,
      age,
      hobbies,
      linkedIn,
      question1,
      question2,
      customQuestion,
    } = event.target.elements;

    const newProfile = {
      name: name.value,
      place: place.value,
      age: age.value,
      hobbies: hobbies.value,
      linkedIn: linkedIn.value,
      question1: question1.value,
      question2: question2.value,
      customQuestion: customQuestion.value,
      profileImage: image,
    };

    axios
      .post(`${API_URL}/teams/${teamId}/members.json`, newProfile, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("success");
        navigate(-1);
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };

  return (
    <div className="flex flex-col justify-center items-center text-center p-6">
      {/* Back Button */}

      <div className="mr-auto">
        <BackButton text="Back to Team" to={`/teams/${teamId}`} />
      </div>
      <div>
        <form
          className="form bg-gradient-to-r from-pink-100 to-blue-100"
          onSubmit={handleSubmit}
        >
          <div className="new-profile-title">
            <h2>
              <span>Create your profile 😎</span>
            </h2>
          </div>
          <div className="flex justify-evenly flex-wrap gap-35">
            <div className="flex flex-col gap-15 w-2xs">
              <div className="flex flex-col">
                <label className="text-center">Hey, what’s your name?</label>
                <input className="input" name="name" type="text" required />
              </div>

              <div className="flex flex-col">
                <label className="text-center">Where are you from?</label>
                <input className="input" name="place" type="text" required />
              </div>

              <div className="flex flex-col">
                <label className="text-center">
                  How many years young are you?
                </label>
                <input
                  className="input"
                  name="age"
                  type="number"
                  min="0"
                  required
                />
              </div>

              <div className="flex flex-col">
                <label className="text-center">Got any fun hobbies?</label>
                <input className="input" name="hobbies" type="text" required />
              </div>

              <div className="flex flex-col">
                <label className="text-center">Got a LinkedIn?</label>
                <input className="input" name="linkedIn" type="text" />
              </div>
            </div>

            {/* right side container */}
            <div className="flex flex-col gap-15 w-2xs">
              <div className="flex flex-col">
                <label className="text-center">
                  If this course had a mascot, what would it be?
                </label>
                <input className="input" name="question1" type="text" />
              </div>

              <div className="flex flex-col">
                <label className="text-center">
                  If your life had a theme song, what would it be?
                </label>
                <input className="input" name="question2" type="text" />
              </div>

              {/* Custom Question Section */}
              <div className="flex flex-col gap-15 w-2xs">
                <div className="flex flex-col">
                  <label className="text-center">
                    Create Your Own Question:
                    <input
                      className="input"
                      name="customQuestion"
                      type="text"
                    />
                  </label>
                </div>
              </div>

              <div className="flex flex-col">
                <label className="text-center">Upload your picture</label>

                <input className="input" type="file" onChange={handleImage} />
                {/* Image Preview */}
                {image && (
                  <div className="flex justify-center mt-4">
                    <img
                      src={image}
                      alt="my cloudinary image"
                      className="w-24 h-24 object-cover rounded-full border"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          <button className="button-confirm" disabled={waitingForImageUrl}>
            Let's go
          </button>
        </form>
      </div>
    </div>
  );
}
export default CreateProfilePage;
