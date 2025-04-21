import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

function AuthPages() {
  const { isAuthenticated } = useContext(AuthContext);

  if (!isAuthenticated) {
    return <Navigate to={"/"} />;
  }

  return (
    <div>
      <Navbar />
      <div className="m-7">
        <Outlet />
      </div>
    </div>
  );
}

export default AuthPages;
