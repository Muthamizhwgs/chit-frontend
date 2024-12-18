import React, { useEffect, useState } from "react";
import { PDFGend, PayAndPrint, getUserData } from "../../services/service";
import { useNavigate, useParams } from "react-router-dom";
import CurrencyComponent from "../utils/currency";
import { CashGiven, Amount, AuctionAmount } from "../utils/Calculations";
import DataTable from "react-data-table-component";
import Loader from "../utils/loader";

const PaymentDetails = () => {
  const { id, chitId, grpId } = useParams();
  const navigate = useNavigate();

  const [payments, setPayments] = useState([]);
  const [userData, setUserData] = useState([]);
  const [auctinAmt, setAuctionamt] = useState(0);
  const [paidAuctionAmt, setpaidAuctionAmt] = useState(0);
  const [loader, setLoader] = useState(false);

  const fetchPayments = async () => {
    setLoader(true);
    try {
      let values = await PayAndPrint(id,chitId,grpId);
      fetchuserData()
      setPayments(values.data);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        navigate("/");
      }
    } 
  };

  const fetchuserData = async()=> {
    try {
      let val = await getUserData(id);
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
  }

  useEffect(() => {
    fetchPayments();
  }, [id, chitId, grpId]);

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
      // labelText: inputText ? inputText : null,
    };
    try {
      let values = await PDFGend(datas);
      // window.open(`https://chitapi.whytap.tech${values.data.pdf}`, "_blank");
      window.open(`http://localhost:3000${values.data.pdf}`, "_blank");
      handleChange(selectedCustomerId);
      setinterestAmount(0);
      setinputText("");

      // window.open(`http://localhost:3000`, "_blank");      // window.location.reload();
    } catch (error) {}
    console.log(datas);
  };

  return (
    <section>
      {
        loader ? <Loader/> :
        <div className="grid grid-cols-1 justify-items-stretch gap-4">
          {payments.length > 0 &&
            payments.map((entry, index) => (
              <div key={index} className="m-4 flex justify-center">
                <Card data={entry} id={id} userData={userData}  />
              </div>
            ))}
        </div>
      }
    </section>
  );
};

