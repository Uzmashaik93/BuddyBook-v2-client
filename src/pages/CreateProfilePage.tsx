import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
const env = import.meta.env.VITE_BASE_API_URL;

import BackButton from "../components/BackButton";

import "../pages/CreateProfilePage.css";
import { useForm } from "react-hook-form";
import { Member } from "../types";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

function CreateProfilePage() {
  const { teamId } = useParams();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Member>();
  const { getToken } = useContext(AuthContext);

  // const [image, setImage] = useState(null);
  // const [waitingForImageUrl, setWaitingForImageUrl] = useState(false);

  // const handleImage = (event) => {
  //   setWaitingForImageUrl(true);

  //   const url = `https://api.cloudinary.com/v1_1/${
  //     import.meta.env.VITE_CLOUD_NAME
  //   }/upload`;
  //   const dataToUpload = new FormData();
  //   dataToUpload.append("file", event.target.files[0]);
  //   // VITE_UNSIGNED_UPLOAD_PRESET => name of the unsigned upload preset created in your Cloudinary account
  //   dataToUpload.append(
  //     "upload_preset",
  //     import.meta.env.VITE_UNSIGNED_UPLOAD_PRESET
  //   );
  //   axios
  //     .post(url, dataToUpload)
  //     .then((response) => {
  //       // the image url is stored in the property secure_url
  //       setImage(response.data.secure_url);
  //       setWaitingForImageUrl(false);
  //     })
  //     .catch((error) => {
  //       console.error("Error uploading the file:", error);
  //       setWaitingForImageUrl(false);
  //     });
  // };

  const onSubmit = async (data: Member) => {
    try {
      const newProfile = {
        name: data.name,
        place: data.place,
        age: data.age,
        hobbies: data.hobbies,
        linkedIn: data.linkedIn,
        question1: data.question1,
        question2: data.question2,
        customQuestion: data.customQuestion,
      };
      const response = await axios.post(`${env}/members`, newProfile, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      console.log("Success", response);
      navigate(`/teams/${teamId}`);
    } catch (error) {
      console.log("Error", error);
    }
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
          onSubmit={handleSubmit(onSubmit)}
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

              {/* Custom Question Section */}
              <div className="flex flex-col gap-15 w-2xs">
                <div className="flex flex-col">
                  <label className="text-center">
                    Create Your Own Question:
                    <input
                      className="input w-70"
                      type="text"
                      {...register("customQuestion", { required: true })}
                    />
                  </label>
                </div>
              </div>

              {/* <div className="flex flex-col">
                <label className="text-center">Upload your picture</label>

                <input className="input" type="file" onChange={handleImage} /> */}
              {/* Image Preview */}
              {/* {image && (
                  <div className="flex justify-center mt-4">
                    <img
                      src={image}
                      alt="my cloudinary image"
                      className="w-24 h-24 object-cover rounded-full border"
                    />
                  </div>
                )} */}
              {/* </div> */}
            </div>
          </div>

          <button className="button-confirm" type="submit">
            Let's go
          </button>
        </form>
      </div>
    </div>
  );
}
export default CreateProfilePage;
