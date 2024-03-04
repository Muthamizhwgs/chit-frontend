import React, { useEffect } from "react";
import DataTable from "react-data-table-component";
import { Link, useNavigate } from "react-router-dom";
import { Select } from 'antd';
import { getChitReports, MonthlyAuction } from "../../services/customer.service";
import { getAuctionDetails } from "../../services/service"
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

  const getAuctions = async () => {
    setLoader(true)
    try {
      let values = await getAuctionDetails()
      setAuctionChit(values.data)
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
    getAuctions()
  }, []);

  const columns = [
    {
      name: <h1 className="text-lg text-gray-500">S.No</h1>,
      selector: (row, ind) => ind + 1,
    },
    {
      name: <h1 className="text-lg text-gray-500">Customer Name</h1>,
      selector: (row) => row.customerName,

    },
    {
      name: <h1 className="text-lg text-gray-500">Auction Amount</h1>,
      selector: (row) => <CurrencyComponent amount={row.auctionAmount} />,
    },
    {
      name: <h1 className="text-lg text-gray-500">Status</h1>,
      selector: (row) => row.status,
    }
  ];

  const handleChange = () => {

  }


  return (
    <>
      {loader ? <Loader /> : null}
      <div>
        <h1 className="text-xl font-bold text-center">Auction</h1>
      </div>
      <div className="flex xl:flex-row flex-col w-[95%] m-auto gap-10 mt-4 items-center mb-4">
        <div className={`flex xs:flex-row flex-col justify-center items-center gap-2 `}>
          <p>Select Company</p>
          <Select
            className='ml-2 sm:w-80 w-full'
            defaultValue='Select Company'
            onChange={handleChange}
          >
            {
              
            }
          </Select>
        </div>
        <div className={`flex xs:flex-row flex-col justify-center items-center gap-2 `}>
          <p>Select Group</p>
          <Select
            className='ml-2 sm:w-80 w-full'
            defaultValue='Select Group'
            onChange={handleChange}
          >
            {

            }
          </Select>
        </div>
        <div className='py-5'>
          <button className='bg-[#176B87] flex justify-center items-center text-white w-32 gap-1 rounded-md h-8' > Get </button>
        </div>
      </div>
      <div>
        <DataTable columns={columns} />
      </div>
    </>
  );
};

export default Actions;
