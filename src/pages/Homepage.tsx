import { useNavigate } from "react-router-dom";

import logo from "/BuddyBook-final.png";
import Features from "../components/Features";
import { features, steps } from "../constants";
import HowItWorks from "../components/HowItWorks";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

function Homepage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);

  const handleClick = () => {
    if (isAuthenticated) {
      navigate("/teams");
    } else {
      navigate("/signup");
    }
  };

  return (
    <div className="flex justify-center items-center ">
      <div className="bg-white/10 backdrop-blur-2xs rounded-lg p-8 min-w-screen md:w-3/5 ">
        <h1 className="text-xl md:text-4xl font-bold text-pastelPink mb-4 text-center drop-shadow-lg">
          BuddyBook
          <br />
          <p className="text-sm font-medium mt-2">
            Nostalgia meets the modern web – build your crew, share your story.
          </p>
        </h1>
        <img src={logo} className="mx-auto mb-4 w-32 drop-shadow-lg" />

        <p className="text-gray-700 mb-6 text-center drop-shadow-md">
          Create memories along with your buddies with our modern take on the
          classic slambook.
        </p>
        <div className="flex flex-col justify-center sm:flex-row gap-4">
          <button
            onClick={handleClick}
            className="bg-pink-500 hover:cursor-pointer border-1
            text-white font-bold py-3 px-6 rounded-full transition
            duration-300 text-center mb-10"
          >
            {isAuthenticated ? "Create Your Memories" : "Sign up / Log in"}
          </button>
        </div>
        <div className="flex justify-center mb-4"></div>
        <Features features={features} />
        <div className="flex justify-center mb-4"></div>
        <HowItWorks steps={steps} />
      </div>
    </div>
  );
}

export default Homepage;
