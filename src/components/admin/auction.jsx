import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import { Select, Radio, Input, Modal } from "antd";
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
  const [dateInput, setDateInput] = useState(undefined);
  const [chitInput, setChitInput] = useState(undefined);
  const [groupInput, setGroupInput] = useState(undefined);
  const [status, setStatus] = useState({});
  const [isModalOpensubmit, setIsModalOpensubmit] = useState(false);
  const [customerInput, setCustomerInput] = useState(null)

  const showModal = () => {
    setIsModalOpensubmit(true);
  };

  const handleCancelModal = () => {
    setIsModalOpensubmit(false);
    setCustomerInput(null)
    // forms.resetForm();
  };


  const navigate = useNavigate();
  const forms = useFormik({
    initialValues: AuctionInitValues,
    validationSchema: AuctionSchema,
    onSubmit: (values) => {
      submitForms(values);
    },
  });

  const onChangeStatus = (e, ind) => {
    const newStatus = { ...status };
    newStatus[ind] = e.target.value;
    setStatus(newStatus);
    console.log(newStatus);
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
    setCustomers([]);
    setDateInput(e);
    setGroupInput(undefined);
    setChitInput(undefined);
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
    setCustomers([]);
    setChitInput(e);
    setGroupInput(undefined);
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
    setGroupInput(e);
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

  const clearInputs = () => {
    setCustomers([]);
    setDateInput(undefined);
    setChitInput(undefined);
    setGroupInput(undefined);
  };

  const handleAuctionChange = (id, e, row) => {
    // Amounts
    let commision = row.serviceCharges;
    let month = row.monthlyInstallment;
    let auctionAmount = parseInt(e);
    let AuctionMonths = row.chitCategory;
    // calculation of dividendAmount
    console.log(e);
    let AC = auctionAmount - commision;
    let inddivAmt = AC / AuctionMonths;
    let payableAmount = month - Math.round(inddivAmt);

    console.log(row);
    const updatedCustomers = customers.map((customer) => {
      if (customer._id === id) {
        return {
          ...customer,
          dividendAmount: inddivAmt,
          payableAmount: payableAmount,
        };
      }
      return customer;
    });

    setCustomers(updatedCustomers);
  };


  const handleConfirmsubmit = (e, val) => {
    console.log(e, val);
    setIsModalOpensubmit(true)
    setCustomerInput(val)

  }

  console.log(customerInput)

  const columns = [
    {
      name: <h1 className="text-lg text-gray-500">S.No</h1>,
      selector: (row, ind) => ind + 1,
    },
    // {
    //   name: <h1 className="text-lg text-gray-500">Groups</h1>,
    //   selector: (row) => row.group,
    // },
    {
      name: <h1 className="text-lg text-gray-500">month</h1>,
      selector: (row) => "1",
    },
    {
      name: <h1 className="text-lg text-gray-500 flex">Auction Amount</h1>,
      selector: (row) => (
        <Input
          placeholder="Auction amount"
          variant="filled"
          type="number"
          onChange={(e) => handleAuctionChange(row._id, e.target.value, row)}
        />
      ),
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
      selector: (row, index) => {
        return (
          <div>
            <Radio.Group
              onChange={(e) => onChangeStatus(e, index)}
              value={status[index] || 1}
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
      selector: (row) => (
        <Select
          value={customerInput}
          className="w-40"
          onChange={(e) => { handleConfirmsubmit(row, e) }}
          placeholder="Select Customer"
          options={row.chitMap.map((item, index) => ({
            value: item._id,
            label: item.customerName,
          }))}
        />
      ),
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
      <div className="grid xl:grid-cols-4 xs:grid-cols-2 justify-items-center py-5 xs:gap-0 gap-5">
        <div
          className={`flex sm:flex-row flex-col justify-center items-center gap-2`}
        >
          <Select
            className=" sm:w-48 w-full"
            placeholder="Select date"
            onChange={handleChange}
            value={dateInput}
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
            className=" sm:w-48 w-full"
            placeholder="Select Chit Name"
            onChange={handleChangeChit}
            value={chitInput}
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
            className=" sm:w-48 w-full"
            placeholder="Select Group"
            onChange={handleChangegroups}
            value={groupInput}
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
            onClick={clearInputs}
          >
            Clear
          </button>
        </div>
      </div>
      <div className="px-5">
        {customers && customers.length === 0 ? (
          <div className="flex justify-center">
            <img src={searchImg} alt="Search" className="w-[50%]" />
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

      {/* Modal */}

      <Modal
        title="Confirm Submit"
        height={"260px"}
        open={isModalOpensubmit}
        onCancel={handleCancelModal}
        footer={null}
      >
        <div className="flex flex-col justify-center items-center">
          <button className="bg-[#176B87] text-white px-4 py-2 rounded-md text-xl">Confirm</button>
        </div>
      </Modal>
    </>
  );
};

export default Actions;
