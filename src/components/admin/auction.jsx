import React, { useEffect } from "react";
import DataTable from "react-data-table-component";
import { Link, useNavigate } from "react-router-dom";
import { getChitReports, MonthlyAuction } from "../../services/customer.service";
import {getAuctionDetails} from "../../services/service"
import CurrencyComponent from "../utils/currency";
import { Modal } from "antd";
import { useFormik } from "formik";
import { AuctionInitValues, AuctionSchema } from "../../validations/auction";
import Loader from "../utils/loader";
import { RiAuctionLine } from "react-icons/ri";
import { MdCancel } from "react-icons/md";

const Actions = () => {
  const [mychit, setMychit] = React.useState([]);
  const [loader, setLoader] = React.useState(false);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [chitId, setChitId] = React.useState('');
  const [auctionChit, setAuctionChit] = React.useState([])
  const navigate = useNavigate()
  // const showModal = () => {
  //   setIsModalOpen(true);
  // };
  const forms = useFormik({
    initialValues: AuctionInitValues,
    validationSchema: AuctionSchema,
    onSubmit: (values) => {
        submitForms(values)
    },
  });
  const handleCancel = () => {
    setIsModalOpen(false);
    forms.resetForm();
  };

  const getMyChitss = async () => {
    setLoader(true);
    try {
      let val = await getChitReports();
      setMychit(val.data);
    } catch (error) {
      if (error.response.status == 401) {
        navigate("/");
      }
    } finally {
      setLoader(false);
    }
  };

  const submitForms = async (data)=>{
    const currentDate = new Date();
    const currentMonthIndex = currentDate.getMonth();
    const monthNames = [
      "January", "February", "March", "April",
      "May", "June", "July", "August",
      "September", "October", "November", "December"
    ];
    const currentMonth = monthNames[currentMonthIndex];
    let SendToAPi = { month: currentMonth, chitId:chitId,Amount:data.chitAmount}
    setLoader(true)
    try {
      let res = await MonthlyAuction(SendToAPi)
      console.log(res.data);
      handleCancel()
    } catch (error) {
      if (error.response.status == 401) {
        navigate("/");
      }
    }finally{
      setLoader(false)
    }
  }

  const getAuctions = async ()=>{
    setLoader(true)
    try {
      let values = await getAuctionDetails()
      setAuctionChit(values.data)
    } catch (error) {
      if (error.response.status == 401) {
        navigate("/");
      }
    }finally{
      setLoader(false)
    }
  }


  useEffect(() => {
    getMyChitss();
    getAuctions()
  }, []);



  return (
    <>
    {loader?<Loader/>:null}
    
      <div className="w-[95%] m-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pt-10">
        {
          // eslint-disable-next-line no-unused-vars
          auctionChit &&
          auctionChit.map((data, ind) => (
              // eslint-disable-next-line react/jsx-no-comment-textnodes, react/jsx-key

              <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow bg:[#EEF5FF]">
                <div className="flex justify-end px-4 pt-4">
                  <button
                    id="dropdownButton"
                    data-dropdown-toggle="dropdown"
                    className="inline-block text-gray-500 dark:text-gray-400 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-300 rounded-lg text-sm p-1.5"
                    type="button"
                  >
                    <span className="sr-only">Open dropdown</span>
                    <svg
                      className="w-5 h-5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 16 3"
                    >
                      <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                    </svg>
                  </button>
                </div>
                <div className="flex flex-col items-center pb-10">
                  <h5 className="mb-1 text-xl font-medium text-gray-900 ">
                    {data.chitName}
                  </h5>
                  <h5 className="mb-1  font-medium text-black"> {data.auctions?data.auctions:0} - Bids received this {data.currentMonth}  </h5>

                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    <CurrencyComponent amount={data.chitAmount} />
                  </span>
                  <span className={`${data.currentMonthAuction?'text-sm  text-red-500':'text-sm  text-[#176B87]'}`}>
                    Monthly Bid {data.currentMonthAuction?"Closed":"Opened"}
                  </span>
                  <div className="flex mt-4 md:mt-6 w-[90%] justify-center gap-5">
                    <Link to={'/homepage/manageauction/auctiondetails?id='+data._id}>
                    <button
                      className="text-white bg-[#176B87] px-9 py-1 rounded-md text-xs sm:text-base"
                    >
                      View Details
                    </button>
                    </Link>
                    {/* <button className="text-white bg-red-600  px-5 py-2 rounded-md text-xs sm:text-base">Close Bid</button> */}
                    

                  </div>
                </div>
              </div>
            ))
        }
      </div>
      <div>
      </div>
    </>
  );
};

export default Actions;
