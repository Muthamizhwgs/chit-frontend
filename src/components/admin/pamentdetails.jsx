import React, { useEffect, useState } from "react";
import { PayAndPrint } from "../../services/service";
import { useNavigate, useParams } from "react-router-dom";
import CurrencyComponent from "../utils/currency";
import PDFDocument from 'pdfkit';
import fs from 'fs';
const PaymentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [payments, setPayments] = useState([]);
  const [customerId, setCustomerId] = useState(null);
  const [loader, setLoader] = useState(false);



  const fetchPayments = async () => {
    setLoader(true);
    try {
      let values = await PayAndPrint(id);
      setPayments(values.data);
    } catch (error) {
      if (error.response.status === 401) {
        navigate("/");
      }
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  return (
    <div className="grid grid-cols-3 justify-items-stretch gap-4">
      {payments.length > 0 &&
        payments.map((entry, index) => (
          <div key={index} className="m-4 flex justify-center">
            <Card data={entry} />
          </div>
        ))}
    </div>
  );
};

const Card = ({ data }) => {
  const generatePdf = async () => {
    const doc = new PDFDocument({
      size: [3 * 72, 11 * 72]
    })
    doc.pipe(fs.createWriteStream('output.pdf'));
    doc.fontSize(25).text("new chit pdf", 100, 100);
    doc.end();
  }
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
                  <CurrencyComponent amount={item.auctionAmount} />
                </p>

                <p>
                  <span className="font-semibold">Amount:</span>{" "}
                  <CurrencyComponent amount={item.amount} />
                </p>

                <p>
                  <span className="font-semibold">Cash Given:</span>{" "}
                  <CurrencyComponent
                    amount={item.amountToBePaid ? item.amountToBePaid : 0}
                  />
                </p>
              </div>
            ))}
            <div className="flex flex-row  justify-end ">
              <span
                className={`rounded-full px-2 py-1 ${data.status === "complete" ? "text-green-500" : "text-red-500"
                  } text-base font-bold mr-2`}
              >
                {data.status === "complete" ? "Complete" : "Incomplete"}
              </span>
            </div>
          </div>
          <hr className="my-4 text-[#176B87]" />
          <p className="text-lg font-bold mb-2">Summary</p>
          <p>
            <span className="font-semibold">Amount:</span> {data.amount}
          </p>
          <p>
            <span className="font-semibold">Balance:</span> {data.balance}
          </p>
          <p>
            <span className="font-semibold">Total:</span> {data.total}
          </p>
        </div>

        <button onClick={generatePdf} className="absolute bottom-4 right-4 cursor-pointer transition-all bg-[#176B87] text-white w-28 h-[35px] rounded-lg border-[#15414e] border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]">
          Pay & Print
        </button>
      </div>
    </>
  );
};

export default PaymentDetails;
