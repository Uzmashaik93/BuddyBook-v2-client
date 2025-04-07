import { UseFormReturn } from "react-hook-form";
import { Member } from "../types";

interface ProfileFormProps {
  onSubmit: (data: Member) => void;
  form: UseFormReturn<Member>;
  onCancel?: () => void;
  showCancel?: boolean;
}
function ProfileForm({
  onSubmit,
  form,
  showCancel,
  onCancel,
}: ProfileFormProps) {
  const { register, handleSubmit } = form;

  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (onCancel) {
      onCancel();
    }
  };

  return (
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
          {showCancel && "Save"}
          {!showCancel && "Let's go!"}
        </button>
        {showCancel && (
          <button
            className="button-go-back"
            type="button"
            onClick={handleCancel}
          >
            Cancel
          </button>
        )}
      </form>
    </div>
  );
}

export default ProfileForm;
