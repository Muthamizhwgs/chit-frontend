import React, { useEffect, useState } from "react";
import { PDFGend, PayAndPrint } from "../../services/service";
import { useNavigate, useParams } from "react-router-dom";
import CurrencyComponent from "../utils/currency";
import { CashGiven, Amount, AuctionAmount } from "../utils/Calculations";

const PaymentDetails = () => {
  const { id, chitId, grpId } = useParams();
  const navigate = useNavigate();

  const [payments, setPayments] = useState([]);
  const [loader, setLoader] = useState(false);

  const fetchPayments = async () => {
    setLoader(true);
    try {
      let values = await PayAndPrint(id,chitId,grpId);
      setPayments(values.data);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        navigate("/");
      }
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, [id, chitId, grpId]);

  

  return (
    <div className="grid grid-cols-3 justify-items-stretch gap-4">
      {payments.length > 0 &&
        payments.map((entry, index) => (
          <div key={index} className="m-4 flex justify-center">
            <Card data={entry} id={id}  />
          </div>
        ))}
    </div>
  );
};

const Card = ({ data, id, }) => {
  console.log(data.items);
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

  return (
    <>
      <div className="bg-white rounded-lg shadow-lg w-80 relative">
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
      </div>
    </>
  );
};

export default PaymentDetails;
