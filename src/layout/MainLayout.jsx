import { Outlet } from "react-router-dom";
import { CustomNavbar } from "./Navbar";
import { Footer } from "./Footer";

export const MainLayout = () => {
  return (
    <div className="layout-wrapper">
      <CustomNavbar />

      <main className="main-content">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};
