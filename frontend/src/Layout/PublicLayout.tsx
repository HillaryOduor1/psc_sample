// src/components/layout/PublicLayout.tsx
import { Outlet } from "react-router-dom";
import Footer from "../components/Layout/Footer";

export default function PublicLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      {/*
        Push page content below the fixed navbar (h-16 on mobile, h-20 on md+).
        Hero sections on the home page can cancel this with -mt-16 md:-mt-20.
      */}
      <div className="flex-grow pt-16 md:pt-20">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

/*
// src/components/layout/PublicLayout.tsx
import { Outlet } from 'react-router-dom';
import Footer from '../components/Layout/Footer'; 

const PublicLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default PublicLayout;*/


/*// src/components/layout/PublicLayout.tsx
import { Outlet } from 'react-router-dom';
import Footer from '../components/Layout/Footer';

const PublicLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow pt-16">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default PublicLayout;*/