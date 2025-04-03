import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

function NonAuthPages() {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
}

export default NonAuthPages;
