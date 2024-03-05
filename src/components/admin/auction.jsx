import React, { useEffect } from "react";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import { Select } from 'antd';
import { getChitReports, MonthlyAuction } from "../../services/customer.service";
import { getAuctionDetails } from "../../services/service"
import CurrencyComponent from "../utils/currency";
import { useFormik } from "formik";
import { AuctionInitValues, AuctionSchema } from "../../validations/auction";
import Loader from "../utils/loader";
import { PiFlagPennantFill } from "react-icons/pi"

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

  const companyName = ["Royalchit&co", "TNchit&co", "Goldchit&co"]
  const Group = ["A", "B", "C"]

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
      selector: (row) => {
        return (
          <div>
            {row.status == "Hold" ? <div className="flex justify-center items-center">{row.status}<PiFlagPennantFill className="text-red-500 size-5" /></div> : null}
            {row.status == "Completed" ? <div>{row.status}</div> : null}
          </div>
        )
      }
    }
  ];
  const customStyles = {
    rows: {
      style: {
        minHeight: "48px", // override the row height
        minWidth: "800px",
      },
    },
    headCells: {
      style: {
        paddingLeft: "8px", // override the cell padding for head cells
        paddingRight: "8px",
        backgroundColor: "#F3F4F6",
        color: "#6c737f",
        fontWeight: "bold",
      },
    },
    cells: {
      style: {
        paddingLeft: "8px",
        paddingRight: "8px",
        fontSize: "16px",
        color: "#364353",
      },
    },

  };

  const conditionalRowStyles = [
    {
      when: row => row.status === 'Completed',
      style: {
        backgroundColor: '#DCF2F9',
      },
    },
  ]

  const auctionData = [
    {
      customerName: 'taj',
      auctionAmount: "20000",
      status: 'Hold'
    }
    ,
    {
      customerName: 'wasim',
      auctionAmount: "10000",
      status: 'Completed'
    },
    {
      customerName: 'Ms',
      auctionAmount: '30000',
      status: 'Hold'
    },
    {
      customerName: 'suhail',
      auctionAmount: '30000',
      status: 'Completed'
    }
  ]

  const handleChange = () => {

  }


  return (
    <>
      {loader ? <Loader /> : null}
      <div>
        <h1 className="text-xl font-bold text-center py-5">Auction</h1>
      </div>
      <div className="flex xl:flex-row flex-col w-[95%] xl:gap-10 gap-5 py-4 px-4 items-center">
        <div className={`flex sm:flex-row flex-col justify-center items-center gap-2 `}>

          <Select
            className='ml-2 xs:w-64 xl:w-80 w-full'
            placeholder='Select Company'
            onChange={handleChange}
          >
            {
              companyName.map((item, ind) => (
                <Option value={ind} >{item}</Option>
              ))
            }
          </Select>
        </div>
        <div className={`flex sm:flex-row  flex-col justify-around items-center gap-2 sm:gap-8 xl:gap-2 `}>

          <Select
            className='ml-2 xs:w-64 xl:w-80 w-full'
            placeholder='Select Group'
            onChange={handleChange}
          >
            {
              Group.map((item, ind) => (
                <Option value={ind}>{item}</Option>
              ))
            }
          </Select>
        </div>
        <div className='py-5'>
          {/* <button className='bg-[#176B87] flex justify-center items-center text-white w-32 gap-1 rounded-md h-8' > Get </button> */}
          <button
            className="cursor-pointer transition-all bg-[#176B87] text-white w-28 h-[35px] rounded-lg border-[#15414e] border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]" onClick={forms.handleSubmit}
          >
            Get
          </button>
        </div>
      </div>
      <div className="px-5">
        <DataTable columns={columns} data={auctionData} customStyles={customStyles} conditionalRowStyles={conditionalRowStyles} />
      </div>
    </>
  );
};

export default Actions;
