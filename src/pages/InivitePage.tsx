import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { TeamInvite } from "../types";
import toast from "react-hot-toast";
const env = import.meta.env.VITE_BASE_API_URL;

function InivitePage() {
  const { teamId } = useParams();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TeamInvite>();

  const onSubmit = async (data: TeamInvite) => {
    try {
      const response = await axios.post(
        `${env}/teams/invite/${teamId}`,
        {
          ...data,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("auth")}`,
          },
        }
      );
      toast.success("Invite sent successfully!");
      navigate("/teams");
    } catch (error) {
      console.error("Error", error);
      toast.error("User is already invited to the team");
    }
  };

  return (
    <div className="fixed inset-0 bg-white flex justify-center items-center">
      <div className="form-new bg-gradient-to-r from-pink-100 to-blue-100 p-8 rounded-lg shadow-lg max-w-md w-full relative border-5 border-pink-300">
        <h1 className="text-2xl font-semibold text-center text-pink-600 mb-6">
          Invite a new member
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <input
              type="text"
              placeholder="Enter email address"
              className="mt-2 p-2 w-full border-2 border-black bg-gray-100 border-gray-30 rounded-md text-center"
              {...register("invitedUserEmail", { required: true })}
            />
            {errors.invitedUserEmail && <span>This field is required</span>}
          </div>

          {/* Action buttons */}
          <div className="flex justify-around space-x-4">
            <button type="submit" className="button-confirm">
              Invite
            </button>
            <button
              onClick={() => navigate("/teams")}
              className="button-go-back"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default InivitePage;
