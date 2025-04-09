import { useNavigate } from "react-router-dom";

import logo from "../assets/images/logo/BuddyBook-final.png";
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
    <div className="m-10 p-8 flex justify-center items-center ">
      <div className="bg-white/10 backdrop-blur-2xs rounded-lg p-8 min-w-screen md:w-3/5 ">
        <h1 className="text-xl md:text-4xl font-bold text-pastelPink mb-4 text-center drop-shadow-lg">
          Connect With Friends Through the Digital Slambook Experience
        </h1>
        <img src={logo} className="mx-auto mb-4 w-32 drop-shadow-lg" />

        <p className="text-gray-700 mb-6 text-center drop-shadow-md">
          Create memories, ask fun questions, and learn surprising things about
          your buddies with our modern take on the classic slambook.
        </p>
        <div className="flex flex-col justify-center sm:flex-row gap-4">
          <button
            onClick={handleClick}
            className="bg-white-400 hover:text-pink-600 border-1 border-pink-500
            text-pink-400 font-bold py-3 px-6 rounded-full transition
            duration-300 text-center"
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
