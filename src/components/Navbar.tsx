import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { House, Info, LogOut, UsersRound } from "lucide-react";

import logo from "../assets/images/logo/BuddyBook-final.png";

import "../components/Navbar.css";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

function Navbar() {
  const { isAuthenticated, logout, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  return (
    <div className="navbar-container text-sm flex justify-between items-center bg-white shadow-md px-6 py-3 top-0 w-full z-50">
      {/* Logo */}
      <NavLink to="/">
        <img src={logo} alt="Logo" className="h-10 w-auto -rotate-10" />
      </NavLink>

      {/* Navigation Links */}
      <div className="flex items-center gap-6">
        <h4>Welcome {user?.username}</h4>

        {currentPath !== "/" && (
          <NavLink
            to="/"
            className="flex items-center gap-2 text-gray-700 transition-colors duration-300 hover:text-pink-500 group"
          >
            <House
              className="transition-colors duration-200 group-hover:text-pink-500"
              color="currentColor"
              size={20}
            />
            <span className="font-medium">Home</span>
          </NavLink>
        )}

        {isAuthenticated && currentPath !== "/teams" && (
          <NavLink
            to="/teams"
            className="flex items-center gap-0.5 text-gray-700 transition-colors duration-300 hover:text-pink-500 group"
          >
            <UsersRound size={18} />
            <span className="font-medium">My Teams</span>
          </NavLink>
        )}

        {isAuthenticated && (
          <button
            onClick={() => {
              logout();
              navigate("/");
              console.log("Logged out");
            }}
            className="flex text-sm items-center gap-0.5 text-gray-700 transition-colors duration-300 hover:text-pink-500 group"
          >
            <LogOut size={18} />
            <span className="font-medium">LogOut</span>
          </button>
        )}

        <NavLink
          to="/about"
          className="flex items-center text-sm gap-0.5 text-gray-700 transition-colors duration-300 hover:text-pink-500 group"
        >
          <Info size={18} />
          <span className="font-medium">About</span>
        </NavLink>
      </div>
    </div>
  );
}
export default Navbar;
