// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { Select } from 'antd';
import DateFormat from '../../components/date';
import DataTable from "react-data-table-component";
import Loader from '../utils/loader';

function Payments() {
  const [loader, setLoader] = useState(false)
  const handleChange = (value) => {
    setLoader(true);
    console.log(`selected ${value}`);
  }

  const chits = [
    {
      chitName: "1 Lacs", chitAmount: "100000", group: "A", date: "16--02-2024"
    },
    {
      chitName: "2 Lacs", chitAmount: "100000", group: "A", date: "16--02-2024"
    },
    {
      chitName: "3 Lacs", chitAmount: "100000", group: "A", date: "16--02-2024"
    }
  ]

  const columns = [
    {
      name: (
        <h1 className="text-lg text-gray-500">
          S.No
        </h1>
      ),
      selector: (row, ind) => ind + 1,
    },
    {
      name: (
        <h1 className="text-lg text-gray-500">
          Chit Name
        </h1>
      ),
      selector: (row) => row.chitName,
    },
    {
      name: (
        <h1 className="text-lg text-gray-500">
          Chit Amount
        </h1>
      ),
      selector: (row) => `₹${row.chitAmount}`,
    },
    {
      name: (
        <h1 className="text-lg text-gray-500">
          Group
        </h1>
      ),
      selector: (row) => row.group,
    },
    {
      name: (
        <h1 className="text-lg text-gray-500">
          Date
        </h1>
      ),
      cell: (row) => <DateFormat date={row.createdAt} />,
    },
  ]
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
    <div>
      {loader ? <Loader data={loader} /> : null}
      <div className='text-center pt-10 text-xl  font-bold'>
        Payments
      </div>
      <div className='flex w-[95%] pl-10 gap-10 pt-7'>
        <div>
          <Select
            defaultValue="Select Category"
            style={{ width: 200 }}
            onChange={handleChange}
            options={[
              { value: 'second sunday', label: 'Second sunday' },
              { value: 'Every month 5th', label: 'Every Month 5th' },
            ]}
          />
        </div>
        <div>
          <Select
            defaultValue="Select Group"
            style={{ width: 200 }}
            onChange={handleChange}
            options={[
              { value: 'A', label: 'A' },
              { value: 'B', label: 'B' },
              { value: 'C', label: 'C' },
            ]}
          />
        </div>
        <div>
          <Select
            defaultValue="Select Amount"
            style={{ width: 200 }}
            onChange={handleChange}
            options={[
              { value: '100000', label: '100000' },
              { value: '200000', label: '200000' },
            ]}
          />
        </div>
        <button className='bg-[#176B87] flex justify-center items-center text-white w-32 gap-1 rounded-md h-8'>Get Payments</button>
      </div>
      <div className='w-[95%] m-auto mt-5 overflow-auto'>
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
  )
}

export default Payments