// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect, useRef } from "react";
import { Select, message } from "antd";
import DateFormat from "../../components/date";
import DataTable from "react-data-table-component";
import Loader from "../utils/loader";
import {
  getPayments,
  getUserData,
  PDFGend,
  AuctionPayment,
} from "../../services/service";
import CurrencyComponent from "../utils/currency";
import { useNavigate } from "react-router-dom";
import searchImg from "../../../public/customer.png";
// import { useReactToPrint } from "react-to-print";

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

function Payments() {
  const [loader, setLoader] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState();
  const [data, setData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [dateInput, setDateInput] = useState(undefined);
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  const [messageApi, contextHolder] = message.useMessage();
  const [payment, setPayment] = useState(0);
  const [paymentAmount, setPaymentAmount] = useState(0);
  const [interestAmount, setinterestAmount] = useState(0);
  const [inputText, setinputText] = useState("");

  const [auctionpaymentAmount, setauctionPaymentAmount] = useState("");

  const navigate = useNavigate();
  const componentRef = useRef();
  const [printURL, setprintURL] = useState("");
  const [tab, SetTab] = useState(1);
  const [auctinAmt, setAuctionamt] = useState(0);
  const [paidAuctionAmt, setpaidAuctionAmt] = useState(0);

  const handleChange = async (customerId) => {
    setLoader(true);
    setSelectedCustomerId(customerId);
    console.log("Selected Customer ID:", customerId);
    setUserData([]);
    try {
      let val = await getUserData(customerId);
      setUserData(val.data);
      // setAuctionamt(val.data.setAuctionamt);
      if (val.data.values.length == 0) {
        messageApi.open({
          type: "error",
          content: "Auction Didn't Start Yet. For This Month",
        });
      } else {
        let auctionAmt = val.data.TotalChitAmountOfAuction
          ? val.data.TotalChitAmountOfAuction
          : 0;
        setAuctionamt(auctionAmt);
        setpaidAuctionAmt(val.data.auctionPaidAmt);
      }
    } catch (error) {
      if (error.response.status === 401) {
        navigate("/");
      } else {
      }
    } finally {
      setLoader(false);
    }
  };

  const getCustomers = async () => {
    setLoader(true);
    try {
      let val = await getPayments();
      setData(val.data);
    } catch (error) {
      if (error.response.status === 401) {
        navigate("/");
      }
    } finally {
      setLoader(false);
    }
  };

  const clickToMove = (id, chitId, grpId) => {
    navigate(
      "/homepage/payments/paymentsDetails/" + id + "/" + chitId + "/" + grpId
    );
  };

  const [inputError, setInputError] = useState("");
  const [inputError1, setInputError1] = useState("");

  // const Category = ["Second Sunday", "Every Month 5th"];
  // const Group = ["A", "B", "C"];
  // const Amount = ["100000", "200000"]
  const dataTableData = searchTerm ? filteredData : data;

  useEffect(() => {
    getCustomers();
  }, []);

  useEffect(() => {
    if (searchTerm === "") {
      setFilteredData(data);
      return;
    }
  }, [searchTerm]);

  const handleInputChange = (e, balance) => {
    console.log(balance);
    const value = parseInt(e);
    if (e > balance) {
      setPaymentAmount(balance);
    } else {
      setPaymentAmount(e);
      console.log(value, "hhhh");
    }
  };

  const handleInputChangeInterest = (e) => {
    setinterestAmount(e);
  };

  const handleInputChangeLabel = (e) => {
    setinputText(e);
    console.log(e, "Label");
  };

  const handleInputChangeAuction = (e) => {
    const value = parseInt(e);
    console.log(value);
    if (!e) {
      setInputError1("Enter Amount");
    } else {
      let balance = auctinAmt - value;
      if (e > balance) {
        setauctionPaymentAmount(balance);
      } else {
        setauctionPaymentAmount(e);
      }
    }
  };

  // const sendDataToBackends = async (data, id) => {
  //   try {
  //     const sendData = {
  //       ...data,
  //       cashGiven: cashGivenValue,
  //       amount: defaultValue,
  //       auctionAmount: auctionAmountValue,
  //       userId: id,
  //       chitId: chitId,
  //       groupId: grpId,
  //       TotalAmt: ogValue,
  //     };
  //     try {
  //       let response = await PDFGend(sendData);
  //       if (response.data && response.data.pdf) {
  //         // fetchPayments();
  //         window.open(
  //           `https://chitapi.whydev.co.in/${response.data.pdf}`,
  //           "_blank"
  //         );
  //         // window.open(`http://localhost:3000${response.data.pdf}`, "_blank");

  //         window.location.reload();
  //       } else {
  //         console.error("PDF link not found in the response.");
  //       }
  //     } catch (error) {
  //       if (error.response && error.response.status === 401) {
  //         navigate("/");
  //       } else {
  //         console.error("Error generating PDF:", error);
  //       }
  //     }
  //   } catch (error) {
  //     console.error("Error sending data to backend:", error);
  //   }
  // };

  const handlePrint = async () => {
    let auctioTotal = 0;
    if (userData.auctions > 0) {
      auctioTotal = await userData.auctions.reduce(
        (acc, obj) => acc + obj.AuctionAmount
      );
    }
    setPaymentAmount(0);
    console.log(userData.auctions, "asd");

    let datas = {
      items: userData.values,
      TotalAmt: userData.balanceAmt,
      amount: paymentAmount,
      userId: selectedCustomerId,
      auctions: userData.auctions,
      auctionTotal: userData.totalCompletedAuction,
      chitAmount: userData.ChitAmountPrint,
      totalPayable1: userData.TotalPayablePrint1
        ? userData.TotalPayablePrint1
        : 0,
      totalPayable2: userData.TotalPayablePrint2
        ? userData.TotalPayablePrint2
        : 0,
      totalPayable3: userData.TotalPayablePrint3
        ? userData.TotalPayablePrint3
        : 0,
      paidAmount: userData.paidAmount ? userData.paidAmount : 0,
      interestAmount: interestAmount ? interestAmount : 0,
      labelText: inputText ? inputText : null,
    };
    try {
      let values = await PDFGend(datas);
      // window.open(`https://api.kamatchiammantrust.co.in${values.data.pdf}`, "_blank");
      window.open(`http://localhost:3000${values.data.pdf}`, "_blank");
      handleChange(selectedCustomerId);
      setinterestAmount(0);
      setinputText("");

      // window.open(`http://localhost:3000`, "_blank");      // window.location.reload();
    } catch (error) {}
    console.log(datas);
  };

  const PayAuctionPayment = async () => {
    let data = { userId: selectedCustomerId, amount: auctionpaymentAmount };
    let val = await AuctionPayment(data);
    if (val.data) {
      let paidAmt = parseInt(paidAuctionAmt) + val.data.amount;
      setpaidAuctionAmt(paidAmt);
      setauctionPaymentAmount("");
      message.success("Successfully Paid");
    }
  };

  return (
    <div>
      {loader ? <Loader /> : null}
      {contextHolder}

      <div className="text-center pt-10 text-xl font-bold pb-5"> Payments</div>
      <div className="py-5 px-10">
        <div
          className={`flex sm:flex-row w-[95%] px-5 flex-col justify-between items-center gap-2 sm:gap-8 xl:gap-2 `}
        >
          <div
            className={`flex sm:flex-row flex-col justify-center items-center gap-2`}
          >
            <Select
              className="sm:w-52 w-full"
              showSearch
              placeholder="Select Customer"
              onChange={(customerId) => handleChange(customerId)}
              value={selectedCustomerId}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {dataTableData.map((item, ind) => (
                <Option key={ind} value={item.customerId}>
                  {item.customerName}
                </Option>
              ))}
            </Select>
          </div>

          {/* <button className='bg-[#176B87] flex justify-center items-center text-white w-32 gap-1 rounded-md h-8'>Get Payments</button> */}
          {/* <button className="cursor-pointer transition-all bg-[#176B87] text-white w-32 h-[35px] rounded-lg border-[#15414e] border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]">
            ₹ Payments
          </button> */}
        </div>

        {selectedCustomerId == null ? (
          <img src={searchImg} className="w-[80%] m-auto h-[60vh]" />
        ) : (
          <div class="relative overflow-x-auto mt-4">
            <table class="w-full text-md text-left rtl:text-right text-gray-600">
              <thead class="text-[18px] text-[#6c737f] font-bold  bg-[#F3F4F6] py-4 border border-b-1 text-center">
                <tr>
                  <th className="px-6 py-5 ">S.No</th>
                  <th className="px-6 py-5">Name</th>
                  <th className="px-6 py-5">Cus Name</th>
                  <th className="px-6 py-5">Chits</th>
                  <th className="px-6 py-5">Groups</th>
                  <th className="px-6 py-5">Month</th>
                  <th className="px-6 py-5">Dividend Amount</th>
                  <th className="px-6 py-5">Auction amount</th>
                  <th className="px-6 py-5">Payable Amount </th>
                </tr>
              </thead>
              <tbody>
                {userData.values.length > 0 ? (
                  userData.values.map((item, i) => (
                    <tr
                      key={i}
                      className="border-b dark:border-gray-700 text-center"
                    >
                      <td className="px-6 py-4">{i + 1}</td>
                      <td className="px-6 py-4">{item.companyName}</td>
                      <td className="px-6 py-4">{item.Name}</td>
                      <td className="px-6 py-4">{item.chitName} </td>
                      <td className="px-6 py-4">{item.group}</td>
                      <td className="px-6 py-4">{item.no_of_month}</td>
                      <td className="px-6 py-4">{item.CurrentDivAmt}</td>
                      <td className="px-6 py-4">{item.AuctionAmount}</td>
                      <td className="px-6 py-4">{item.currentPayAmt}</td>
                    </tr>
                  ))
                ) : (
                  <tr className="border-b dark:border-gray-700">
                    <td colSpan={8}>No data available</td>
                  </tr>
                )}
              </tbody>
            </table>
            {/* <div className="mt-10 flex max-w-[100%] w-[100%] justify-center">
              <ul className=" w-[50%] flex gap-5 justify-center p-2 cursor-pointer bg-[#176b87] rounded-full text-lg">
                <li
                  className={
                    tab == 1
                      ? "w-[50%] p-4 text-center bg-white rounded-full text-lg"
                      : "w-[50%] p-4 text-center rounded-full text-lg text-white"
                  }
                  onClick={() => SetTab(1)}
                >
                  Payment
                </li>
                <li
                  className={
                    tab != 1
                      ? "w-[50%] p-4 text-center bg-white rounded-full text-lg"
                      : "w-[50%] p-4 text-center rounded-full text-lg text-white"
                  }
                  onClick={() => SetTab(2)}
                >
                  Auction Payment
                </li>
              </ul>
            </div> */}
            {/* {tab == 1 ? ( */}
            <div className="flex flex-row items-center justify-end pr-[300px]">
              {
                userData.auctions && userData.auctions.length > 0 &&
                <div className="flex flex-col items-start justify-center ">
                <h1 className="text-lg font-bold ">Auctions :-</h1>
                <div className="space-y-6">
                  {userData.auctions && userData.auctions.length > 0 ? (
                    userData.auctions.map((item, i) => (
                      <p key={i} className="flex justify-between ">
                        <span className="font-medium">Auction {i + 1}:</span>
                        <span className="px-5">
                          {item.AuctionAmount}{" "}
                          <sup
                            className={
                              item.radioStatus == "Completed"
                                ? "text-green-600 text-xl"
                                : "text-red-700"
                            }
                          >
                            {item.radioStatus}
                          </sup>{" "}
                        </span>
                      </p>
                    ))
                  ) : (
                    <p className=" text-lg  py-16">No Auction</p>
                  )}
                </div>
              </div>
              }
              
              <div className="flex flex-col py-6 space-y-6 mt-10 items-start justify-center ml-10">
                {
                  userData.totalPayable!==0&&
                  <p>
                  <span className="font-medium">Customer's Payable :</span>{" "}
                  <span className="px-4">{userData.totalPayable} </span>
                </p>
                }
                
                {
                  userData.PendingAmount!==0&&
                  <p className="font-bold text-red-600">
                  <span className="font-medium">Pending Amount :</span>{" "}
                  <span className="px-4">{userData.PendingAmount}</span>
                </p>
                }
                {
                userData.balanceAmt!==0&&
                <p>
                  <span className="font-medium">Customer's Balance :</span>{" "}
                  <span className="px-4">{userData.balanceAmt}</span>
                </p>
                }

                {
                  userData.TotalChitAmountOfAuction - userData.totalPayable > 0 &&
                  <p>
                  <span className="font-medium">Client's Payable :</span>{" "}
                  <span className="px-4">
                    {userData.TotalChitAmountOfAuction - userData.totalPayable <
                    0
                      ? 0
                      : userData.TotalChitAmountOfAuction -
                        userData.totalPayable}
                  </span>
                </p>
                }
                
                {
                  userData.paidAmount!==0&&
                  <p>
                  <span className="font-medium">Paid Amount :</span>{" "}
                  <span className="px-4">{userData.paidAmount}</span>
                </p>
                }

                
                {/* <p className="">
                <span className="font-medium">Balance To Pay :</span>{" "}
                <span className="px-4">5000</span>
              </p> */}

                <div className="flex flex-col justify-center items-center mt-4">
                  <input
                    type="number"
                    className="border-2 border-gray-200 p-1 rounded-lg  px-3"
                    value={paymentAmount}
                    // defaultValue={paymentAmount || userData.balanceAmt}
                    onChange={(e) => {
                      handleInputChange(e.target.value, userData.balanceAmt);
                    }}
                  />
                  {inputError && (
                    <p className="text-red-500 ml-4 py-2 ">{inputError}</p>
                  )}
                </div>

                <div className="flex flex-col justify-center items-center mt-4">
                  <p className="text-2xl font-bold">Extra Values</p>
                </div>
                <div className="flex flex-col justify-center items-center mt-4">
                  <input
                    type="text"
                    className="border-2 border-gray-200 p-1 rounded-lg  px-3 mb-2"
                    defaultValue={inputText}
                    // defaultValue={paymentAmount || userData.balanceAmt}
                    onChange={(e) => {
                      handleInputChangeLabel(e.target.value);
                    }}
                    placeholder="Enter Name of extra value"
                  />
                  <input
                    type="number"
                    className="border-2 border-gray-200 p-1 rounded-lg  px-3"
                    defaultValue={interestAmount}
                    // defaultValue={paymentAmount || userData.balanceAmt}
                    onChange={(e) => {
                      handleInputChangeInterest(e.target.value);
                    }}
                    placeholder="Enter Amount"
                  />
                </div>

                {/* <iframe ref={iframeRef} src={printURL} style={{ display: 'none' }} /> */}
                <div className="mt-4">
                  <button
                    className="right-4  cursor-pointer transition-all bg-[#176B87] text-white w-28 h-[35px] rounded-lg border-[#15414e] border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]"
                    onClick={handlePrint}
                  >
                    Print
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Payments;
