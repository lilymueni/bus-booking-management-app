import { Outlet } from "react-router-dom";
import Navbar from "./navbar"; // Adjust the import path as needed

const Layout = () => {
  return (
    <>
      <nav>
        <Navbar />
      </nav>

      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
