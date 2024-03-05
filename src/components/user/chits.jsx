// eslint-disable-next-line no-unused-vars
import { Select } from "antd";
import React, { useEffect } from "react";
const { Option } = Select;
import { Link, useNavigate } from "react-router-dom";
import { getChitReports } from "../../services/customer.service";
import Loader from "../utils/loader";
import CurrencyComponent from "../utils/currency";
import { GoDotFill } from "react-icons/go";
const Chits = () => {
  const [mychit, setMychit] = React.useState([]);
  const [loader, setLoader] = React.useState(false);

  let navigate = useNavigate();
  const chits = [
    {
      _id: "id1",
      active: true,
      chitAmount: 1,
      chitName: "dippam",
      createdAt: "12-12-12",
      describeDate: "4",
      group: "A",
      months: 12,
      noOfPeople: 12,
      updatedAt: "11-11-11",
      status: "Pending",
    },
    {
      _id: "id2",
      active: false,
      chitAmount: 100000,
      chitName: "dappam",
      createdAt: "12-12-12",
      describeDate: "4",
      group: "B",
      months: 12,
      noOfPeople: 12,
      updatedAt: "11-11-11",
      status: "Completed",
    },
    {
      _id: "id2",
      active: false,
      chitAmount: 100000,
      chitName: "dappam",
      createdAt: "12-12-12",
      describeDate: "4",
      group: "C",
      months: 12,
      noOfPeople: 12,
      updatedAt: "11-11-11",
      status: "Pending",
    },
  ];

  const handleChange = () => {};

  const getMyChitss = async () => {
    setLoader(true);
    try {
      let val = await getChitReports();
      setMychit(val.data);
    } catch (error) {
      if (error.response.status == 401) {
        navigate("/");
      }
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    getMyChitss();
  }, []);

  return (
    <>
      {loader ? <Loader /> : null}
      <div>
        <div className="flex justify-center max-w-[95%]">
          <div></div>
          <div className="text-xl py-5">
            <h1 className="font-semibold">My Chits</h1>
          </div>
        </div>

        {/* cards design */}
        {/* <section className='py-5 flex xs:flex-row flex-col w-[95%] m-auto gap-4 mt-4 items-center mb-4'>
        Chit Name:<Select
          defaultValue="select chit"
          style={{
            width: 120,
          }}
          onChange={handleChange}
        >
          {
            // eslint-disable-next-line no-unused-vars
            chits.map((item, ind) => (
              // eslint-disable-next-line react/jsx-key
              <Option value={item._id}>{item.chitName}</Option>
            ))
          }
        </Select>
      </section> */}

        <div className=" w-[95%] m-auto  gap-5">
          {
            // eslint-disable-next-line no-unused-vars
            mychit.map((data, ind) => (
              // eslint-disable-next-line react/jsx-key
              <div
                className="grid justify-items-center xl:grid-cols-8 md:grid-cols-4 xs:grid-cols-2 xl:gap-0 gap-5 h-fit p-2 rounded-md py-4 bg-[#f7ffff] drop-shadow-md cursor-pointer"
                key={ind}
              >
                <div className="flex items-center">
                  <h3 className="font-bold ">{data.chitName}</h3>
                </div>
                <div className="flex justify-center items-center  ">
                  <div className=" w-fit h-fit bg-gray-200 p-1 px-3 rounded-full">
                    {data.active ? (
                      <p className="text-green-600 flex flex-row items-center gap-1"><GoDotFill/>Active</p>
                    ) : (
                      <p className="text-red-600 flex flex-row items-center gap-1"><GoDotFill/>InActive</p>
                    )}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold">Bidding</h4>
                  {data.Auction ? data.Auction : 0}/{data.no_of_Chit}{" "}
                </div>
                <div>
                  <h4 className="font-bold">months</h4>
                  {data.months}
                </div>

                <diV>
                  <h4 className="font-bold">Auctions</h4>0 / {data.months}
                </diV>
                <div>
                  <h4 className="font-bold"> monthly</h4>
                  <CurrencyComponent amount={data.monthlyInstallment} />
                </div>
                <div>
                  <h4 className="font-bold">Group</h4>
                  {data.group}
                </div>
                <div>
                  <h4 className="font-bold">ChitAmount</h4>
                  <CurrencyComponent amount={data.chitAmount} />
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </>
  );
};

export default Chits;
