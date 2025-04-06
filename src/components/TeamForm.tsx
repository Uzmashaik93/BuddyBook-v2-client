import { useForm, SubmitHandler } from "react-hook-form";
import { Team } from "../types";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

interface TeamFormProps {
  onSubmit: (data: Team) => void;
  teamData?: Team;
  buttonText?: string;
  formHeading?: string;
}

function TeamForm({
  onSubmit,
  teamData,
  buttonText,
  formHeading,
}: TeamFormProps) {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Team>({
    // Initialize form with default values if teamData is provided
    // This allows the form to be used for both creating and editing teams
    defaultValues: {
      teamName: "",
    },
  });

  useEffect(() => {
    if (teamData) {
      reset({
        teamName: teamData.teamName,
      });
    }
  }, [teamData, reset]);

  const handleOnSubmit: SubmitHandler<Team> = (data: Team) => {
    onSubmit(data);
  };

  return (
    <div className="fixed inset-0 bg-white flex justify-center items-center">
      <div className="form-new bg-gradient-to-r from-pink-100 to-blue-100 p-8 rounded-lg shadow-lg max-w-md w-full relative border-5 border-pink-300">
        <h1 className="text-2xl font-semibold text-center text-pink-600 mb-6">
          {formHeading}
        </h1>
        <form onSubmit={handleSubmit(handleOnSubmit)} className="space-y-6">
          <div>
            <label className="block text-ml font-medium text-gray-700 text-center">
              Team Name
            </label>
            <input
              type="text"
              placeholder="Enter team name"
              className="mt-2 p-2 w-full border-2 border-black bg-gray-100 border-gray-30 rounded-md text-center"
              {...register("teamName", { required: true })}
            />
            {errors.teamName && <span>This field is required</span>}
          </div>

          {/* Action buttons */}
          <div className="flex justify-around space-x-4">
            <button type="submit" className="button-confirm">
              {buttonText}
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

export default TeamForm;
