// eslint-disable-next-line no-unused-vars
import React from "react";
import { Select, message, Drawer } from "antd";
import {
  getUserList,
  createMap,
  getChitsMaps,
  getAllCompany,
  getchitsByCompany,
  getgroupsBychits,
} from "../../services/service";
const { Option } = Select;
import { Link, useNavigate } from "react-router-dom";
import Loader from "../utils/loader";
import { GoDotFill } from "react-icons/go";
import CurrencyComponent from "../utils/currency";

function ChitMapping() {
  let navigate = useNavigate();
  const [userSelect, setuserSelect] = React.useState([]);
  const [chit, setChit] = React.useState([]);
  const [chitUsers, setchitUsers] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [chitmap, setChetMap] = React.useState([]);
  const [chitCount, setChitCount] = React.useState("");
  const [messageApi, contextHolder] = message.useMessage();
  const [chitId, setChitId] = React.useState("");
  const [groupId, setgroupId] = React.useState("");
  const [getchitmaps, setgetchitmaps] = React.useState([]);
  const [loader, setLoader] = React.useState(false);
  const [company, Setcompany] = React.useState([]);
  const [groups, setgroups] = React.useState([]);
  const [companyInput, setCompanyInput] = React.useState(undefined);
  const [chitInput, setchitInput] = React.useState(undefined);
  const [groupInput, setgroupInput] = React.useState(undefined);
  const [userInput, setuserInput] = React.useState(undefined);

  const handleSelectChange = (selected) => {
    setuserInput(selected);
    setuserSelect(selected);
  };

  const handleChange = (e) => {
    setCompanyInput(e);
    setchitInput(undefined);
    setgroupInput(undefined);
    setuserInput(undefined);
    getChits(company[e]._id);
  };

  const chithandleChange = async (e) => {
    setchitInput(e);
    setgroupInput(undefined);
    setuserInput(undefined);
    getGroups(e);
    setChitId(e);
  };

  const grouphandleChange = async (e) => {
    setgroupInput(e);
    setuserInput(undefined);
    setgroupId(e);
  };

  let arr = [];
  const getusers = async () => {
    if (chitId == "") {
      error();
    } else {
      if (userSelect.length == 0) {
        error1();
      } else {
        userSelect.map((e) => {
          arr.push({ ...chitUsers[e], ...{ chit: 1 } });
        });
        setChetMap(arr);
        const sum = arr.reduce(
          (accumulator, currentValue) => accumulator + currentValue.chit,
          0
        );
        setChitCount(sum);
        showDrawer();
      }
    }
  };

  const chitChange = async (id) => {
    if (chitCount < 20) {
      setChetMap((chitmap) => {
        return chitmap.map((item) => {
          if (item._id === id) {
            return { ...item, chit: item.chit + 1 };
          }
          return item;
        });
      });
    }
  };

  const chitChangereduce = async (id) => {
    setChetMap((chitmap) => {
      return chitmap.map((item) => {
        if (item._id === id) {
          return { ...item, chit: item.chit - 1 };
        }
        return item;
      });
    });
  };

  React.useEffect(() => {
    const sum = chitmap.reduce(
      (accumulator, currentValue) => accumulator + currentValue.chit,
      0
    );
    setChitCount(sum);
  }, [chitmap]);

  let getChits = async (id) => {
    setLoader(true);
    try {
      let serverdata = await getchitsByCompany(id);
      setChit(serverdata.data);
      console.log(serverdata.data);
    } catch (error) {
      console.error("Error fetching chits:", error);
      if (error.response.status == 401) {
        navigate("/");
      }
    } finally {
      setLoader(false);
    }
  };

  let getchitusersLists = async () => {
    setLoader(true);
    try {
      let users = await getUserList();
      setchitUsers(users.data);
      // eslint-disable-next-line no-empty
    } catch (error) {
      if (error.response.status == 401) {
        navigate("/");
      }
    } finally {
      setLoader(false);
    }
  };

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const getChitMaps = async () => {
    try {
      let serData = await getChitsMaps();
      setgetchitmaps(serData.data);
      // eslint-disable-next-line no-empty
    } catch (error) {}
  };

  const getAllCompanies = async () => {
    setLoader(true);
    try {
      let values = await getAllCompany();
      Setcompany(values.data);
    } catch (error) {
      if (error.response.status == 401) {
        navigate("/");
      }
    } finally {
      setLoader(false);
    }
  };

  const getGroups = async (id) => {
    setLoader(true);
    try {
      let val = await getgroupsBychits(id);
      setgroups(val.data);
    } catch (error) {
      if (error.response.status == 401) {
        navigate("/");
      }
    } finally {
      setLoader(false);
    }
  };

  React.useEffect(() => {
    getchitusersLists();
    getChitMaps();
    getAllCompanies();
    console.log(company, "asdasd");
  }, []);

  const error = () => {
    messageApi.open({
      type: "error",
      content: "Please Select Chit To Map",
      duration: 1,
    });
  };

  const error1 = () => {
    messageApi.open({
      type: "error",
      content: "Please Select At least One Users To Map",
      duration: 1,
    });
  };

  const submitMapping = async () => {
    setLoader(true);
    let serSendData = {
      chitId: chitId,
      chitMaps: chitmap,
      groupId: groupId,
    };
    console.log(serSendData);

    try {
      let apiRes = await createMap(serSendData);
      console.log(apiRes.data);
      getChitMaps();
      onClose();
    } catch (error) {
      if (error.response.status == 401) {
        navigate("/");
      }
    } finally {
      setLoader(false);
    }
    setCompanyInput(undefined);
    setchitInput(undefined);
    setgroupInput(undefined);
    setuserInput(undefined);
  };

  return (
    <>
      {loader ? <Loader data={loader} /> : null}
      {contextHolder}
      <div className="flex justify-center max-w-[95%] py-5">
        <div></div>
        <div className="text-xl">
          <h1 className="font-bold py-2">Chit Mapping</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 xs:grid-cols-2 justify-items-center lg:flex justify-center gap-4  p-5">
        <Select
          placeholder="Select Company"
          className="lg:w-48 w-full"
          onChange={handleChange}
          value={companyInput}
        >
          {company.length > 0
            ? company.map((item, ind) => (
                <Option value={ind}>{item.companyName}</Option>
              ))
            : null}
        </Select>

        <Select
          placeholder="Select Chit"
          className="lg:w-48 w-full"
          onChange={chithandleChange}
          value={chitInput}
        >
          {
            // eslint-disable-next-line no-unused-vars
            chit.map((item, ind) => (
              // eslint-disable-next-line react/jsx-key
              <Option value={item._id}>{item.chitName}</Option>
            ))
          }
        </Select>

        <Select
          className=" lg:w-48 w-full"
          placeholder="Select Group"
          onChange={grouphandleChange}
          value={groupInput}
        >
          {
            // eslint-disable-next-line no-unused-vars
            groups &&
              groups.map((item, ind) => (
                // eslint-disable-next-line react/jsx-key
                <Option value={item._id}>{item.group}</Option>
              ))
          }
        </Select>

        <Select
          className="placeholder:text-black lg:w-48 w-full"
          mode="multiple"
          placeholder="Select Users"
          onChange={handleSelectChange}
          value={userInput}
          filterOption={(input, option) => {
            const name = option.props.children;
            const userName = chitUsers[option.props.value].name;
            return (
              typeof userName === "string" &&
              userName.toLowerCase().indexOf(input.toLowerCase()) >= 0
            );
          }}
        >
          {chitUsers.map((item, ind) => (
            <Option value={ind}>
              {item.name} - {item.phoneNumber}{" "}
            </Option>
          ))}
        </Select>

        {/* <button onClick={getusers} className='bg-[#176B87] text-white w-32 gap-1 rounded-md h-8'> Map Chit </button> */}
        <button
          className="cursor-pointer transition-all bg-[#176B87] text-white w-28 h-[35px] rounded-lg border-[#15414e] border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]"
          onClick={getusers}
        >
          Map Chit
        </button>
      </div>

      {/* cards design */}

      <div className="w-[95%] m-auto flex flex-col gap-3">
        {
          // eslint-disable-next-line no-unused-vars
          getchitmaps.map((data, ind) => (
            // eslint-disable-next-line react/jsx-key
            <div className="w-full rounded-md bg-[#f7ffff] p-2 drop-shadow-md cursor-pointer">
              <Link to={"/homepage/chitmapping/chitmapdetails?id=" + data._id}>
                <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-2 lg:grid-cols-5 xl:grid-cols-5 bg-white p-2 rounded cursor-pointer">
                  <section className="flex flex-col">
                    <p className="font-bold">{data.chitName}</p>
                    <p>{data.createdAt}</p>
                  </section>
                  <section className="flex p-1 px-2 rounded-xl bg-slate-200 w-fit h-fit mt-2">
                    {data.active ? (
                      <div className="text-green-600 flex justify-center items-center text-center">
                        <GoDotFill /> <p className="text-sm">Active</p>
                      </div>
                    ) : (
                      <div className="text-red-600 flex justify-center items-center text-center">
                        <GoDotFill /> <p className="text-sm">In active</p>
                      </div>
                    )}
                  </section>
                  <section className="">
                    <p className="font-bold">Amount</p>
                    <p>
                      <CurrencyComponent amount={data.chitAmount} />
                    </p>
                  </section>
                  <section className="">
                    <p className="font-bold">Group</p>
                    <p>{data.group}</p>
                  </section>
                  <section className="">
                    <p className="font-bold">Months</p>
                    <p>{data.months}</p>
                  </section>
                  {/* <section className="">
                    <p className="font-bold">Members</p>
                    <p>{data.no_of_Peoples}</p>
                  </section> */}
                </div>
              </Link>
            </div>
          ))
        }
      </div>

      {/* drawer */}
      <div>
        <Drawer
          title={"Total Chits " + chitCount}
          onClose={onClose}
          open={open}
        >
          {chitmap.map((e) => (
            <>
              <div className="w-full flex space-y-2 items-center">
                <label className="w-[90%]">{e.name}</label>
                <button
                  onClick={() => {
                    e.chit > 1 ? chitChangereduce(e._id) : null;
                  }}
                  className="bg-[#176B87] w-6 text-white"
                >
                  -
                </button>
                <input
                  type="number"
                  value={e.chit}
                  className="border-2 w-10 text-center pl-1"
                  disabled
                />{" "}
                <button
                  onClick={() => {
                    chitChange(e._id);
                  }}
                  className="bg-[#176B87] w-6 text-white"
                >
                  +
                </button>
              </div>
            </>
          ))}
          <div className="flex justify-center mt-8">
            {/* <button className='bg-[#176B87] flex justify-center items-center text-white w-20 gap-1 rounded-md h-8' onClick={submitMapping}>Submit</button> */}
            <button
              className="cursor-pointer transition-all bg-[#176B87] text-white w-28 h-[35px] rounded-lg border-[#15414e] border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]"
              onClick={submitMapping}
            >
              Submit
            </button>
          </div>
        </Drawer>
      </div>
    </>

    // <>
    //   {loader ? <Loader data={loader} /> : null}
    //   <div className=''>
    //     <div className='flex justify-center max-w-[95%] pt-5'>
    //       <div></div>
    //       <div className='text-xl'>
    //         <h1>Chit Mapping</h1>
    //       </div>
    //     </div>

    //     {/* cards design */}
    //     <section className=' flex w-[95%] m-auto gap-4 mt-4 items-center mb-4'>
    //       Chit Name:<Select
    //         defaultValue="select chit"
    //         style={{
    //           width: 120,
    //         }}
    //         onChange={handleChange}
    //       >
    //         {
    //           // eslint-disable-next-line no-unused-vars
    //           chits.map((item, ind) => (
    //             // eslint-disable-next-line react/jsx-data
    //             <Option value={item._id}>{item.chitName}</Option>
    //           ))
    //         }
    //       </Select>
    //     </section>

    //     <div className='w-[95%] m-auto grid grid-cols-1 gap-2'>

    //       {chits.map((key, value) => (
    //         <section key={key} className='grid md:grid-cols-3 sm:grid-cols-2 grid-cols-2 lg:grid-cols-6  xl:grid-cols-6 bg-white p-2 rounded cursor-pointer'>
    //           <section className='flex flex-col'>
    //             <p className='font-bold'>{key.chitName}</p>
    //             <p>{key.createdAt}</p>
    //           </section>
    //           <section className='flex p-1 rounded-xl bg-slate-200 w-fit h-fit mt-2'>
    //             {key.active ? <div className='text-green-600 flex justify-center items-center text-center'><GoDotFill /> <p className='text-sm'>Active</p></div> : <div className='text-red-600 flex justify-center items-center text-center'><GoDotFill /> <p className='text-sm'>Pending</p></div>}
    //           </section>
    //           <section className=''>
    //             <p className='font-bold'>Amount</p>
    //             <p>{key.chitAmount}</p>
    //           </section>
    //           <section className=''>
    //             <p className='font-bold'>Group</p>
    //             <p>{key.group}</p>
    //           </section>
    //           <section className=''>
    //             <p className='font-bold'>Months</p>
    //             <p>{key.months}</p>
    //           </section>
    //           <section className=''>
    //             <p className='font-bold'>Members</p>
    //             <p>{key.noOfPeople}</p>
    //           </section>
    //         </section>
    //       ))}

    //     </div>
    //   </div>
    // </>
  );
}

export default ChitMapping;
