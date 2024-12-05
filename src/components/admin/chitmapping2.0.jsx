// eslint-disable-next-line no-unused-vars
import React, { useState, createContext, useRef } from "react";
import { Select, message, Drawer } from "antd";
import {
  getUserList,
  createMap,
  getChitsMaps,
  getAllCompany,
  getchitsByCompany,
  getgroupsBychits,
  getChitMapsById,
  UpdateChitMapsDetaills,
  deleteChitGroup,
} from "../../services/service";
const { Option } = Select;
import { Link, useNavigate } from "react-router-dom";
import Loader from "../utils/loader";
import { GoDotFill } from "react-icons/go";
import CurrencyComponent from "../utils/currency";
import { FaEdit } from "react-icons/fa";
import { Modal, Button } from "antd";
import { MdDeleteForever } from "react-icons/md";
import Draggable from "react-draggable";
function ChitMapping() {
  let navigate = useNavigate();

  const [userSelect, setuserSelect] = React.useState([]);
  const [chitmap, setChetMap] = React.useState([]);
  const [chitmap2, setChetMap2] = React.useState([]);
  const [chitCount, setChitCount] = React.useState("");
  const [chitCount2, setChitCount2] = React.useState("");
  const [chitId, setChitId] = React.useState("");
  const [groupId, setgroupId] = React.useState("");
  const [getchitmaps, setgetchitmaps] = React.useState([]);

  const [open, setOpen] = React.useState(false);
  const [loader, setLoader] = React.useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const [chit, setChit] = React.useState([]);
  const [chitUsers, setchitUsers] = React.useState([]);
  const [company, Setcompany] = React.useState([]);
  const [groups, setgroups] = React.useState([]);

  const [companyInput, setCompanyInput] = React.useState(undefined);
  const [chitInput, setchitInput] = React.useState(undefined);
  const [groupInput, setgroupInput] = React.useState(undefined);
  const [userInput, setuserInput] = React.useState(undefined);

  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [rowDataForEdit, setRowDataForEdit] = React.useState(null);
  const [editMode, setEditMode] = useState(false);

  //edit states

  const [editUserSelect, setEditUserSelect] = React.useState([]);
  const [editDrawer, setEditDrawer] = useState(false);

  const [editChit, setEditChit] = React.useState([]);
  const [editChitUsers, setEditChitUsers] = useState([]);
  const [editCompany, SetEditCompany] = React.useState([]);
  const [editGroups, setEditGroups] = React.useState([]);

  const [editCompanyInput, setEditCompanyInput] = React.useState(undefined);
  const [editChitInput, setEditChitInput] = React.useState(undefined);
  const [editGroupInput, setEditGroupInput] = React.useState(undefined);
  const [editUserInput, setEditUserInput] = React.useState(undefined);
  const [editId, setEditId] = React.useState(null);
  const ReachableContext = createContext(null);
  const UnreachableContext = createContext(null);
  // console.log(company, "chiti");

  const [opennew, setOpennew] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [deleteChit, SetDeleteChit] = useState({});
  const [bounds, setBounds] = useState({
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
  });

  const draggleRef = useRef(null);

  const showModal = (id) => {
    SetDeleteChit(id);
    setOpennew(true);
  };

  const deleteChitGroupByGroupId = async () => {
    setLoader(true);
    try {
      let serverdata = await deleteChitGroup(deleteChit);
      console.log(serverdata);
      handleCancelnew();
    } catch (error) {
      message.error("Delete Failed");
    } finally {
      setLoader(false);
    }
  };

  const handleCancelnew = (e) => {
    setOpennew(false);
  };

  const onStart = (_event, uiData) => {
    const { clientWidth, clientHeight } = window.document.documentElement;
    const targetRect = draggleRef.current?.getBoundingClientRect();
    if (!targetRect) {
      return;
    }

    setBounds({
      left: -targetRect.left + uiData.x,
      right: clientWidth - (targetRect.right - uiData.x),
      top: -targetRect.top + uiData.y,
      bottom: clientHeight - (targetRect.bottom - uiData.y),
    });
  };

  const chengeEdit = async (id) => {
    try {
      setEditMode(true);
      setEditId(id);
      const response = await getChitMapsById(id);
      const chitMapData = response.data[0];
      const companyObject = company.find(
        (company) => company._id === chitMapData.companyId
      );
      if (companyObject) {
        setEditCompanyInput(companyObject.companyName);
        console.log("Company name set to:", companyObject.companyName);
      } else {
        console.error("Company not found for ID:", chitMapData.companyId);
      }
      setChitId(chitMapData.chitMasterId);
      setgroupId(chitMapData.groupId);
      setEditChitInput(chitMapData.chitName);

      setEditGroupInput(chitMapData.group);

      const getData = chitMapData.chitMap.map((f, index) => ({
        value: f.id,
        label: f.name + "-" + f.phoneNumber,
        name: f.name,
        chit: f.chit,
        key: index,
      }));
      console.log(getData, "getData");
      setEditUserInput(getData);
      const getData2 = chitMapData.chitMap.map((f) => f.id);
      setEditUserSelect(getData2);

      setRowDataForEdit(chitMapData);
      console.log("Row data set for edit:", chitMapData);
      setIsModalVisible(true);
      console.log("Modal should be visible now");
    } catch (error) {
      console.error("Error fetching chit map data:", error);
    }
  };

  // console.log("row data", rowDataForEdit);

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditMode(false);
    setEditDrawer(false);
    setEditUserInput([]);
  };

  const handleChange = (e) => {
    setCompanyInput(e);
    setchitInput(undefined);
    setgroupInput(undefined);
    setuserInput(undefined);
    getChits(company[e]._id);
  };

  //edit handle change;

  const handleEditChange = (e) => {
    console.log(e, "event");
    setEditCompanyInput(e);
    setEditChitInput(undefined);
    setEditGroupInput(undefined);
    setEditUserInput(undefined);
    getChits(editCompany[e]._id);
  };

  const chithandleChange = async (e) => {
    setchitInput(e);
    setgroupInput(undefined);
    setuserInput(undefined);
    getGroups(e);
    setChitId(e);
  };

  //edit chit handle change

  const editChithandleChange = async (e) => {
    setEditChitInput(e);
    setEditGroupInput(undefined);
    setEditUserInput(undefined);
    getGroups(e);
    setChitId(e);
  };

  const grouphandleChange = async (e) => {
    setgroupInput(e);
    setuserInput(undefined);
    setgroupId(e);
  };

  // EDIT GROUP HANDLE CHANGE

  const editGrouphandleChange = async (e) => {
    setEditGroupInput(e);
    setEditUserInput(undefined);
    setgroupId(e);
  };

  const handleSelectChange = (selected) => {
    console.log(selected, "getselecc");
    setuserInput(selected);
    setuserSelect(selected);
  };

  // edit handle select change

  const editHandleSelectChange = (selected) => {
    setEditUserInput(selected);
    setEditUserSelect(selected);
  };

  const handleClear = () => {
    setCompanyInput(undefined);
    setchitInput(undefined);
    setgroupInput(undefined);
    setuserInput(undefined);
  };

  let arr = [];
  const getusers = async () => {
    if (chitId == "") {
      error();
    } else {
      setEditMode(false);
      if (userSelect.length == 0) {
        error1();
      } else {
        console.log(userSelect, "chitusers");
        userSelect.map((e) => {
          arr.push({ ...chitUsers[e], ...{ chit: 1 } });
        });
        setChetMap(arr);
        const sum = arr.reduce(
          (accumulator, currentValue) => accumulator + currentValue.chit,
          0
        );
        setChitCount(sum);
        console.log(arr, "chutmao");
        showDrawer();
      }
    }
  };

  let arrValue = [];
  const getusersforEdit = async () => {
    console.log("trigger");
    if (chitId == "") {
      error();
    } else {
      if (editUserSelect.length == 0) {
        error1();
      } else {
        const response = await getChitMapsById(editId);

        console.log(response.data, "res");

        const chitMapData = response.data[0];

        const getData = chitMapData.chitMap.map((f) => ({
          value: f.id,
          label: f.name + "-" + f.phoneNumber,
          name: f.name,
          chit: f.chit,
        }));

        const matchedItems = getData.filter((item1) =>
          editUserSelect.some((item2) => item2 === item1.value)
        );

        const filteredNewItems = editChitUsers.filter((item1) =>
          editUserSelect.some((item2) => item2 === item1.value)
        );

        const balanceItem = filteredNewItems.filter(
          (item1) => !matchedItems.some((item2) => item2.value === item1.value)
        );

        const balanceItemWithChit = balanceItem.map((item) => ({
          ...item,
          chit: 1,
        }));

        const combinedData = [...matchedItems, ...balanceItemWithChit];

        console.log(matchedItems, "matcheditems");
        console.log(balanceItem, "balacne");
        console.log(filteredNewItems, "newitems");
        console.log(combinedData, "combine");

        // commonItems.map((item) => {
        //   arrValue.push({ ...item, chit: 1 });
        // });

        setChetMap2(combinedData);
        const sum = combinedData.reduce(
          (accumulator, currentValue) => accumulator + currentValue.chit,
          0
        );
        setChitCount2(sum);
        showDrawer();
        setEditDrawer(true);
      }
    }
  };

  console.log(chitmap2, "chitmap");

  const chitChange = async (id) => {
    console.log(id, "weyfiyfuhi");
    if (editDrawer) {
      if (chitCount2 < 20) {
        setChetMap2((chitmap) => {
          console.log(id, "chit");
          return chitmap.map((item) => {
            if (item.value === id) {
              return { ...item, chit: item.chit + 1 };
            }
            return item;
          });
        });
      }
    } else {
      if (chitCount < 20) {
        setChetMap((chitmap) => {
          return chitmap.map((item) => {
            // console.log(item)
            if (item.id === id) {
              return { ...item, chit: item.chit + 1 };
            }
            return item;
          });
        });
      }
    }
  };

  const chitChangereduce = async (id) => {
    if (editDrawer) {
      console.log(id, "id");
      setChetMap2((chitmap) => {
        return chitmap.map((item) => {
          if (item.value === id) {
            return { ...item, chit: item.chit - 1 };
          }
          return item;
        });
      });
    } else {
      console.log(id, "id");
      setChetMap((chitmap) => {
        return chitmap.map((item) => {
          // console.log(item)
          if (item.id === id) {
            return { ...item, chit: item.chit - 1 };
          }
          return item;
        });
      });
    }
  };

  React.useEffect(() => {
    const sum = chitmap.reduce(
      (accumulator, currentValue) => accumulator + currentValue.chit,
      0
    );
    setChitCount(sum);
  }, [chitmap]);

  React.useEffect(() => {
    const sum = chitmap2.reduce(
      (accumulator, currentValue) => accumulator + currentValue.chit,
      0
    );
    setChitCount2(sum);
  }, [chitmap2]);

  let getChits = async (id) => {
    setLoader(true);
    try {
      let serverdata = await getchitsByCompany(id);
      setChit(serverdata.data);
      setEditChit(serverdata.data);
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
      // setEditChitUsers(users.data);
      const getData = users.data.map((f, index) => ({
        value: f.id,
        label: f.name + "-" + f.phoneNumber,
        name: f.name,
        key: index, // Use index as the key
      }));
      setEditChitUsers(getData);
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
    setEditDrawer(false);
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
      SetEditCompany(values.data);
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
      setEditGroups(val.data);
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

    if (editDrawer) {
      let serSendData = {
        chitId: chitId,
        chitMaps: chitmap2,
        groupId: groupId,
      };
      try {
        await UpdateChitMapsDetaills({
          ...serSendData,
          ...{ chitMapId: editId },
        });
        onClose();
        setIsModalVisible(false);
        getChitMaps();
      } catch (error) {
        console.log(error.response.data.message);
      } finally {
        setLoader(false);
      }
    } else {
      let serSendData = {
        chitId: chitId,
        chitMaps: chitmap,
        groupId: groupId,
      };
      try {
        console.log(serSendData);
        let apiRes = await createMap(serSendData);
        console.log(apiRes.data);
        getChitMaps();
        onClose();
      } catch (error) {
        if (error.response.status == 401) {
          navigate("/");
        }

        if (error.response.status == 400) {
          messageApi.open({
            type: "error",
            content: "Group Already In  Active",
            duration: 1,
          });
        }
      } finally {
        setLoader(false);
      }
      setCompanyInput(undefined);
      setchitInput(undefined);
      setgroupInput(undefined);
      setuserInput(undefined);
      setChetMap2([]);
      setEditUserInput([]);
    }
  };

  const MAX_COUNT = 20;

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
      <Modal
        title="Edit Chit Details"
        open={isModalVisible}
        onCancel={handleCancel}
        width="900px"
        footer={[,]}
      >
        {editMode && (
          <div className="grid grid-cols-1 xs:grid-cols-2 justify-items-center lg:flex justify-center gap-4  p-5">
            <Select
              placeholder="Select Company"
              className="lg:w-48 w-full"
              onChange={handleEditChange}
              value={editCompanyInput}
            >
              {editCompany.length > 0
                ? editCompany.map((item, ind) => (
                    <Option value={ind} key={ind}>
                      {item.companyName}
                    </Option>
                  ))
                : null}
            </Select>

            <Select
              placeholder="Select Chit"
              className="lg:w-48 w-full"
              onChange={editChithandleChange}
              value={editChitInput}
            >
              {
                // eslint-disable-next-line no-unused-vars
                editChit.map((item, ind) => (
                  // eslint-disable-next-line react/jsx-key
                  <Option value={item._id} key={ind}>
                    {item.chitName}
                  </Option>
                ))
              }
            </Select>

            <Select
              className=" lg:w-48 w-full"
              placeholder="Select Group"
              onChange={editGrouphandleChange}
              value={editGroupInput}
            >
              {editGroups &&
                editGroups.map((item, ind) => (
                  <Option value={item._id} key={ind}>
                    {item.group}
                  </Option>
                ))}
            </Select>

            <Select
              className="placeholder:text-black lg:w-48 w-full"
              mode="multiple"
              placeholder="Select Users"
              onChange={editHandleSelectChange}
              value={editUserInput}
              maxCount={MAX_COUNT}
              disabled={chitCount > MAX_COUNT}
              // options={editChitUsers}
              filterOption={(input, option) => {
                const { label, name } = option.props; // Destructure label and name from option.props
                return (
                  typeof option.children === "string" &&
                  option.children.toLowerCase().includes(input.toLowerCase())
                  // (typeof option.children === "string" &&
                  // option.children.toLowerCase().includes(input.toLowerCase()))
                );
                // console.log(option.children);
              }}
            >
              {editChitUsers.map((user, ind) => (
                <Option key={ind} value={user.value}>
                  {user.label}
                </Option>
              ))}
            </Select>
            <button
              className="cursor-pointer transition-all bg-[#176B87] text-white w-28 h-[35px] rounded-lg border-[#15414e] border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]"
              onClick={getusersforEdit}
            >
              Edit Chit
            </button>
          </div>
        )}
      </Modal>
      <div className="grid grid-cols-1 xs:grid-cols-2 justify-items-center lg:flex justify-center gap-4  p-5">
        <Select
          placeholder="Select Company"
          className="lg:w-48 w-full"
          onChange={handleChange}
          value={companyInput}
        >
          {company.length > 0
            ? company.map((item, ind) => (
                <Option value={ind} key={ind}>
                  {item.companyName}
                </Option>
              ))
            : null}
        </Select>
        <Select
          placeholder="Select Chit"
          className="lg:w-48 w-full"
          onChange={chithandleChange}
          value={chitInput}
        >
          {chit.map((item, ind) => (
            <Option value={item._id} key={ind}>
              {item.chitName}
            </Option>
          ))}
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
                <Option value={item._id} key={ind}>
                  {item.group}
                </Option>
              ))
          }
        </Select>
        <Select
          className="placeholder:text-black lg:w-48 w-full"
          mode="multiple"
          placeholder="Select Users"
          onChange={handleSelectChange}
          maxCount={MAX_COUNT}
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
            <Option value={ind} key={ind}>
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
        <button
          className="cursor-pointer transition-all bg-[#176B87] text-white w-28 h-[35px] rounded-lg border-[#15414e] border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]"
          onClick={handleClear}
        >
          Clear
        </button>
      </div>
      <div className="w-[95%] m-auto flex flex-col gap-3">
        {getchitmaps.map((data, ind) => (
          <div
            className="w-full rounded-md bg-[#f7ffff] p-2 drop-shadow-md cursor-pointer"
            key={ind}
          >
            <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-2 lg:grid-cols-6 xl:grid-cols-6 bg-white p-2 rounded cursor-pointer">
              <section className="flex flex-col">
                <Link
                  to={"/homepage/chitmapping/chitmapdetails?id=" + data._id}
                >
                  <p className="font-bold">{data.chitName}</p>
                  <p>{data.createdAt}</p>
                </Link>
              </section>
              <Link to={"/homepage/chitmapping/chitmapdetails?id=" + data._id}>
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
              </Link>
              <Link to={"/homepage/chitmapping/chitmapdetails?id=" + data._id}>
                <section className="">
                  <p className="font-bold">Amount</p>
                  <p>
                    <CurrencyComponent amount={data.chitAmount} />
                  </p>
                </section>
              </Link>
              <Link to={"/homepage/chitmapping/chitmapdetails?id=" + data._id}>
                <section className="">
                  <p className="font-bold">Group</p>
                  <p>{data.group}</p>
                </section>
              </Link>
              <Link to={"/homepage/chitmapping/chitmapdetails?id=" + data._id}>
                <section className="">
                  <p className="font-bold">Months</p>
                  <p>{data.months}</p>
                </section>
              </Link>

              <section className=" flex gap-2">
                <FaEdit
                  className="size-5 cursor-pointer"
                  onClick={() => chengeEdit(data._id)}
                  color="#176b87"
                />
                <MdDeleteForever
                  className="size-6 cursor-pointer"
                  onClick={() => showModal(data)}
                  color="#dc2626"
                />
              </section>
            </div>
          </div>
        ))}
      </div>

      {/* drawer */}
      <div>
        <Drawer
          title={
            editDrawer
              ? "Total Chits " + chitCount2
              : "Total Chits " + chitCount
          }
          onClose={onClose}
          open={open}
        >
          {editDrawer ? (
            <>
              {chitmap2?.map((e) => (
                <>
                  <div className="w-full flex space-y-2 items-center">
                    <label className="w-[90%]">{e.name}</label>
                    <button
                      onClick={() => {
                        e.chit > 1 ? chitChangereduce(e.value) : null;
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
                        chitChange(e.value);
                      }}
                      className="bg-[#176B87] w-6 text-white"
                    >
                      +
                    </button>
                  </div>
                </>
              ))}
            </>
          ) : (
            <>
              {chitmap?.map((e) => (
                <>
                  <div className="w-full flex space-y-2 items-center">
                    <label className="w-[90%]">{e.name}</label>
                    <button
                      onClick={() => {
                        e.chit > 1 ? chitChangereduce(e.id) : null;
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
                        chitChange(e.id);
                      }}
                      className="bg-[#176B87] w-6 text-white"
                    >
                      +
                    </button>
                  </div>
                </>
              ))}
            </>
          )}

          <div className="flex justify-center mt-8">
            <button
              className="cursor-pointer transition-all bg-[#176B87] text-white w-28 h-[35px] rounded-lg border-[#15414e] border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]"
              onClick={submitMapping}
            >
              Submit
            </button>
          </div>
        </Drawer>
      </div>

      <Modal
        footer={null}
        title={
          <div
            style={{
              width: "90%",
              cursor: "move",
              color: "red",
              textAlign: "center",
              fontSize: 16,
            }}
            onMouseOver={() => {
              if (disabled) {
                setDisabled(false);
              }
            }}
            onMouseOut={() => {
              setDisabled(true);
            }}
            onFocus={() => {}}
            onBlur={() => {}}
            // end
          >
            Are you sure you want to delete {deleteChit.chitName}chit, &{" "}
            {deleteChit.group} group?
          </div>
        }
        open={opennew}
        onCancel={handleCancelnew}
        modalRender={(modal) => (
          <Draggable
            disabled={disabled}
            bounds={bounds}
            nodeRef={draggleRef}
            onStart={(event, uiData) => onStart(event, uiData)}
          >
            <div ref={draggleRef}>{modal}</div>
          </Draggable>
        )}
      >
        <p className="text-center text-lg mt-2">
          This action is irreversible, and once deleted, the Chit Group cannot
          be recovered. Please confirm your decision.
        </p>

        <div className="flex gap-4 justify-end mt-3">
          <button
            className="border-2 border-green-500 p-1 rounded-md"
            onClick={handleCancelnew}
          >
            Cancel
          </button>
          <button
            className="border-2 border-red-500 p-1 rounded-md hover:bg-red-400 hover:text-white"
            onClick={() => {
              deleteChitGroupByGroupId();
            }}
          >
            Delete
          </button>
        </div>
      </Modal>
    </>
  );
}

export default ChitMapping;
