import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { getHolds, hold_To_Completed } from "../../services/service";
import Loader from "../utils/loader";
import CurrencyComponent from "../utils/currency";

const Holds = () => {
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);

  const getHoldsDetails = async () => {
    setLoader(true);
    try {
      let values = await getHolds();
      setData(values.data);
    } catch (error) {
      if (error.response.status === 401) {
        navigate("/");
      }
    } finally {
      setLoader(false);
    }
  };

  const changeStatus = async (id) => {
    setLoader(true);
    try {
      let val = await hold_To_Completed(id);
      console.log(val.data);
      getHoldsDetails();
    } catch (error) {
      if (error.response.status === 401) {
        navigate("/");
      }
    }
  };

  useEffect(() => {
    getHoldsDetails();
  }, []);

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

  const columns = [
    {
      name: <h1 className="text-lg text-gray-500">S.No</h1>,
      selector: (row, ind) => ind + 1,
    },
    {
      name: <h1 className="text-lg text-gray-500">Customer Name</h1>,
      selector: (row) => row.customerName,
    },
    {
      name: <h1 className="text-lg text-gray-500">Chit </h1>,
      selector: (row) => row.chit,
    },
    {
      name: <h1 className="text-lg text-gray-500">Group </h1>,
      selector: (row) => row.group,
    },
    {
      name: <h1 className="text-lg text-gray-500">Amount </h1>,
      selector: (row) => <CurrencyComponent amount={row.tobePaidAmount} />,
    },
    {
      name: <h1 className="text-lg text-gray-500">Status</h1>,
      selector: (row) => row.radioStatus,
    },
    {
      name: <h1 className="text-lg text-gray-500">Action</h1>,
      selector: (row) => (
        <button onClick={()=>{changeStatus(row._id)}} className="cursor-pointer transition-all bg-[#176B87] text-white w-28 h-[35px] rounded-lg border-[#15414e] border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]">
          Completed
        </button>
      ),
    },
  ];

  return (
    <>
      {loader && <Loader />}
      <div>
        <div className="w-[95%] m-auto mt-5 overflow-auto">
          <DataTable
            columns={columns}
            data={data}
            fixedHeader
            pagination
            bordered1
            customStyles={customStyles}
          />
        </div>
      </div>
    </>
  );
};

export default Holds;
