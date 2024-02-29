import React from "react";
import CurrencyComponent from "../utils/currency";
import Loader from "../utils/loader";
import DataTable from "react-data-table-component";
import {
  getAuctionDetailsByChit,
  Monthly_Auction,
} from "../../services/service";
import { useNavigate, useSearchParams } from "react-router-dom";
import { IoMdDoneAll } from "react-icons/io";
import { Modal } from "antd";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { GiCancel } from "react-icons/gi";

const Auctiondetails = () => {
  const [searchParams] = useSearchParams();
  const [users, setUsers] = React.useState([]);
  const [id] = React.useState(searchParams.get("id"));
  const [loader, setLoader] = React.useState(false);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isModalOpen1, setIsModalOpen1] = React.useState(false);
  const [auctionCompleted, setauctionCompleted] = React.useState(false);
  const [selectedChit, setSelectedChit] = React.useState();

  let navigate = useNavigate();

  let fetchAuctionCustomers = async () => {
    setLoader(true);
    try {
      let val = await getAuctionDetailsByChit(id);
      setUsers(val.data.val);
      setauctionCompleted(
        val.data.chits.currentMonthAuction
          ? val.data.chits.currentMonthAuction
          : false
      );
    } catch (error) {
      if (error.response.status == 401) {
        navigate("/");
      }
    } finally {
      setLoader(false);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleCancel1 = () => {
    setIsModalOpen1(false);
  };

  const AuctionClick = async (data) => {
    setIsModalOpen(true);
    console.log(data);
    setSelectedChit(data);
  };

  const ClosedAuctionClick = async (data) => {
    setIsModalOpen1(true);
    console.log(data);
    setSelectedChit(data);

  };

  const submitAuction = async () => {
    setLoader(true);
    try {
      await Monthly_Auction(selectedChit);
      handleCancel();
    } catch (error) {
      if (error.response.status == 401) {
        navigate("/");
      }
    } finally {
      setLoader(false);
    }
  };

  React.useEffect(() => {
    fetchAuctionCustomers();
  }, []);

  const columns = [
    {
      name: <h1 className="text-lg text-black">S.No</h1>,
      selector: (row, ind) => ind + 1,
    },
    {
      name: <h1 className="text-lg text-black">Customer Name</h1>,
      selector: (row) => row.customerName,
    },
    {
      name: <h1 className="text-lg text-black">Month</h1>,
      selector: (row) => row.month,
    },
    {
      name: <h1 className="text-lg text-black">Bidding Amount</h1>,
      selector: (row) => <CurrencyComponent amount={row.Amount} />,
    },
    {
      name: <h1 className="text-lg text-black">Action</h1>,
      selector: (row) => (
        <div>
          {auctionCompleted && auctionCompleted==false ? (
            <button
              onClick={() => {
                AuctionClick(row);
              }}
              className="flex gap-1 bg-[#176B87] h-8 text-white justify-center items-center w-32 rounded-md"
            >
              <IoMdDoneAll /> Select Bid
            </button>
          ) : (
            <button onClick={()=>{ClosedAuctionClick(row)}} className="flex gap-1 bg-red-500 h-8 text-white justify-center items-center w-32 rounded-md">
              <GiCancel color="white"/> Closed Bid
            </button>
          )}
        </div>
      ),
    },
  ];
  const customStyles = {
    rows: {
      style: {
        minHeight: "48px",
        minWidth: "800px",
      },
    },
    headCells: {
      style: {
        paddingLeft: "8px",
        paddingRight: "8px",
        backgroundColor: "#F3F4F6",
        color: "#6c737f",
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

  return (
    <>
      {loader ? <Loader /> : null}
      <div className="px-10">
        <div className=" w-[80%] flex justify-between">
        <h1 className={`${auctionCompleted?'text-red-500 text-xl font-bold py-5':'text-[#176B87] text-xl font-bold py-5'}`}>{auctionCompleted?'Bid Closed For This Month':'Bid Opened For This Month'}</h1>
        <h1 className="text-xl font-bold py-5">Auctions Details</h1>
        <h1 className="text-xl font-bold py-5"></h1>
        </div>
        <DataTable
          columns={columns}
          data={users}
          customStyles={customStyles}
          pagination
          fixedHeader
          className=""
        />
      </div>

      {/* models */}

      <Modal open={isModalOpen} onCancel={handleCancel} footer={false}>
        <h1 className="text-center font-bold flex justify-center items-center gap-2 text-[#176B87]">
          {" "}
          <IoCheckmarkDoneCircle color="#176B87" /> Are you sure you want to
          close the bid for this month?
        </h1>
        <div className="w-[80%] m-auto flex justify-center flex-col">
          <div className="mt-5 w-full m-auto flex">
            <label className="w-[30%]">Customer:</label>
            <h2>
              {" "}
              {selectedChit && selectedChit.customerName
                ? selectedChit.customerName
                : "--"}{" "}
            </h2>
          </div>
          <div className="mt-5 w-full m-auto flex">
            <label className="w-[30%]">Bidding Amount:</label>
            <h2>
              {" "}
              {selectedChit && selectedChit.Amount ? (
                <CurrencyComponent amount={selectedChit.Amount} />
              ) : (
                "--"
              )}{" "}
            </h2>
          </div>
          <div className="mt-5 w-full m-auto flex">
            <label className="w-[30%]">Month:</label>
            <h2>
              {" "}
              {selectedChit && selectedChit.month
                ? selectedChit.month
                : "--"}{" "}
            </h2>
          </div>
          <div className="mt-5 w-full m-auto flex">
            <label className="w-[30%]">Chit Amount:</label>
            <h2>
              {" "}
              {selectedChit && selectedChit.chitAmount ? (
                <CurrencyComponent amount={selectedChit.chitAmount} />
              ) : (
                "--"
              )}{" "}
            </h2>
          </div>
        </div>

        <div className="w-[50%] flex justify-end gap-5 float-right">
          <button
            className="w-24 bg-red-500 text-white rounded-md"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            className="w-20 bg-[#176B87] text-white rounded-md "
            onClick={submitAuction}
          >
            {" "}
            Ok
          </button>
        </div>
      </Modal>

      <Modal open={isModalOpen1} onCancel={handleCancel1} footer={false}>
     
        <div className="w-[80%] m-auto flex justify-center flex-col">
          <div className="mt-5 w-full m-auto flex">
            <label className="w-[30%]">Customer:</label>
            <h2>
              {selectedChit && selectedChit.customerName
                ? selectedChit.customerName
                : "--"}
            </h2>
          </div>
          <div className="mt-5 w-full m-auto flex">
            <label className="w-[30%]">Bidding Amount:</label>
            <h2>
              {selectedChit && selectedChit.Amount ? (
                <CurrencyComponent amount={selectedChit.Amount} />
              ) : (
                "--"
              )}
            </h2>
          </div>
          <div className="mt-5 w-full m-auto flex">
            <label className="w-[30%]">Month:</label>
            <h2>
              {selectedChit && selectedChit.month
                ? selectedChit.month
                : "--"}{" "}
            </h2>
          </div>
          <div className="mt-5 w-full m-auto flex">
            <label className="w-[30%]">Chit Amount:</label>
            <h2>
              {selectedChit && selectedChit.chitAmount ? (
                <CurrencyComponent amount={selectedChit.chitAmount} />
              ) : (
                "--"
              )}
            </h2>
          </div>
        </div>
      </Modal>

    </>
  );
};

export default Auctiondetails;
