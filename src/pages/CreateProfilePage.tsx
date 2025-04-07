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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

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
      const response = await axios.post(
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
      <ProfileForm onSubmit={onSubmit} form={form} />
    </div>
  );
}
export default CreateProfilePage;
