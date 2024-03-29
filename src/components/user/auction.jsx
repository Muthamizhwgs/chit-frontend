import React, { useEffect } from "react";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import { getChitReports, MonthlyAuction } from "../../services/customer.service";
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
  const [chitId, setChitId] = React.useState('')

  const showModal = () => {
    setIsModalOpen(true);
  };
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

  const submitForms = async (data) => {
    const currentDate = new Date();
    const currentMonthIndex = currentDate.getMonth();
    const monthNames = [
      "January", "February", "March", "April",
      "May", "June", "July", "August",
      "September", "October", "November", "December"
    ];
    const currentMonth = monthNames[currentMonthIndex];
    let SendToAPi = { month: currentMonth, chitId: chitId, Amount: data.chitAmount }
    setLoader(true)
    try {
      let res = await MonthlyAuction(SendToAPi)
      console.log(res.data);
      handleCancel()
    } catch (error) {
      if (error.response.status == 401) {
        navigate("/");
      }
    } finally {
      setLoader(false)
    }
  }



  useEffect(() => {
    getMyChitss();
  }, []);

  return (
    <>
      {loader ? <Loader /> : null}
      <div className="flex xs:flex-row flex-col gap-5 xs:pl-7 xs:justify-normal justify-center items-center">
        <div className="flex items-center text-lg text-red-600 gap-1">
          <MdCancel />
          <h1>Bid Closed </h1>
        </div>
        <div className="flex items-center text-lg text-green-600 gap-1">
          <RiAuctionLine />
          <h1>Bid Opened</h1>
        </div>
      </div>
      <div className="w-[95%] m-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pt-10">
        {
          // eslint-disable-next-line no-unused-vars
          mychit &&
          mychit.map((data, ind) => (
            // eslint-disable-next-line react/jsx-no-comment-textnodes, react/jsx-key

            // eslint-disable-next-line react/jsx-key
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
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  <CurrencyComponent amount={data.chitAmount} />
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Monthly Bid {"Closed"}
                </span>
                <div className="flex mt-4 md:mt-6 w-[90%]">
                  {/* <button
                      onClick={()=>{showModal(), setChitId(data.chitId)}}
                      className=" items-center px-4 py-2 text-sm font-medium  text-white rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-300 bg-[#176B87]  text-center w-full flex justify-center"
                    >
                      Bid
                    </button> */}
                  <button
                    onClick={() => { showModal(), setChitId(data.chitId) }}
                    className="cursor-pointer transition-all bg-[#176B87] text-white w-full px-4 py-2 rounded-lg border-[#15414e] border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]"
                  >
                    Bid
                  </button>
                </div>
              </div>
            </div>

          ))
        }
      </div>
      <div>
        <Modal
          title="Place bid for this month"
          height={"360px"}
          open={isModalOpen}
          onCancel={handleCancel}
          footer={null}
        >
          <div className="flex flex-col justify-center">
            <div className="flex flex-col mb-4">
              <label className="pl-4 text"> Bidding Amount :</label>
              <input
                type="text"
                placeholder="Enter Bid Amount"
                className="h-10 pl-3 border drop-shadow-lg w-[93%] hover:focus-within:outline-none rounded-md ml-3"
                name="chitAmount"
                id="chitAmount"
                onBlur={forms.handleBlur}
                value={forms.values.chitAmount}
                onChange={forms.handleChange}
              />
              {forms.errors.chitAmount && forms.touched.chitAmount ? (
                <div
                  style={{ width: "100%", color: "red", paddingLeft: "15px" }}
                >
                  {forms.errors.chitAmount}
                </div>
              ) : null}
            </div>

            <div className="flex justify-center">
              {/* <button
                type="button"
                className="bg-[#176B87] w-36 h-[35px] text-white font-bold rounded-md"
                onClick={forms.handleSubmit}
              >
                Submit
              </button> */}
              <button
                onClick={forms.handleSubmit}
                className="cursor-pointer transition-all bg-[#176B87] text-white w-36 h-[35px] rounded-lg border-[#15414e] border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]"
              >
                Submit
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default Actions;
