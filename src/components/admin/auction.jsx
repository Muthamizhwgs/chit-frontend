import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Link, useNavigate } from "react-router-dom";
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
  Monthly_AuctionSubmit,
  getAuctionsDates,
} from "../../services/service";
import CurrencyComponent from "../utils/currency";
import { useFormik } from "formik";
import { AuctionInitValues, AuctionSchema } from "../../validations/auction";
import Loader from "../utils/loader";
import { PiFlagPennantFill } from "react-icons/pi";
import searchImg from "../../assets/search.png";
import { CurrentMonthName } from "../utils/currentMonths";

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
  const [customerInput, setCustomerInput] = useState(null);
  const [auctionDates, setAuctionDates] = useState([]);
  const [auction, setAuction] = useState({});

  const showModal = () => {
    setIsModalOpensubmit(true);
  };
  auction;
  const handleCancelModal = () => {
    setIsModalOpensubmit(false);
    setCustomerInput(null);
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

  const onChangeStatus = (e, id) => {
    const updatedCustomers = customers.map((customer) => {
      if (customer._id === id) {
        return {
          ...customer,
          radioStatus: e,
        };
      }
      return customer;
    });

    setCustomers(updatedCustomers);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    forms.resetForm();
  };

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
  const [auct, setAuct] = useState(0);

  const getdates = async () => {
    setLoader(true);
    try {
      const dates = await getAuctionsDates();
      setAuctionDates(dates.data);
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
    getdates();
  }, []);

  const handleChange = async (e) => {
    let dates = auctionDates[e];
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
    // console.log(e);
    setAuct(e);
    console.log(auct);
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
    setIsModalOpensubmit(true);
    setCustomerInput(val);
    let users = e.chitMap;
    let find = users.findIndex((a) => {
      return a._id == val;
    });
    let customer = users[find];
    let addAmt = parseInt(auct) + parseInt(e.payableAmount);
    let paidAmt = parseInt(e.Amount) - addAmt;
    let data = {
      dividendAmount: e.dividendAmount,
      payableAmount: e.payableAmount,
      radioStatus: e.radioStatus == 0 ? "Hold" : "Completed",
      Amount: e.Amount,
      AuctionAmount: auct,
      customerId: customer.costumerId,
      chitId: customer.chitId,
      chitMapDetailsId: customer._id,
      chitMapId: customer.chitMapId,
      groupId: customer.groupId,
      customerName: customer.customerName,
      tobePaidAmount: paidAmt,
    };
    setAuction(data);
  };

  console.log(customerInput);

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
      name: <h1 className="text-lg text-gray-500">Month</h1>,
      selector: (row) => "1",
    },
    {
      name: <h1 className="text-lg text-gray-500 flex">Auction Amount</h1>,
      selector: (row) => (
        <Input
          placeholder="Auction amount"
          variant="filled"
          type="number"
          disabled={row.completedMonths}
          readOnly={row.completedMonths}
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
      selector: (row) => {
        return (
          <div>
            <Radio.Group
              className="flex flex-col"
              disabled={row.completedMonths}
            >
              <Radio
                value={0}
                className="flex flex-row justify-start items-center"
                style={{ buttonBg: "red" }}
                onChange={(e) => onChangeStatus(e.target.value, row._id)}
              >
                Hold
              </Radio>
              <Radio
                value={1}
                className="flex flex-row justify-start items-center"
                style={{ buttonBg: "green" }}
                onChange={(e) => onChangeStatus(e.target.value, row._id)}
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
          disabled={row.completedMonths}
          className="w-40"
          onChange={(e) => {
            handleConfirmsubmit(row, e);
          }}
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
        minHeight: "48px",
        minWidth: "800px",
        // backgroundColor:"green"
      },
    },
    headCells: {
      style: {
        paddingLeft: "8px",
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
      when: (row) => {
        console.log(row); // Log the row data
        return row.completedMonths == true; // Condition based on row data
      },
      style: {
        backgroundColor: "#DCF2F9", // Apply green background for rows meeting the condition
      },
    },
  ];

  const submitMonthyAuction = async () => {
    setLoader(true);
    try {
      let val = await Monthly_AuctionSubmit(auction);
      console.log(val);
      handleCancelModal();
    } catch (error) {
      if (error.response.status === 401) {
        navigate("/");
      }
    } finally {
      setLoader(false);
    }
  };

  return (
    <>
      {loader && <Loader />}
      <div>
        <h1 className="text-xl font-bold text-center py-5">Auction</h1>
      </div>
      <div className="grid xl:grid-cols-5 xs:grid-cols-2 py-5 xl:gap-0 gap-5">
        <div
          className={`flex sm:flex-row flex-col justify-center items-center gap-2`}
        >
          <Select
            className=" sm:w-52 w-full"
            placeholder="Select date"
            onChange={handleChange}
            value={dateInput}
          >
            {auctionDates.map((item, ind) => (
              <Option key={ind}> Every Month {item}</Option>
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
        <div className="flex ml-5 justify-center xl:justify-normal  gap-5">
          <button
            className="cursor-pointer transition-all bg-[#176B87] text-white w-44 px-9 h-[35px] rounded-lg border-[#15414e] border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]"
            onClick={clearInputs}
          >
            Clear
          </button>
          <Link to="/homepage/manageauction/holds">
          <button className="cursor-pointer transition-all bg-[#176B87] text-white w-28 h-[35px] rounded-lg border-[#15414e] border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]" >
            Holds
          </button>
          </Link>
          
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
        <div className="w-[90%] mx-auto my-5">
          <div className="w-full flex flex-row justify-between items-center text-lg">
            <div className="w-5/12 flex justify-start">
              <label htmlFor="">Customer Name</label>
            </div>
            <div className="w-1/12 flex justify-center">
              <p>:</p>
            </div>
            <div className="w-6/12 flex justify-end">
              <p> {auction.customerName ? auction.customerName : null}</p>
            </div>
          </div>
          <div className="w-full flex flex-row justify-between items-center text-lg">
            <div className="w-5/12 flex justify-start">
              <label htmlFor="">Chit Amount</label>
            </div>
            <div className="w-1/12 flex justify-center">
              <p>:</p>
            </div>
            <div className="w-6/12 flex justify-end">
              <p>
                <CurrencyComponent
                  amount={auction.Amount ? auction.Amount : null}
                />
              </p>
            </div>
          </div>

          <div className="w-full flex flex-row justify-between items-center text-lg">
            <div className="w-5/12 flex justify-start">
              <label htmlFor="">Auction Amount</label>
            </div>
            <div className="w-1/12 flex justify-center">
              <p>:</p>
            </div>
            <div className="w-6/12 flex justify-end">
              <p>
                <CurrencyComponent
                  amount={auction.AuctionAmount ? auction.AuctionAmount : null}
                />
              </p>
            </div>
          </div>

          <div className="w-full flex flex-row justify-between items-center text-lg">
            <div className="w-5/12 flex justify-start">
              <label htmlFor="">Dividend Amount</label>
            </div>
            <div className="w-1/12 flex justify-center">
              <p>:</p>
            </div>
            <div className="w-6/12 flex justify-end">
              <p>
                <CurrencyComponent
                  amount={
                    auction.dividendAmount ? auction.dividendAmount : null
                  }
                />
              </p>
            </div>
          </div>

          <div className="w-full flex flex-row justify-between items-center text-lg">
            <div className="w-5/12 flex justify-start">
              <label htmlFor="">Payable Amount</label>
            </div>
            <div className="w-1/12 flex justify-center">
              <p>:</p>
            </div>
            <div className="w-6/12 flex justify-end">
              <p>
                <CurrencyComponent
                  amount={auction.payableAmount ? auction.payableAmount : null}
                />
              </p>
            </div>
          </div>

          <div className="w-full flex flex-row justify-between items-center text-lg">
            <div className="w-5/12 flex justify-start">
              <label htmlFor="">To Be Paid Amount</label>
            </div>
            <div className="w-1/12 flex justify-center">
              <p>:</p>
            </div>
            <div className="w-6/12 flex justify-end">
              <p>
                <CurrencyComponent
                  amount={
                    auction.tobePaidAmount ? auction.tobePaidAmount : null
                  }
                />
              </p>
            </div>
          </div>

          <button
            className="bg-[#176B87] w-full text-white px-4 py-2 rounded-md text-xl mt-3"
            onClick={submitMonthyAuction}
          >
            Confirm
          </button>
        </div>
      </Modal>
    </>
  );
};

export default Actions;
