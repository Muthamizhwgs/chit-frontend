// eslint-disable-next-line no-unused-vars
import React, { Fragment } from "react";

import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { RiAdminFill } from "react-icons/ri";
import { PiMoneyBold } from "react-icons/pi";
import { icons } from "antd/es/image/PreviewGroup";
import { HiViewGridAdd, HiUserAdd } from "react-icons/hi";
import { RiAuctionFill } from "react-icons/ri";
import { TbReportAnalytics } from "react-icons/tb";
import { BsFillPersonLinesFill } from "react-icons/bs";
import { IoMdCash } from "react-icons/io";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { IoMdLogOut } from "react-icons/io";
import { FaBars } from "react-icons/fa";
import { BsBuildingFillAdd } from "react-icons/bs";

// eslint-disable-next-line react/display-name
const Adminsidebar = React.memo(({ handleToggle, open }) => {
  const role = localStorage.getItem("chitsRole");
  console.log("role", role);
  let location = useLocation();
  let navigate = useNavigate();
  // console.log(location.pathname,"locations")

  const Logout = async () => {
    localStorage.removeItem("chits");
    localStorage.removeItem("chitsRole");
    navigate("/");
  };

  // eslint-disable-next-line no-unused-vars
  const superAdmin = [
    {
      title: "Admin",
      path: "/homepage/admin",
    },
    {
      title: "Auction",
      path: "/homepage/chitauction",
    },
  ];

  const Admin = [
    {
      title: "Company",
      path: "/homepage/company",
      icons: <BsBuildingFillAdd />,
    },
    {
      title: "Chit Master",
      path: "/homepage/chitmaster",
      icons: <HiViewGridAdd />,
    },
    {
      title: "Customers",
      path: "/homepage/customer",
      icons: <HiUserAdd />,
    },
    {
      title: "Chit Mapping",
      path: "/homepage/chitmapping",
      icons: <BsFillPersonLinesFill />,
    },
    {
      title: "Auction",
      path: "/homepage/manageauction",
      icons: <RiAuctionFill />,
    },
    {
      title: "Payments",
      path: "/homepage/payments",
      icons: <IoMdCash />,
    },
    {
      title: "Reports",
      path: "/homepage/reports",
      icons: <TbReportAnalytics />,
    },
  ];

  const user = [
    {
      title: "chits",
      path: "/homepage/chits",
      icons: <PiMoneyBold />,
    },
    {
      title: "auction",
      path: "/homepage/auction",
      icons: <RiAuctionFill />,
    },
  ];

  return (
    <div
      className={` ${
        open ? "w-40 sm:w-[260px]" : "lg:w-[6%] w-[15%]"
      } bg-primary duration-500 h-screen overflow-x-hidden bg-[#176b87] flex flex-col justify-between py-5 relative capitalize`}
    >
      <div>
        <div className="py-5">
          {open ? (
            <div className="flex justify-between items-center">
              <div></div>
              <h1 className="text-white flex justify-center">
                <PiMoneyBold size={50} />
              </h1>
              <MdKeyboardArrowLeft
                className={`cursor-pointer w-7 h-7  mr-2 hover:bg-white bg-[#176b87] rounded-full transition duration-300 text-white hover:text-[#176b87]`}
                onClick={handleToggle}
              />
            </div>
          ) : (
            <div>
              <div className="w-full flex justify-center items-center h-full ">
                <FaBars
                  className={` cursor-pointer w-7 h-7  text-white
                        `}
                  onClick={handleToggle}
                />
              </div>
            </div>
          )}
        </div>
        <div className="py-5">
          {role === "superAdmin" && (
            <div className="">
              <div className="flex flex-col gap-5">
                <Fragment>
                  <NavLink to={"/homepage/admin"}>
                    <div
                      className={`flex items-center  ${
                        location.pathname === "/homepage/admin"
                          ? "bg-slate-200 rounded-full"
                          : ""
                      }  ${
                        open ? "py-2 mx-4" : "py-1 px-4 mx-2 justify-center"
                      } `}
                    >
                      <div className={`${open ? "ml-4" : ""}`}>
                        {open ? (
                          <h1
                            className={`flex gap-2  items-center sm:text-lg text-sm text-[#176b87]`}
                          >
                            <RiAdminFill />
                            Admin
                          </h1>
                        ) : (
                          <h1
                            className={`flex gap-2  items-center sm:text-lg text-sm w-10 h-10 text-[#176b87] justify-center`}
                          >
                            <RiAdminFill />
                          </h1>
                        )}
                      </div>
                    </div>
                  </NavLink>
                </Fragment>
              </div>
            </div>
          )}
          {role === "admin" && (
            <div>
              <div className="flex flex-col gap-5">
                {Admin.map((menu, ind) => (
                  <Fragment key={ind}>
                    <NavLink to={menu.path}>
                      <div
                        className={` relative  hover:rounded-full hover:text-[#176b87] flex   items-center ${
                          location.pathname.includes(menu.path)
                            ? "bg-slate-200 rounded-full text-[#176b87]"
                            : "text-white sidebar rounded-full  "
                        } ${
                          open ? "py-2 mx-4" : "py-1 px-4 mx-2 justify-center"
                        }`}
                      >
                        <div className={`${open ? "ml-4" : ""}`}>
                          {open ? (
                            <h1 className="flex gap-2    items-center sm:text-lg text-sm">
                              {menu.icons}
                              {menu.title}
                            </h1>
                          ) : (
                            <h1 className="flex gap-2  items-center sm:text-lg text-sm w-10 h-10 justify-center">
                              {menu.icons}
                            </h1>
                          )}
                        </div>
                      </div>
                    </NavLink>
                  </Fragment>
                ))}
              </div>
            </div>
          )}
          {role === "customer" && (
            <div className="flex flex-col gap-5">
              {user.map((menu, ind) => (
                <Fragment key={ind}>
                  <NavLink to={menu.path}>
                    <div
                      className={`relative hover:rounded-full hover:text-[#176b87]  flex  items-center ${
                        location.pathname.includes(menu.path)
                          ? "bg-slate-200 rounded-full text-[#176b87]"
                          : "text-white sidebar "
                      } ${
                        open ? "py-2 mx-4" : "py-1 px-4 mx-2 justify-center"
                      }`}
                    >
                      <div className={`${open ? "ml-4" : ""}`}>
                        {open ? (
                          <h1 className="flex gap-2  items-center sm:text-lg text-sm">
                            {menu.icons}
                            {menu.title}
                          </h1>
                        ) : (
                          <h1 className="flex gap-2  items-center sm:text-lg text-sm w-10 h-10 justify-center">
                            {menu.icons}
                          </h1>
                        )}
                      </div>
                    </div>
                  </NavLink>
                </Fragment>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="mx-auto">
        {open ? (
          <h1
            className=" text-slate-200 w-fit cursor-pointer hover:scale-105 transition-all duration-200 flex items-center justify-center "
            onClick={Logout}
          >
            <IoMdLogOut /> Logout
          </h1>
        ) : (
          <h1
            className=" text-slate-200 w-fit cursor-pointer hover:scale-110 transition-all duration-200 flex items-center justify-center "
            onClick={Logout}
          >
            <IoMdLogOut />
          </h1>
        )}
      </div>
    </div>

    // <div className='w-full h-full bg-white'>
    //     <div className='flex justify-center'>
    //         <h1 className='text-3xl text-black'>Chit</h1>
    //     </div>
    //     <div className='mt-4'>
    //         <ul className='flex flex-col ml-14 text-white'>
    //             <Link to={'/chitmaster'}><li className={`${location.pathname == '/chitmaster' ? 'bg-slate-200 py-3 text-[#176B87] rounded-s-md pl-2 ' : 'py-3 pl-2 text-black'}`}>Chit Master</li></Link>
    //             <Link to={'/customers'}><li className={`${location.pathname == '/customers' ? 'bg-slate-200 py-3 text-[#176B87] rounded-s-md pl-2' : 'py-3 pl-2 text-black'}`}>Customers </li></Link>
    //             <Link to={'/chitmapping'}><li className={`${location.pathname == '/chitmapping' || location.pathname == '/chitmapdetails' ? 'bg-slate-200 py-3 text-[#176B87] rounded-s-md pl-2' : 'py-3 pl-2 text-black'}`}>Chit Mapping</li></Link>
    //             <Link to={'/auction'}><li className={`${location.pathname == '/auction' ? 'bg-slate-200 py-3 text-[#176B87] rounded-s-md pl-2' : 'py-3 pl-2 text-black'}`}>Auction</li></Link>
    //             <Link to={'/payments'}><li className={`${location.pathname == '/payments' ? 'bg-slate-200 py-3 text-[#176B87] rounded-s-md pl-2' : 'py-3 pl-2 text-black'}`}>Payments</li></Link >
    //             <Link to={'/reports'}><li className={`${location.pathname == '/reports' ? 'bg-slate-200 py-3 text-[#176B87] rounded-s-md pl-2' : 'py-3 pl-2 text-black'}`}> Report</li></Link >
    //         </ul>
    //     </div>

    // </div>
  );
});

export default Adminsidebar;
