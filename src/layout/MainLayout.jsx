import { Outlet } from "react-router-dom";
import { CustomNavbar } from "./Navbar";
import { Footer } from "./Footer";

export const MainLayout = () => {
  return (
    <>
      <CustomNavbar />
      <div>
        <Outlet />
      </div>
      <Footer />
    </>
  );
};
