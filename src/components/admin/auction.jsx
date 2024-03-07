import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import { Select, Radio } from "antd";
import { Option } from "antd/es/mentions";

import {
  getChitReports,
  MonthlyAuction,
} from "../../services/customer.service";
import {
  getAuctionDetails,
  getAllCompany,
  getGroupByCompany,
  getcustomersbyDates,
  getgroupsBychits,
  getCustomersByGroups,
} from "../../services/service";
import CurrencyComponent from "../utils/currency";
import { useFormik } from "formik";
import { AuctionInitValues, AuctionSchema } from "../../validations/auction";
import Loader from "../utils/loader";
import { PiFlagPennantFill } from "react-icons/pi";
import searchImg from "../../assets/search.png";

const Actions = () => {
  const [mychit, setMychit] = useState([]);
  const [loader, setLoader] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [chitId, setChitId] = useState("");
  const [auctionChit, setAuctionChit] = useState([]);
  const [company, setCompany] = useState([]);
  const [groups, setGroups] = useState([]);
  const [companyId, setCompanyId] = useState();
  const [group, setGroup] = useState();
  const [value, setValue] = useState(1);
  const [chits, setChits] = useState([]);
  const [customers, setCustomers] = useState([]);

  const navigate = useNavigate();
  const forms = useFormik({
    initialValues: AuctionInitValues,
    validationSchema: AuctionSchema,
    onSubmit: (values) => {
      submitForms(values);
    },
  });
  const onChange = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    forms.resetForm();
  };

  const date = ["Every Month 5th", "Second Sunday"];

  const getMyChits = async () => {
    setLoader(true);
    try {
      const val = await getChitReports();
      setMychit(val.data);
    } catch (error) {
      if (error.response.status === 401) {
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
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const currentMonth = monthNames[currentMonthIndex];
    const SendToAPi = {
      month: currentMonth,
      chitId: chitId,
      Amount: data.chitAmount,
    };
    setLoader(true);
    try {
      const res = await MonthlyAuction(SendToAPi);
      console.log(res.data);
      handleCancel();
    } catch (error) {
      if (error.response.status === 401) {
        navigate("/");
      }
    } finally {
      setLoader(false);
    }
  };

  const getAuctions = async () => {
    setLoader(true);
    try {
      const values = await getAuctionDetails();
      setAuctionChit(values.data);
    } catch (error) {
      if (error.response.status === 401) {
        navigate("/");
      }
    } finally {
      setLoader(false);
    }
  };

  const getCompanies = async () => {
    setLoader(true);
    try {
      const companyData = await getAllCompany();
      setCompany(companyData.data);
    } catch (error) {
      if (error.response.status === 401) {
        navigate("/");
      }
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    getMyChits();
    getAuctions();
    getCompanies();
  }, []);

  const handleChange = async (e) => {
    let dates = date[e];
    setLoader(true);
    try {
      const val = await getcustomersbyDates(dates);
      setChits(val.data);
      console.log(val.data, "response");
    } catch (error) {
      if (error.response.status === 401) {
        navigate("/");
      }
    } finally {
      setLoader(false);
    }
  };

  const handleChangeChit = async (e) => {
    console.log(chits[e]);
    let id = chits[e]._id;
    setLoader(true);
    try {
      let val = await getgroupsBychits(id);
      setGroups(val.data);
    } catch (error) {
      if (error.response.status === 401) {
        navigate("/");
      }
    } finally {
      setLoader(false);
    }
  };

  const handleChangegroups = async (e) => {
    let id = groups[e]._id;
    console.log(id);
    setLoader(true);
    try {
      let val = await getCustomersByGroups(id);
      setCustomers(val.data);
    } catch (error) {
      if (error.response.status === 401) {
        navigate("/");
      }
    } finally {
      setLoader(false);
    }
  };

  const filterClick = async () => {
    console.log(companyId, group);
    setLoader(true);
    try {
      const values = await getAuctionDetails(companyId, group);
      setAuctionChit(values.data);
    } catch (error) {
      if (error.response.status === 401) {
        navigate("/");
      }
    } finally {
      setLoader(false);
    }
  };

  const columns = [
    {
      name: <h1 className="text-lg text-gray-500">S.No</h1>,
      selector: (row, ind) => ind + 1,
    },
    {
      name: <h1 className="text-lg text-gray-500">Groups</h1>,
      selector: (row) => row.group,
    },
    {
      name: <h1 className="text-lg text-gray-500">month</h1>,
      selector: (row) => "1",
    },
    {
      name: <h1 className="text-lg text-gray-500">Auction Amount</h1>,
      selector: (row) => <CurrencyComponent amount={row.Amount} />,
    },
    {
      name: <h1 className="text-lg text-gray-500">Dividend Amount</h1>,
      selector: (row) => <CurrencyComponent amount={row.dividendAmount} />,
    },
    {
      name: <h1 className="text-lg text-gray-500">Payable Amount</h1>,
      selector: (row) => <CurrencyComponent amount={row.payableAmount} />,
    },
    {
      name: <h1 className="text-lg text-gray-500">Status</h1>,
      selector: (row) => {
        return (
          <div>
            {/* {row.status == "Hold" ? <div className="flex justify-center items-center">{row.status}<PiFlagPennantFill className="text-red-500 size-5" /></div> : null}
            {row.status == "Completed" ? <div>{row.status}</div> : null} */}

            <Radio.Group
              onChange={onChange}
              value={value}
              className="flex flex-col"
            >
              <Radio
                value={1}
                className="flex flex-row justify-start items-center"
                style={{ buttonBg: "red" }}
              >
                Hold
              </Radio>
              <Radio
                value={2}
                className="flex flex-row justify-start items-center"
                style={{ buttonBg: "green" }}
              >
                Completed
              </Radio>
            </Radio.Group>
          </div>
        );
      },
    },
    {
      name: <h1 className="text-lg text-gray-500">Customer Name</h1>,
      selector: (row) => row.customers,
    },
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
        color: "#6C737F",
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
      when: (row) => row.status === "Completed",
      style: {
        backgroundColor: "#DCF2F9",
      },
    },
  ];

  return (
    <>
      {loader && <Loader />}
      <div>
        <h1 className="text-xl font-bold text-center py-5">Auction</h1>
      </div>
      <div className="flex xl:flex-row flex-col w-[95%] gap-10 py-4 px-4 items-center">
        <div
          className={`flex sm:flex-row flex-col justify-center items-center gap-2`}
        >
          <Select
            className="ml-2 sm:w-80 xl:w-80 w-full"
            placeholder="Select date"
            onChange={handleChange}
          >
            {date.map((item, ind) => (
              <Option key={ind}>{item}</Option>
            ))}
          </Select>
        </div>
        <div
          className={`flex sm:flex-row flex-col justify-around items-center gap-2 sm:gap-8 xl:gap-2`}
        >
          <Select
            className="ml-2 sm:w-80 xl:w-80 w-full"
            placeholder="Select Chit Name"
            onChange={handleChangeChit}
            // value={group}
          >
            {chits.length > 0 &&
              chits.map((item, ind) => (
                <Option key={ind} value={ind}>
                  {item.chitName}
                </Option>
              ))}
          </Select>
        </div>
        <div
          className={`flex sm:flex-row flex-col justify-around items-center gap-2 sm:gap-8 xl:gap-2`}
        >
          <Select
            className="ml-2 sm:w-80 xl:w-80 w-full"
            placeholder="Select Group"
            onChange={handleChangegroups}
            value={group}
          >
            {groups.length > 0 &&
              groups.map((item, ind) => (
                <Option key={ind} value={ind}>
                  {item.group}
                </Option>
              ))}
          </Select>
        </div>
        <div className="py-5">
          <button
            className="cursor-pointer transition-all bg-[#176B87] text-white w-28 h-[35px] rounded-lg border-[#15414e] border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]"
            onClick={filterClick}
          >
            Get
          </button>
        </div>
      </div>
      <div className="px-5">
        {customers && customers.length === 0 ? (
          <div className="flex justify-center">
            <img src={searchImg} alt="Search" />
          </div>
        ) : (
          <DataTable
            columns={columns}
            data={customers}
            customStyles={customStyles}
            conditionalRowStyles={conditionalRowStyles}
          />
        )}
      </div>
    </>
  );
};

export default Actions;
