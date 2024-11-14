// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { Select } from "antd";
import DateFormat from "../../components/date";
import DataTable from "react-data-table-component";
import Loader from "../utils/loader";
import { getPayments } from "../../services/service";
import CurrencyComponent from "../utils/currency";
import { useNavigate } from "react-router-dom";

function Payments() {
  const [loader, setLoader] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState();
  const [data, setData] = useState([]);

  const navigate = useNavigate();
  const handleChange = (value) => {
    setLoader(true);
    console.log(`selected ${value}`);
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

  const clickToMove = (id, chitId,grpId) => {
    navigate("/homepage/payments/paymentsDetails/" + id+'/'+chitId+'/'+grpId);
  };

  const handleSearch = (searchValue) => {
    setSearchTerm(searchValue);
    if (!searchValue) {
      setFilteredData(data);
      return;
    }
    const filteredResults = data.filter((user) => 
      user.customerName.toLowerCase().includes(searchValue.toLowerCase()) ||
      user.customerNumber.toString().includes(searchValue)
    );
    setFilteredData(filteredResults);
};

  const columns = [
    {
      name: <h1 className="text-lg text-gray-500">S.No</h1>,
      selector: (row, ind) => ind + 1,
    },
    {
      name: <h1 className="text-lg text-gray-500">Customer Name</h1>,
      cell: (row) => (
        <p
          className="underline cursor-pointer text-blue-500"
          onClick={() => {
            clickToMove(row.customerId, row.chitId, row.groupId);
          }}
        >
          {row.customerName}
        </p>
      ),
    },
    {
      name: <h1 className="text-lg text-gray-500" >Phone Number</h1>,
      selector: (row) => row.phoneNumber,
    },
    {
      name: <h1 className="text-lg text-gray-500">Chit</h1>,
      selector: (row) => row.chits,
    },
    {
      name: <h1 className="text-lg text-gray-500">Group</h1>,
      selector: (row) => row.groups,
    },
    {
      name: <h1 className="text-lg text-gray-500">Outstanding Amount</h1>,
      selector: (row) => <CurrencyComponent amount={row.monthlyInstallment} />,
    },
    {
      name: <h1 className="text-lg text-gray-500">Status</h1>,
      selector: (row) => (row.status == "Completed" ? "Completed" : "Ongoing"),
    },
    // {
    //   name: <h1>click</h1>,
    //   selector: (row) => <button onClick={clickToMove}>view</button>
    // }
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
  // const Category = ["Second Sunday", "Every Month 5th"];
  // const Group = ["A", "B", "C"];
  // const Amount = ["100000", "200000"]
  const dataTableData = searchTerm ? filteredData : data;

  useEffect(() => {
    getCustomers();
    if (searchTerm === "") {
      setFilteredData(data);
    }
  }, [searchTerm]);


  return (
    <div>
      {loader ? <Loader /> : null}
      <div className="text-center pt-10 text-xl font-bold pb-5"> Payments</div>
      <div className="py-5 px-10">
        <div
          className={`flex sm:flex-row w-[95%] px-5 flex-col justify-between items-center gap-2 sm:gap-8 xl:gap-2 `}
        >
          <form className="form sm:w-80 xs:w-72 w-64">
            <label for="search">
              <input
                className="input w-48 xs:w-56 sm:w-64 placeholder:text-[10.5px] xs:placeholder:text-xs  sm:placeholder:text-sm pb-1 xs:pb-0"
                type="text"
                required=""
                placeholder="Enter Customer Name or Phone Number"
                id="search"
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
              />
              <div class="fancy-bg"></div>
              <div class="search">
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  class="r-14j79pv r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-4wgw6l r-f727ji r-bnwqim r-1plcrui r-lrvibr"
                >
                  <g>
                    <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
                  </g>
                </svg>
              </div>
            </label>
          </form>
          {/* <button className='bg-[#176B87] flex justify-center items-center text-white w-32 gap-1 rounded-md h-8'>Get Payments</button> */}
          {/* <button className="cursor-pointer transition-all bg-[#176B87] text-white w-32 h-[35px] rounded-lg border-[#15414e] border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]">
            ₹ Payments
          </button> */}
        </div>
        <div className="w-[95%] m-auto mt-5 overflow-auto">
          <DataTable
            columns={columns}
            data={dataTableData}
            fixedHeader
            pagination
            bordered1
            customStyles={customStyles}
          />
        </div>
      </div>
    </div>
  );
}

export default Payments;
