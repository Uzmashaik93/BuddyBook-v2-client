import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { House, Info, LogIn, LogOut, Menu, UsersRound, X } from "lucide-react";

import logo from "../assets/images/logo/BuddyBook-final.png";

import "../components/Navbar.css";
import { useContext, useState } from "react";
import { AuthContext } from "../context/auth.context";

function Navbar() {
  const { isAuthenticated, logout, user } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  return (
    <div className="navbar-container text-sm bg-white shadow-md py-2 top-0 w-full z-50">
      <div className="flex justify-between items-center px-7">
        {/* Logo */}
        <NavLink to="/">
          <img src={logo} alt="Logo" className="h-10 w-auto -rotate-10" />
        </NavLink>
        {isOpen && (
          <h4 className="text-gray-700 font-bold md:ml-auto">
            Welcome {user?.username}
          </h4>
        )}
        {/* Hamburger (Mobile) */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          <h4 className="text-gray-700 font-bold md:ml-auto">
            Welcome {user?.username}
          </h4>
          {currentPath !== "/" && (
            <NavLink
              to="/"
              className="flex items-center gap-2 text-gray-700 transition hover:text-pink-500 group"
            >
              <House className="group-hover:text-pink-500" size={20} />
              <span className="font-medium">Home</span>
            </NavLink>
          )}

          {isAuthenticated && currentPath !== "/teams" && (
            <NavLink
              to="/teams"
              className="flex items-center gap-1 text-gray-700 transition hover:text-pink-500 group"
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
              }}
              className="flex items-center gap-1 text-gray-700 transition hover:text-pink-500 group"
            >
              <LogOut size={18} />
              <span className="font-medium">Logout</span>
            </button>
          )}
          <NavLink
            to="/login"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-2 text-gray-700 hover:text-pink-500"
          >
            <LogIn size={18} />
            <span>LogIn</span>
          </NavLink>

          <NavLink
            to="/about"
            className="flex items-center gap-1 text-gray-700 transition hover:text-pink-500 group"
          >
            <Info size={18} />
            <span className="font-medium">About</span>
          </NavLink>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="w-full bg-white shadow-md md:hidden p-5 flex flex-col gap-4 ">
          {currentPath !== "/" && (
            <NavLink
              to="/"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 text-gray-700 hover:text-pink-500"
            >
              <House size={20} />
              <span>Home</span>
            </NavLink>
          )}

          {isAuthenticated && currentPath !== "/teams" && (
            <NavLink
              to="/teams"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 text-gray-700 hover:text-pink-500"
            >
              <UsersRound size={18} />
              <span>My Teams</span>
            </NavLink>
          )}

          {isAuthenticated && (
            <button
              onClick={() => {
                logout();
                navigate("/");
                setIsOpen(false);
              }}
              className="flex items-center gap-2 text-gray-700 hover:text-pink-500"
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          )}

          <NavLink
            to="/login"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-2 text-gray-700 hover:text-pink-500"
          >
            <Info size={18} />
            <span>LogIn</span>
          </NavLink>
          <NavLink
            to="/about"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-2 text-gray-700 hover:text-pink-500"
          >
            <Info size={18} />
            <span>About</span>
          </NavLink>
        </div>
      )}
    </div>
  );
}
export default Navbar;
