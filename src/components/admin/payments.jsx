// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { Select } from "antd";
import DateFormat from "../../components/date";
import DataTable from "react-data-table-component";
import Loader from "../utils/loader";

function Payments() {
  const [loader, setLoader] = useState(false);
  const handleChange = (value) => {
    setLoader(true);
    console.log(`selected ${value}`);
  };

  const chits = [
    {
      chitName: "Taj",
      chitAmount: "5000",
      phoneNumber: "9868676578",
    },
    {
      chitName: "asd",
      chitAmount: "5000",
      phoneNumber: "7857899064",
    },
  ];

  const columns = [
    {
      name: <h1 className="text-lg text-gray-500">S.No</h1>,
      selector: (row, ind) => ind + 1,
    },
    {
      name: <h1 className="text-lg text-gray-500">Customer Name</h1>,
      selector: (row) => row.chitName,
    },
    {
      name: <h1 className="text-lg text-gray-500">Phone Number</h1>,
      selector: (row) => row.phoneNumber,
    },
    {
      name: <h1 className="text-lg text-gray-500">Outstanding Amount</h1>,
      selector: (row) => row.chitAmount,
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
  const Category = ["Second Sunday","Every Month 5th"];
  const Group = ["A","B","C"];
  const Amount = ["100000","200000"]

  return (
    <div>
      {loader ? <Loader /> : null}
      <div className="text-center pt-10 text-xl font-bold pb-5">Payments</div>
      <div className=" grid xl:grid-cols-4 gap-5 md:grid-cols-2 xl:gap-10 grid-cols-1 place-items-center py-5 px-10">
        <div
          className={`flex sm:flex-row  flex-col justify-around items-center gap-2 sm:gap-8 xl:gap-2 `}>
          <Select
            className=""
            style={{ width: 200 }}
            placeholder="Select Category"
            onChange={handleChange}
            >
            {Category.map((item, ind) => (
              <Option value={ind}>{item}</Option>
            ))}
          </Select>
        </div>
        <div
          className={`flex sm:flex-row  flex-col justify-around items-center gap-2 sm:gap-8 xl:gap-2 `}>
          <Select
            className=""
            style={{ width: 200 }}
            placeholder="Select Group"
            onChange={handleChange}
            >
            {Group.map((item, ind) => (
              <Option value={ind}>{item}</Option>
            ))}
          </Select>
        </div>
        
        <div
          className={`flex sm:flex-row  flex-col justify-around items-center gap-2 sm:gap-8 xl:gap-2 `}>
          <Select
            className=""
            style={{ width: 200 }}
            placeholder="Select Amount"
            onChange={handleChange}
            >
            {Amount.map((item, ind) => (
              <Option value={ind}>{item}</Option>
            ))}
          </Select>
        </div>
        {/* <button className='bg-[#176B87] flex justify-center items-center text-white w-32 gap-1 rounded-md h-8'>Get Payments</button> */}
        <button className="cursor-pointer transition-all bg-[#176B87] text-white w-32 h-[35px] rounded-lg border-[#15414e] border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]">
          Payments
        </button>
      </div>
      <div className="w-[95%] m-auto mt-5 overflow-auto">
        <DataTable
          columns={columns}
          data={chits}
          fixedHeader
          pagination
          bordered1
          customStyles={customStyles}
        />
      </div>
    </div>
  );
}

export default Payments;
