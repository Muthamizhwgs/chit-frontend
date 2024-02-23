import Adminsidebar from "./Sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import Breadcrumbs from "../components/utils/Breadcrumbs";
import { useState } from "react";

const Homepage = () => {
    let navigate = useNavigate()
  

  const location = useLocation();
  const pathname = location.pathname;
  const paths = pathname.split('/').filter(path => path);


  const [open,setOpen] = useState(true);
  const handleToggle = () =>{
    setOpen(!open)
  }


  return (
    <div className="w-full flex bg-white">
     
        <Adminsidebar open={open} handleToggle={handleToggle}/>
        
          

      <div className={`${
          open ? "absolute  grow sm:left-[262px] left-40 right-0 h-[100vh]" : "absolute grow lg:left-[6%] left-[15%] right-0 h-auto"
        } duration-500  bg-white`}>
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
