import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function NonAuthPages() {
  return (
    <div>
      <Navbar />
      <div className="m-20">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default NonAuthPages;
