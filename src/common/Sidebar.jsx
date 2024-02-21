// eslint-disable-next-line no-unused-vars
import React, { Fragment } from 'react';

import { NavLink, useLocation } from 'react-router-dom'
import { RiAdminFill } from "react-icons/ri";
import { PiMoneyBold } from "react-icons/pi";

function Adminsidebar() {
    const role = localStorage.getItem("chitsRole")
    console.log("role", role);
    let location = useLocation()
    // console.log(location.pathname,"locations")

    const superAdmin = [
        {
            title:"Admin",
            path:"/homepage/admin",

        },
        {
            title:"Auction",
            path:"/homepage/auction"
        }
    ]

    const Admin =[ 
        {
            title:"chit master",
            path:"/homepage/chitmaster"
        },
        {
            title:"customers",
            path: "/homepage/customer"
        },
        {
            title:"chitMapping",
            path:"/homepage/chitmapping"
        },
        {
            title:"auction",
            path:"/homepage/auction"
        },
        {
            title:"payments",
            path:"/homepage/payments"
        },
        {
            title:"reports",
            path:"/homepage/reports"
        }
    ]
    const user = [
        {
            title:"chits",
            path:"/homepage/chits",
        },
        {
            title:"auction",
            path:"/homepage/auction"
        }
    ]
    return (
        <>
        <h1 className='text-white  pt-5 text-center flex justify-center'><PiMoneyBold  size={50}/></h1>
            {
                role==="superAdmin" && 
                <div className='  flex flex-col gap-5 pt-10'>
                        <Fragment>
                            <NavLink
                            to={'/homepage/admin'}
                            className={`w-[90%] mx-auto py-2 ${location.pathname === '/homepage/admin'?'bg-slate-200 rounded-full':''}`}
                            >
                                <div className='w-[80%] m-auto'>
                                    <h1 className={`flex gap-2  items-center text-xl text-[#176b87]`}><RiAdminFill />Admin</h1>
                                </div>
                            </NavLink>
                        </Fragment> 
                </div>
                
            }
            {
                role==="admin" && 
                <div className='flex flex-col gap-5 pt-10'>
                    {Admin.map((menu, ind)=>(
                        <Fragment key={ind}>
                            <NavLink
                            to={menu.path}
                            isActive={(match,location)=>{
                                return (
                                    match || location.pathname.startsWith(menu.path + "/chitmaster") // Assuming child routes have paths like /homepage/institutes/child
                                  );
                            }}
                            style={({ isActive }) => {
                                return isActive  
                                  ? {
                                      background: `${
                                        open
                                          ? "bg-white"
                                          : "bg-[#176b87]"
                                      }`,
                                    }
                                  : null
                              }}
              
                            >
                                <div>
                                    <h1 className='text-white'>{menu.title}</h1>
                                </div>
                            </NavLink>
                        </Fragment> 
                    ))}
                </div>
            }
            {
                role==="customer" && 
                <div className='flex flex-col gap-5 pt-10'>
                    {user.map((menu, ind)=>(
                        <Fragment key={ind}>
                            <NavLink
                            to={menu.path}
                            isActive={(match,location)=>{
                                return (
                                    match || location.pathname.startsWith(menu.path + "/chit") // Assuming child routes have paths like /homepage/institutes/child
                                  );
                            }}
                            style={({ isActive }) => {
                                return isActive  
                                  ? {
                                      background: `${
                                        open
                                          ? "bg-white"
                                          : "bg-[#176b87]"
                                      }`,
                                    }
                                  : null
                              }}
              
                            >
                                <div>
                                    <h1 className='text-white'>{menu.title}</h1>
                                </div>
                            </NavLink>
                        </Fragment> 
                    ))}
                </div>
            }
        </>










    
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
    )
}

export default Adminsidebar
