import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Link, useNavigate } from "react-router-dom";
import { Select, Radio, Input, Modal, message } from "antd";
import { Option } from "antd/es/mentions";
import { GrPowerReset } from "react-icons/gr";

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
  updateAuctioToEveryOne,
  ResetAuction,
} from "../../services/service";
import CurrencyComponent from "../utils/currency";
import { useFormik } from "formik";
import { AuctionInitValues, AuctionSchema } from "../../validations/auction";
import Loader from "../utils/loader";
import { PiFlagPennantFill } from "react-icons/pi";
import searchImg from "../../assets/search.png";
import { CurrentMonthName } from "../utils/currentMonths";
import { FaEdit } from "react-icons/fa";

const Actions2 = () => {
  const [loader, setLoader] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [chitId, setChitId] = useState("");
  const [auctionChit, setAuctionChit] = useState([]);
  const [company, setCompany] = useState([]);
  const [groups, setGroups] = useState([]);
  const [companyId, setCompanyId] = useState();
  const [group, setGroup] = useState();
  const [customers, setCustomers] = useState([]);
  const [dateInput, setDateInput] = useState(undefined);
  const [chitInput, setChitInput] = useState(undefined);
  const [groupInput, setGroupInput] = useState(undefined);
  const [isModalOpensubmit, setIsModalOpensubmit] = useState(false);
  const [customerInput, setCustomerInput] = useState(null);
  const [editcustomerInput, EditsetCustomerInput] = useState(null);
  const [auctionDates, setAuctionDates] = useState([]);
  const [auction, setAuction] = useState({});
  const [editauction, setEditAuction] = useState({});
  const [dateApiCall, setdateApiCall] = useState("");
  const [auctioData, setAuctionData] = useState([]);

  const [messageApi, contextHolder] = message.useMessage();
  const [editModalOpen, setEditModalOpen] = useState(false);
  // const [resetAction, setResetAction] = useState(null);

  const showEditModal = () => {
    setEditModalOpen(true);
  };
  const closeEditModal = () => {
    setEditModalOpen(false);
    EditsetCustomerInput(null);
  };

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

  const handleResetActions = () => {
    setCustomerInput(null);
  };

  // const getMyChits = async () => {
  //   setLoader(true);
  //   try {
  //     const val = await getChitReports();
  //     setMychit(val.data);
  //   } catch (error) {
  //     if (error.response.status === 401) {
  //       navigate("/");
  //     }
  //   } finally {
  //     setLoader(false);
  //   }
  // };

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

  const submitForms = async (data) => {
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

  // const getAuctions = async () => {
  //   setLoader(true);
  //   try {
  //     const values = await getAuctionDetails();
  //     setAuctionChit(values.data);
  //   } catch (error) {
  //     if (error.response.status === 401) {
  //       navigate("/");
  //     }
  //   } finally {
  //     setLoader(false);
  //   }
  // };

  // const getCompanies = async () => {
  //   setLoader(true);
  //   try {
  //     const companyData = await getAllCompany();
  //     setCompany(companyData.data);
  //   } catch (error) {
  //     if (error.response.status === 401) {
  //       navigate("/");
  //     }
  //   } finally {
  //     setLoader(false);
  //   }
  // };
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
    // getMyChits();
    // getAuctions();
    // getCompanies();
    getdates();
  }, []);

  const handleChange = async (e) => {
    let dates = auctionDates[e];
    setdateApiCall(dates);
    setLoader(true);
    try {
      const val = await getCustomersByGroups(dates);
      setCustomers(val.data);
      console.log(val.data, "response");
    } catch (error) {
      if (error.response.status === 401) {
        navigate("/");
      }
    } finally {
      setLoader(false);
    }
    // setCustomers([]);
    // setDateInput(e);
    // setGroupInput(undefined);
    // setChitInput(undefined);
  };

  // const handleChangeChit = async (e) => {
  //   console.log(chits[e]);
  //   let id = chits[e]._id;
  //   setLoader(true);
  //   try {
  //     let val = await getgroupsBychits(id);
  //     setGroups(val.data);
  //   } catch (error) {
  //     if (error.response.status === 401) {
  //       navigate("/");
  //     }
  //   } finally {
  //     setLoader(false);
  //   }
  //   setCustomers([]);
  //   setChitInput(e);
  //   setGroupInput(undefined);
  // };

  // const handleChangegroups = async (e) => {
  //   let id = groups[e]._id;
  //   console.log(id);
  //   setLoader(true);

  //   try {
  //     let val = await getCustomersByGroups(id);
  //     setCustomers(val.data);
  //   } catch (error) {
  //     if (error.response.status === 401) {
  //       navigate("/");
  //     }
  //   } finally {
  //     setLoader(false);
  //   }
  //   setGroupInput(e);
  // };

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
    // setCustomers([]);
    // setDateInput(undefined);
    // setChitInput(undefined);
    // setGroupInput(undefined);
    window.location.reload(true);
  };

  const [auctionAmt, setAuctionAmt] = useState(0);

  const handleAuctionChange = (id, e, row) => {
    // Amounts
    var result = (40 / 100) * row.Amount;
    console.log(result, "per");
    if (e > result) {
      console.log("greter");
      setAuctionAmt(result);
      messageApi.open({
        type: "info",
        content: "Auction Amount Must Be Below 40%",
      });
    } else {
      console.log("lesser");
      setAuctionAmt(e);
    }
    let commision = row.serviceCharges;
    let month = row.monthlyInstallment;
    let auctionAmount = parseInt(e);
    setAuct(e);
    let AC = Math.ceil(auctionAmount - commision);
    let inddivAmt = Math.ceil(AC / 20);
    let payableAmount = month - Math.ceil(inddivAmt);

    // const updatedCustomers = customers.map((customer) => {
    //   if (customer._id === id) {
    //     return {
    //       ...customer,
    //       dividendAmount: inddivAmt,
    //       payableAmount: payableAmount,
    //     };
    //   }
    //   return customer;
    // });
    const updatedCustomers = [...customers];
    const index = updatedCustomers.findIndex((customer) => customer._id === id);
    console.log(updatedCustomers);
    setCustomers(updatedCustomers);
    if (index !== -1) {
      updatedCustomers[index] = {
        ...updatedCustomers[index],
        dividendAmount: inddivAmt,
        payableAmount: payableAmount,
        AuctionAmount: parseInt(e),
      };

      setCustomers(updatedCustomers);
    } else {
      console.log("Row not found");
    }
  };

  const handleConfirmsubmit = async (e, val) => {
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
      AuctionAmount: e.AuctionAmount,
      customerId: customer.costumerId,
      chitId: customer.chitId,
      chitMapDetailsId: customer._id,
      chitMapId: customer.chitMapId,
      groupId: customer.groupId,
      customerName: customer.customerName,
      tobePaidAmount: paidAmt,
      month: e.months,
    };
    setAuction(data);

    if (!e.Amount > 0) {
      messageApi.open({
        type: "error",
        content: "Enter Valid Auction Amount",
      });
    } else if (e.radioStatus != 0 && e.radioStatus != 1) {
      messageApi.open({
        type: "error",
        content: "Select Status",
      });
    } else if (data.dividendAmount < 0) {
      messageApi.open({
        type: "error",
        content: "Dividend Amount Must Greater Than Or Equal To Zero",
      });
    } else {
      if (auctioData.length > 0) {
        let findId = auctioData.findIndex((e) => e.groupId == data.groupId);
        if (findId != -1) {
          auctioData.splice(findId, 1);
          let val = [...auctioData, data];
          setAuctionData(val);
        } else {
          let val = [...auctioData, data];
          setAuctionData(val);
        }
      } else {
        let val = [...auctioData, data];
        setAuctionData(val);
      }
    }
  };

  const EditChange = async (data) => {
    setEditAuction(data);
    console.log(data);
    setEditModalOpen(true);
  };

  const resetAuction = async (data) => {
    console.log(data);
    setLoader(true);
    try {
      let value = await ResetAuction(data);
      console.log(value.data);
      window.location.reload(true);
      getdates();
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  };

  const EditAuctionValueChange = async (val) => {
    console.log(val, "Chit Amt");
    editauction.dividendAmount = val;
    let auctionAmount = parseInt(val);
    let commision = editauction.commision;
    let month = editauction.monthlyInstallment;

    let AuctionMonths = 20;
    let commisionAmt = (commision / 100) * editauction.Amount;
    let AC = Math.ceil(auctionAmount - commisionAmt);
    let inddivAmt = Math.ceil(AC / AuctionMonths);
    let payableAmount = month - Math.ceil(inddivAmt);
    let addAmt = parseInt(val) + parseInt(payableAmount);
    let paidAmt = parseInt(editauction.Amount) - addAmt;

    setEditAuction({
      ...editauction,
      dividendAmount: inddivAmt,
      payableAmount: payableAmount,
      AuctionAmount: parseInt(val),
      tobePaidAmount: paidAmt,
    });
  };

  const changeEditInputCustomer = async (e) => {
    EditsetCustomerInput(e);
  };

  const submitEdit = async () => {
    console.log(editauction);
    console.log(editcustomerInput);
    let id = editauction._id;
    let datas = {
      AuctionAmount: editauction.AuctionAmount,
      dividendAmount: editauction.dividendAmount,
      payableAmount: editauction.payableAmount,
      tobePaidAmount: editauction.tobePaidAmount,
      auctionId: editauction.auctionDetails._id,
      radioStatus: editauction.radioStatus,
      month: editauction.auctionDetails.month,
    };

    if (editcustomerInput != null) {
      datas = { ...datas, ...{ customerId: editcustomerInput } };
    } else {
      datas = datas;
    }
    if (datas.dividendAmount >= 0) {
      setLoader(true);
      try {
        let val = await updateAuctioToEveryOne(id, datas);
        try {
          const values = await getCustomersByGroups(dateApiCall);
          setCustomers(values.data);
          console.log(values.data, "response2");
        } catch (error) {
          if (error.response.status === 401) {
            navigate("/");
          }
        }
        setEditModalOpen(false);
      } catch (error) {
      } finally {
        setLoader(false);
      }
    } else {
      messageApi.open({
        type: "error",
        content: "dividend Amount must Greater Than Or Equal To ZERO",
      });
    }

    console.log(datas);
  };

  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  const columns = [
    {
      name: <h1 className="text-lg text-gray-500">S.No</h1>,
      selector: (row, ind) => ind + 1,
    },
    // chitName
    {
      name: <h1 className="text-lg text-gray-500">chitName</h1>,
      selector: (row) => row.chitName,
    },
    {
      name: <h1 className="text-lg text-gray-500">Group</h1>,
      selector: (row) => row.group,
    },
    {
      name: <h1 className="text-lg text-gray-500">Month</h1>,
      selector: (row) => row.months,
    },
    {
      name: <h1 className="text-lg text-gray-500 flex">Auction Amount</h1>,
      selector: (row) => (
        <Input
          placeholder="Auction amount"
          variant="filled"
          type="number"
          value={row.AuctionAmount}
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
                onChange={(e) => {
                  onChangeStatus(e.target.value, row._id);
                  handleResetActions();
                }}
              >
                Hold
              </Radio>
              <Radio
                value={1}
                className="flex flex-row justify-start items-center"
                style={{ buttonBg: "green" }}
                onChange={(e) => {
                  onChangeStatus(e.target.value, row._id);
                  handleResetActions();
                }}
              >
                Completed
              </Radio>
            </Radio.Group>
          </div>
        );
      },
    },
    {
      name: <h1 className="text-lg text-gray-500">Action</h1>,
      selector: (row) =>
        row.completedMonths ? (
          <div className="flex  items-center gap-3 cursor-pointer">
            <FaEdit
              size={50}
              className="cursor-pointer size-7"
              onClick={() => {
                EditChange(row);
              }}
            />
            <GrPowerReset
              size={50}
              className="size-7"
              onClick={() => {
                resetAuction(row);
              }}
            />
          </div>
        ) : (
          <Select
            // value={customerInput}
            disabled={
              row.completedMonths ||
              row.radioStatus == "null" ||
              row.AuctionAmount == 0
            }
            showSearch
            className="w-40"
            onChange={(e) => {
              handleConfirmsubmit(row, e);
            }}
            filterOption={filterOption}
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
        return row.completedMonths == true;
      },
      style: {
        backgroundColor: "#DCF2F9",
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

  const handleRadioChange = (e) => {
    console.log(e.target.value);
    setEditAuction({
      ...editauction,
      radioStatus: e.target.value,
    });
  };

  const submitAuctions = async () => {
    if (auctioData.length > 0) {
      setLoader(true);
      try {
        let data = { datas: auctioData };
        let val = await Monthly_AuctionSubmit(data);
        window.location.reload(true);
      } catch (error) {
      } finally {
        setLoader(false);
      }
    } else {
      messageApi.error("Select At Least One Auction");
    }
  };

  return (
    <>
      {contextHolder}
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

        <div className="flex ml-5 justify-center xl:justify-normal  gap-5">
          <button
            className="cursor-pointer transition-all bg-[#176B87] text-white w-44 px-9 h-[35px] rounded-lg border-[#15414e] border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]"
            onClick={clearInputs}
          >
            Clear
          </button>
          <Link to="/homepage/manageauction/holds">
            <button className="cursor-pointer transition-all bg-[#176B87] text-white w-28 h-[35px] rounded-lg border-[#15414e] border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]">
              Holds
            </button>
          </Link>
        </div>
        <div>
          {auctioData.length > 0 ? (
            <button
              onClick={submitAuctions}
              className="cursor-pointer float-right transition-all bg-[#176B87] text-white w-36 h-[35px] rounded-lg border-[#15414e] border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]"
            >
              Submit Auctions
            </button>
          ) : null}
        </div>
      </div>
      <div className="px-5">
        {customers && customers.length === 0 ? (
          <div className="flex justify-center">
            <img src={searchImg} alt="Search" className="w-[60%]" />
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
      {/* // Edit Model */}
      <Modal
        title="Edit Auction"
        height={"260px"}
        open={editModalOpen}
        onCancel={closeEditModal}
        footer={null}
      >
        <div className="flex  items-center ">
          <label htmlFor="" className="font-bold text-md w-[40%]">
            Chit Name :
          </label>
          <h3>{editauction.chitName}</h3>
        </div>
        <div className="flex items-center ">
          <label htmlFor="" className="font-bold text-md w-[40%]">
            Chit Amount :
          </label>
          <h3>{<CurrencyComponent amount={editauction.Amount} />}</h3>
        </div>
        <div className="flex items-center ">
          <label htmlFor="" className="font-bold text-md w-[40%]">
            Auction Amount :
          </label>
          {/* <h3>{<CurrencyComponent amount={editauction.AuctionAmount}/>}</h3> */}
          <Input
            placeholder="Auction amount"
            className="w-[60%]"
            type="number"
            defaultValue={editauction.AuctionAmount}
            onChange={(e) => EditAuctionValueChange(e.target.value)}
          />
        </div>
        <div className="flex items-center ">
          <label htmlFor="" className="font-bold text-md w-[40%]">
            dividend Amount :
          </label>
          <h3>{<CurrencyComponent amount={editauction.dividendAmount} />}</h3>
        </div>
        <div className="flex items-center ">
          <label htmlFor="" className="font-bold text-md w-[40%]">
            Payable Amount :
          </label>
          <h3>{<CurrencyComponent amount={editauction.payableAmount} />}</h3>
        </div>
        <div className="flex items-center ">
          <label htmlFor="" className="font-bold text-md w-[40%]">
            Status :
          </label>
          <Radio.Group
            name="radiogroup"
            defaultValue={editauction.radioStatus}
            className="flex items-center justify-between text-center"
            onChange={handleRadioChange}
          >
            <Radio value={"Hold"} className="text-center h-full">
              Hold
            </Radio>
            <Radio value={"Completed"} className="text-center h-full">
              Completed
            </Radio>
          </Radio.Group>
        </div>
        <div className="flex items-center ">
          <label htmlFor="" className="font-bold text-md w-[40%]">
            customer :
          </label>
          <p>
            {editauction.auctionDetails &&
              editauction.auctionDetails.customerName}
          </p>
        </div>
        <div className="flex items-center ">
          <label htmlFor="" className="font-bold text-md w-[40%]">
            Change customers :
          </label>
          <Select
            value={editcustomerInput}
            className="w-[60%]"
            showSearch
            filterOption={(input, option) =>
              option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            onChange={(e) => {
              changeEditInputCustomer(e);
            }}
            placeholder="Select Customer"
            options={
              editauction.chitMap &&
              editauction.chitMap.map((item, index) => ({
                value: item.costumerId,
                label: item.customerName,
              }))
            }
          />
        </div>

        <div className="flex justify-center mt-10">
          <button
            onClick={submitEdit}
            className="cursor-pointer transition-all bg-[#176B87] text-white w-44 px-9 h-[35px] rounded-lg border-[#15414e] border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]"
          >
            Submit
          </button>
        </div>
      </Modal>
    </>
  );
};

export default Actions2;
