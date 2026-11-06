import { Outlet } from "react-router-dom";
import Footer from "../components/Layout/Footer";

export default function PublicLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* 
        The Outlet renders the page content (like the Hero section).
        We removed the pt-16/pt-20 here because the Hero section handles its own spacing, 
        and the Navbar is fixed/sticky.
      */}
      <main id="main-content" className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}