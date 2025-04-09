/* eslint-disable @typescript-eslint/no-unused-vars */
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { User } from "../types";
import axios from "axios";
import toast from "react-hot-toast";
const env = import.meta.env.VITE_BASE_API_URL;

function SignUpPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>({});

  const navigate = useNavigate();

  // Function to handle form submission
  const handleOnSubmit = async (data: User) => {
    const userData = {
      username: data.username,
      email: data.email,
      password: data.password,
    };

    // Replace with actual API call to create a new user
    try {
      await axios.post(`${env}/auth/signup`, userData);
      toast.success("User sign up success!");
      navigate("/teams");
    } catch (error) {
      toast.error("User sign up fail!");
    }
  };

  return (
    <div className="fixed inset-0 bg-white/10 backdrop-blur-xs flex justify-center items-center rounded-xl shadow-lg border border-white/20">
      <div className="form-new bg-gradient-to-r from-pink-100 to-blue-100 p-8 rounded-lg shadow-lg max-w-md w-full relative border-5 border-pink-300">
        <h1 className="text-2xl font-semibold text-center text-pink-600 mb-6">
          Sign Up Form
        </h1>
        <form onSubmit={handleSubmit(handleOnSubmit)} className="space-y-6">
          <div>
            <input
              type="text"
              placeholder="Enter your name"
              className="mt-2 p-2 w-full border-2 border-black bg-gray-100 border-gray-30 rounded-md text-center"
              {...register("username", { required: true })}
            />
            {errors.username && <span>This field is required</span>}
          </div>
          <div>
            <input
              type="text"
              placeholder="Enter your email"
              className="mt-2 p-2 w-full border-2 border-black bg-gray-100 rounded-md focus:ring-pink-800 focus:border-pink-500 text-center"
              {...register("email", { required: true })}
            />
            {errors.email && <span>This field is required</span>}
          </div>
          <div>
            <input
              type="password"
              placeholder="Create a password"
              className="mt-2 p-2 w-full border-2 border-black bg-gray-100 rounded-md focus:ring-pink-800 focus:border-pink-500 text-center"
              {...register("password", { required: true })}
            />
            <small className="text-gray-500 text-xs mt-1">
              Password must contain at least 8 characters, including uppercase,
              lowercase letters, numbers, and special characters.
            </small>
            {errors.password && <span>This field is required</span>}
          </div>

          <div className="text-sm text-gray-500 mb-0">
            Already have an account?
            <Link
              to="/login"
              target="blank"
              className="text-gray-800 font-medium ml-3 hover:cursor-pointer"
            >
              Click here
            </Link>
          </div>
          {/* Action buttons */}
          <div className="flex justify-evenly space-x-4">
            <button
              type="submit"
              className="hover:brightness-150 button-confirm"
            >
              Sign Up
            </button>
            <button
              onClick={() => navigate("/")}
              className="button-go-back hover:brightness-150"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUpPage;
