import Adminsidebar from "./Sidebar";
import { Outlet, useLocation } from "react-router-dom";
import Breadcrumbs from "../components/utils/Breadcrumbs";
import { useState } from "react";

const Homepage = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const paths = pathname.split('/').filter(path => path);

  const [open, setOpen] = useState(true);

  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <div className="w-full flex bg-white">
      <Adminsidebar open={open} handleToggle={handleToggle} />
      <div className={`${
        open ? "fixed inset-0 sm:left-[262px] left-40 right-0 h-full" : "fixed inset-0 left-[15%] lg:left-[6%] right-0 h-auto"
      } duration-500 bg-white overflow-y-auto overscroll-contain`}>
        <Breadcrumbs
          paths={paths.map((path, index) => ({
            name: path,
            url: `/${paths.slice(0, index + 1).join('/')}`,
          }))}
        />
        <Outlet />
      </div>
    </div>
  );
};

export default Homepage;
