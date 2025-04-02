import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { User } from "../types";
import axios from "axios";
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
      userName: data.userName,
      email: data.email,
      password: data.password,
    };

    // Replace with actual API call to create a new user
    console.log("User Data:", userData);
    try {
      const response = await axios.post(`${env}/auth/signup.json`, userData);
      console.log(response.data);
    } catch (error) {
      console.error("Error creating user:", error);
      alert("Failed to create user. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 bg-white flex justify-center items-center">
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
              {...register("userName", { required: true })}
            />
            {errors.userName && <span>This field is required</span>}
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
              type="text"
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
          {/* Action buttons */}
          <div className="flex justify-around space-x-4">
            <button
              type="submit"
              className="button-confirm hover:brightness-150"
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