const Card = ({ data, id,userData }) => {
  console.log(data,"datatatata");
  const handlePrint = async () => {
    let auctioTotal = 0;
    if (userData.auctions > 0) {
      auctioTotal = await userData.auctions.reduce(
        (acc, obj) => acc + obj.AuctionAmount
      );
    }
    const amountValue = Amount({ datas: data.items });

    let datas = {
      items: data.items,
      TotalAmt: userData.balanceAmt,
      amount: amountValue,
      userId: id,
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
      // interestAmount: interestAmount ? interestAmount : 0,
      // labelText: inputText ? inputText : null,
    };
    try {
      let values = await PDFGend(datas);
      window.open(`https://api.kamatchiammantrust.co.in${values.data.pdf}`, "_blank");
      // window.open(`http://localhost:3000${values.data.pdf}`, "_blank");
      handleChange(selectedCustomerId);
      setinterestAmount(0);
      setinputText("");

      // window.open(`http://localhost:3000`, "_blank");      // window.location.reload();
    } catch (error) {}
    console.log(datas);
  };
  const sendDataToBackends = async (data, id) => {
    try {
      const cashGivenValue = CashGiven({ datas: data.items });
      const amountValue = Amount({ datas: data.items });
      const auctionAmountValue = AuctionAmount({ datas: data.items });

      const sendData = {
        ...data,
        cashGiven: cashGivenValue,
        amount: amountValue,
        auctionAmount: auctionAmountValue,
        userId: id,
      };

      try {
        let response = await PDFGend(sendData);
        if (response.data && response.data.pdf) {
          // window.open(`https://chitapi.whydev.co.in/${response.data.pdf}`, "_blank");
          window.open(`http://localhost:3000${response.data.pdf}`, "_blank");
          // window.open(`https://api.kamatchiammantrust.co.in${response.data.pdf}`, "_blank");
          
        } else {
          console.error("PDF link not found in the response.");
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          navigate("/");
        } else {
          console.error("Error generating PDF:", error);
        }
      }
    } catch (error) {
      console.error("Error sending data to backend:", error);
    }
  };

  const columns = [
    {
      name: <h1 className="text-lg text-gray-500">S.No</h1>,
      selector: (row, ind) => ind + 1,
    },
    {
      name: <h1 className="text-lg text-gray-500">Name</h1>,
      selector: (row) => row.name,
    },
    {
      name: <h1 className="text-lg text-gray-500">Chits</h1>,
      selector: (row) => row.chitName,
    },
    {
      name: <h1 className="text-lg text-gray-500">Groups</h1>,
      selector: (row) => row.group,
    },
    {
      name: <h1 className="text-lg text-gray-500">Month</h1>,
      selector: (row) => row.month,
    },
    {
      name: <h1 className="text-lg text-gray-500">Dividend Amount</h1>,
      selector: (row) => row.CurrentDivAmt,
    },
    {
      name: <h1 className="text-lg text-gray-500">Auction Amount</h1>,
      selector: (row) => <div><CurrencyComponent amount={row.auctionAmount} /></div>,
    },
    {
      name: <h1 className="text-lg text-gray-500">Amount</h1>,
      selector: (row) => <div><CurrencyComponent amount={row.amount} /></div>,
    },
    {
      name: <h1 className="text-lg text-gray-500">Payable Amount</h1>,
      selector: (row) => <div><CurrencyComponent
      amount={row.amountToBePaid ? row.amountToBePaid : 0}
    /></div>,
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
        color: "#6c737f",
        fontWeight: "bold",
      },
    },
    cells: {
      style: {
        paddingLeft: "10px", // override the cell padding for data cells
        paddingRight: "8px",
        fontSize: "16px",
        color: "#364353",
      },
    },
  };

  return (
    <>
      {/* <div className="bg-white rounded-lg shadow-lg w-80 relative">
        <div className="p-4">
          <p className="text-lg font-bold text-[#176B87]  mb-2">{data.name}</p>
          <p className="text-sm text-gray-600 mb-4">{data.date}</p>
          <div className="relative">
            {data.items.map((item, i) => (
              <div key={i} className="mb-2">
                <p>
                  <span className="font-semibold">Group:</span> {item.group}
                </p>
                <p>
                  <span className="font-semibold">Month:</span> {item.month}
                </p>
                <p>
                  <span className="font-semibold">Auction Amount:</span>{" "}
                  {<CurrencyComponent amount={item.auctionAmount} />}
                </p>

                <p>
                  <span className="font-semibold">Amount:</span>
                  {<CurrencyComponent amount={item.amount} />}
                </p>

                <p>
                  <span className="font-semibold">Cash Given:</span>{" "}
                  {
                    <CurrencyComponent
                      amount={item.amountToBePaid ? item.amountToBePaid : 0}
                    />
                  }
                </p>
              </div>
            ))}
            <div className="flex flex-row  justify-end ">
              <span
                className={`rounded-full px-2 py-1 ${
                  data.status === "complete" ? "text-green-500" : "text-red-500"
                } text-base font-bold mr-2`}
              >
                {data.status === "complete" ? "Complete" : "Incomplete"}
              </span>
            </div>
          </div>
          <hr className="my-4 text-[#176B87]" />
          <p className="text-lg font-bold mb-2">Summary</p>
          <p>
            <span className="font-semibold">Amount:</span>{" "}
            <Amount datas={data.items} />
          </p>
          <p>
            <span className="font-semibold">Auction Amount:</span>{" "}
            <AuctionAmount datas={data.items} />
          </p>
          <p>
            <span className="font-semibold">Cash Given:</span>{" "}
            <CashGiven datas={data.items} />
          </p>
        </div>

        <div className="flex justify-end pb-5 pr-2">
        <button
          onClick={() => sendDataToBackends(data, id)}
          className=" cursor-pointer transition-all bg-[#176B87] text-white w-28 h-[35px] rounded-lg border-[#15414e] border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]"
        >
          Pay & Print
        </button>
        </div>
      </div> */}

<div className="bg-white rounded-lg shadow-lg w-full ">
        <div className="p-4 w-full">
          <p className="text-lg font-bold text-[#176B87]  mb-2">{data.name}</p>
          <p className="text-sm text-gray-600 mb-4">{data.date}</p>
          <div className="relative">
            
            <DataTable
            columns={columns}
            data={data.items}
            fixedHeader
            pagination
            bordered1
            customStyles={customStyles}
          />
            <div className="flex flex-row  justify-end ">
              <span
                className={`rounded-full px-2 py-1 ${
                  data.status === "complete" ? "text-green-500" : "text-red-500"
                } text-base font-bold mr-2`}
              >
                {data.status === "complete" ? "Complete" : "Incomplete"}
              </span>
            </div>
          </div>
          <hr className="my-4 text-[#176B87]" />
          <p className="text-lg font-bold mb-2">Summary</p>
          <p>
            <span className="font-semibold">Amount:</span>{" "}
            <Amount datas={data.items} />
          </p>
          <p>
            <span className="font-semibold">Auction Amount:</span>{" "}
            <AuctionAmount datas={data.items} />
          </p>
          <p>
            <span className="font-semibold">Cash Given:</span>{" "}
            <CashGiven datas={data.items} />
          </p>
        </div>

        <div className="flex justify-end pb-5 pr-2">
        <button
          onClick={handlePrint}
          className=" cursor-pointer transition-all bg-[#176B87] text-white w-28 h-[35px] rounded-lg border-[#15414e] border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]"
        >
          Pay & Print
        </button>
        </div>
      </div>
    </>
  );
};

export default PaymentDetails;
