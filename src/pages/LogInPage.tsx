import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { User } from "../types";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
const env = import.meta.env.VITE_BASE_API_URL;

function LogInPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>({});

  const { login } = useContext(AuthContext);

  const navigate = useNavigate();

  // Function to handle form submission
  const handleOnSubmit = async (data: User) => {
    const userData = {
      email: data.email,
      password: data.password,
    };

    // Replace with actual API call to create a new user
    console.log("User Data:", userData);
    try {
      const response = await axios.post(`${env}/auth/login`, userData);
      console.log(response.data);
      if (response.data.authToken) {
        login(response.data.authToken);
        navigate("/teams");
      } else {
        alert("Login failed. Please check your credentials.");
        return;
      }
    } catch (error) {
      console.error("Error Logging in:", error);
      alert("Failed to create user. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 bg-white/10 backdrop-blur-xs flex justify-center items-center rounded-xl shadow-lg border border-white/20">
      <div className="form-new bg-gradient-to-r from-pink-100 to-blue-100 p-8 rounded-lg shadow-lg max-w-md w-full relative border-5 border-pink-300">
        <h1 className="text-2xl font-semibold text-center text-pink-600 mb-6">
          Log In Form
        </h1>
        <form onSubmit={handleSubmit(handleOnSubmit)} className="space-y-6">
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
              placeholder="Enter your password"
              className="mt-2 p-2 w-full border-2 border-black bg-gray-100 rounded-md focus:ring-pink-800 focus:border-pink-500 text-center"
              {...register("password", { required: true })}
            />

            {errors.password && <span>This field is required</span>}
          </div>
          {/* Action buttons */}
          <div className="flex justify-around space-x-4">
            <button
              type="submit"
              className="button-confirm hover:brightness-150"
            >
              Log In
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

export default LogInPage;
