import React from "react";

const data = [
  {
    id: 1,
    date: "05-07-2023",
    name: "KKR travels",
    items: [
      { group: "10 Lakhs B", month: 8, amount: 120000, amountToBePaid: 45500 },
      { group: "10 Lakhs A", month: 14, amount: 70000, amountToBePaid: 48000 },
    ],
    amount: 96000,
    balance: 45599,
    total: 50000,
    status: "complete",
  },
  {
    id: 1,
    date: "05-07-2023",
    name: "KKR travels",
    items: [
      { group: "10 Lakhs B", month: 8, amount: 120000, amountToBePaid: 45500 },
      { group: "10 Lakhs A", month: 14, amount: 70000, amountToBePaid: 48000 },
    ],
    amount: 96000,
    balance: 45599,
    total: 50000,
    status: "incomplete",
  },
  // Add more data objects here if needed
];

const PaymentDetails = () => {
  return (
    <div className="grid grid-cols-3 justify-center gap-4">
      {data.map((entry, index) => (
        <div key={index} className="m-4">
          <Card data={entry} />
        </div>
      ))}
    </div>
  );
};

const Card = ({ data }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg w-80 relative">
      <div className="p-4">
        <p className="text-lg font-bold text-[#176B87]  mb-2">{data.name}</p>
        <p className="text-sm text-gray-600 mb-4">{data.date}</p>
        <div>
          {data.items.map((item, i) => (
            <div key={i} className="mb-2">
              <p>
                <span className="font-semibold">Group:</span> {item.group}
              </p>
              <p>
                <span className="font-semibold">Month:</span> {item.month}
              </p>
              <p>
                <span className="font-semibold">Amount:</span> {item.amount}
              </p>
              <p>
                <span className="font-semibold">Amount to be Paid:</span>{" "}
                {item.amountToBePaid}
              </p>
            </div>
          ))}
          <span
            className={`inline-block rounded-full px-2 py-1 text-white left-10 ${
              data.status === "complete" ? "bg-green-500" : "bg-red-500"
            }`}
          >
            {data.status === "complete" ? "Complete" : "Incomplete"}
          </span>
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

      <button className="absolute bottom-4 right-4 cursor-pointer transition-all bg-[#176B87] text-white w-28 h-[35px] rounded-lg border-[#15414e] border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]">
        Print
      </button>
    </div>
  );
};

export default PaymentDetails;
