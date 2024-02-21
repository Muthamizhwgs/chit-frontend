import Adminsidebar from "./Sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import { IoMdLogOut } from "react-icons/io";
import { useLocation } from 'react-router-dom';
import Breadcrumbs from "../components/utils/Breadcrumbs";

const Homepage = () => {
    let navigate = useNavigate()
  const Logout = async () => {
    localStorage.removeItem("chits");
    localStorage.removeItem("chitsRole");
    // navigate('/')
  };

  const location = useLocation();
  const pathname = location.pathname;
  const paths = pathname.split('/').filter(path => path);


  return (
    <div className="w-full ">
      <div className="w-[15%] h-[100vh] bg-[#176b87] float-left relative">
        <Adminsidebar />
        <div className="absolute bottom-5 w-[90%] flex px-10">
          <h1 className="flex items-center text-slate-200 cursor-pointer gap-1" onClick={Logout}>
            <IoMdLogOut /> Logout
          </h1>
        </div>
      </div>
      <div className="w-[85%] h-[100vh] bg-slate-200 float-right">
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
