import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Breadcrumbs from "../utils/Breadcrumbs";
import { Modal, Select, Radio, Tag } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Flex, Input, theme, Tooltip } from "antd";
import { FaEdit } from "react-icons/fa";
const tagInputStyle = {
  width: 64,
  height: 32,
  marginInlineEnd: 8,
  verticalAlign: "top",
};
import {
  ChitMasterSchema,
  ChitMasterinitValue,
} from "../../validations/chitMaster";
import { useFormik } from "formik";
import { AddChit, getChits, getAllCompany } from "../../services/service";
import DataTable from "react-data-table-component";
import DateFormat from "../date";
import EmtyPage from "../../../public/emptypage.png";
import CurrencyComponent from "../utils/currency";
import Loader from "../utils/loader";

function ChitMaster() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isGroupOpen, setIsGroupOpen] = React.useState(false);
  const [err, setErr] = React.useState("");
  const [chits, setChits] = React.useState([]);
  const [companies, setCompanies] = React.useState([]);

  const [loader, setLoader] = React.useState(false);
  const [companyId, setCompanyId] = React.useState("");
  const [companyAuctionDate, setCompanyAuctionDate] = React.useState("");
  const [edit, setEdit] = React.useState(false);
  const [id, setId] = React.useState("");

  console.log("row id", id);

  const handleInit = () => {
    forms.values.chitAmount = "";
    forms.values.chitName = "";
    forms.values.companyId = "";
    forms.values.companyName = "";
    forms.values.describeDate = "";
    forms.values.group = "";
    forms.values.months = "";
    forms.values.noOfPeople = "";
    setCompanyAuctionDate("");
    forms.resetForm();
    setInputValue("");
  };

  const showModal = () => {
    setIsModalOpen(true);
    handleInit();
  };

  let navigate = useNavigate();

  const forms = useFormik({
    initialValues: ChitMasterinitValue,
    validationSchema: ChitMasterSchema,
    onSubmit: (values) => {
      edit ? EditSubmit(values) : submitForms(values);
    },
  });
  const showAddgroup = () => {
    var size = Object.keys(forms.errors).length;
    if (size > 0) {
      console.log(size);
    } else {
      setIsModalOpen(false);
      setIsGroupOpen(true);
    }
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setIsGroupOpen(false);
    forms.values.chitAmount = "";
    forms.values.chitName = "";
    forms.values.companyId = "";
    forms.values.companyName = "";
    forms.values.describeDate = "";
    forms.values.group = "";
    forms.values.months = "";
    forms.values.noOfPeople = "";
    setCompanyAuctionDate("");
    forms.resetForm();
  };

  const submitForms = async (value) => {
    let datas = { ...value, ...{ groups: tags, companyName: forms.values.companyName, describeDate: forms.values.describeDate } }; 
    console.log(datas, "asdasd");
    setLoader(true);
    try {
      await AddChit(datas);
      getChit();
      handleCancel();
      setErr(null);
    } catch (error) {
      setErr(error.response.data.message);
      if (error.response.status == 401) {
        navigate("/");
      }
    } finally {
      setLoader(false);
    }
  };
  

  const getChit = async () => {
    setLoader(true);
    try {
      let values = await getChits();
      setChits(values.data);
    } catch (error) {
    } finally {
      setLoader(false);
    }
  };

  const getCompanies = async () => {
    setLoader(true);
    try {
      let values = await getAllCompany();
      setCompanies(values.data);
    } catch (error) {
      if (error.response.status == 401) {
        navigate("/");
      }
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    const reloaded = sessionStorage.getItem("reloaded");
    if (!reloaded) {
      sessionStorage.setItem("reloaded", "true");
      window.location.reload();
    }
  }, []);

  const chengeEdit = (rowData) => {
    const {
      _id,
      chitName,
      chitAmount,
      months,
      noOfPeople,
      companyName,
      companyId,
      describeDate,
      totalGroup,
    } = rowData;

    forms.values.companyId = companyId;
    forms.values.companyName = companyName;
    forms.values.chitName = chitName;
    forms.values.chitAmount = chitAmount;
    forms.values.months = months;
    forms.values.noOfPeople = noOfPeople;
    forms.values.describeDate = describeDate;
    forms.values.totalGroup = totalGroup;

    const selectedCompany = companies.find(
      (company) => company.companyName === companyName
    );
    if (selectedCompany) {
      AuctionDateMapping(selectedCompany._id);
    }

    setEdit(true);
    setIsModalOpen(true);
    setId(_id);
    setTags(totalGroup);
  };

  const EditSubmit = async (values) => {
    try {
      const updatedValues = {
        ...values,
        totalGroup: tags,
        newGroup: tags.filter(tag => !forms.values.totalGroup.includes(tag))
      };
  
      let val = await UpdateChituserById(updatedValues);
      console.log(val, "response");
      getChit();
      handleCancel();
    } catch (error) {
      if (error.response.status == 401) {
        navigate("/");
      }
    }
  };
  
  

  const UpdateChituserById = async (values) => {
    try {
      const response = await fetch(`http://localhost:3000/api/chits/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Failed to update chit data");
      }

      return response.json();
    } catch (error) {
      throw error;
    }
  };

  const columns = [
    {
      name: <h1 className="text-lg text-gray-500">S.No</h1>,
      selector: (row, ind) => ind + 1,
    },
    // {
    //   name: <h1 className="text-lg  text-gray-500">Company</h1>,
    //   selector: (row) => row.companyName,
    // },
    {
      name: <h1 className="text-lg text-gray-500">Chit Name</h1>,
      selector: (row) => row.chitName,
      sortable: true,
    },
    {
      name: <h1 className="text-lg text-gray-500">Chit Amount</h1>,
      selector: (row) => <CurrencyComponent amount={row.chitAmount} />,
    },
    {
      name: <h1 className="text-lg text-gray-500">Commission</h1>,
      selector: (row) => <CurrencyComponent amount={row.serviceCharges} />,
    },
    {
      name: <h1 className="text-lg text-gray-500"> No Of Groups</h1>,
      selector: (row) => row.groups,
    },
    {
      name: <h1 className="text-lg text-gray-500">Auction Date</h1>,
      cell: (row) => <DateFormat date={row.createdAt} />,
    },
    {
      name: <h1 className="text-lg text-gray-500">Action</h1>,
      cell: (row) => (
        <>
          <>
            <FaEdit
              className="size-5 cursor-pointer"
              onClick={() => chengeEdit(row)}
              color="#176b87"
            />

            {/* <span className="ml-2">{row.id}</span> */}
          </>
        </>
      ),
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
        paddingLeft: "8px", // override the cell padding for data cells
        paddingRight: "8px",
        fontSize: "16px",
        color: "#364353",
      },
    },
  };

  const AuctionDateMapping = async (id) => {
    console.log(id, "iddddd");
    let findIndex = companies.findIndex((e) => {
      return e._id == id;
    });
    setCompanyAuctionDate(`Every Month ${companies[findIndex].auctionDates}`);
    forms.setFieldValue("describeDate", companies[findIndex].auctionDates);
  };

  useEffect(() => {
    getChit();
    getCompanies();
    // const result =
    //   chits &&
    //   chits.filter((value) => {
    //     return value.group.match(group);
    //   });
    // setFilteredData(result);
  }, []);

  const location = useLocation();
  const pathname = location.pathname;
  const paths = pathname.split("/").filter((path) => path);

  // for add group
  const { token } = theme.useToken();
  const [tags, setTags] = useState([]);

  console.log(tags);
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [editInputIndex, setEditInputIndex] = useState(-1);
  const [editInputValue, setEditInputValue] = useState("");
  const inputRef = useRef(null);
  const editInputRef = useRef(null);
  useEffect(() => {
    if (inputVisible) {
      inputRef.current?.focus();
    }
  }, [inputVisible]);
  useEffect(() => {
    editInputRef.current?.focus();
  }, [editInputValue]);
  const handleClose = (removedTag) => {
    const newTags = tags.filter((tag) => tag !== removedTag);
    console.log(newTags);
    setTags(newTags);
  };
  const showInput = () => {
    setInputVisible(true);
  };
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  const handleInputConfirm = () => {
    if (inputValue && !tags.includes(inputValue)) {
      setTags([...tags, inputValue]);
    }
    setInputVisible(true);
    setInputValue("");
  };
  const handleInputConfirm1 = () => {
    if (inputValue && !tags.includes(inputValue)) {
      setTags([...tags, inputValue]);
    }
    setInputVisible(false);
    setInputValue("");
  };
  const handleEditInputChange = (e) => {
    setEditInputValue(e.target.value);
  };
  const handleEditInputConfirm = () => {
    const newTags = [...tags];
    newTags[editInputIndex] = editInputValue;
    setTags(newTags);
    setEditInputIndex(-1);
    setEditInputValue("");
  };
  const tagPlusStyle = {
    height: 32,
    background: token.colorBgContainer,
    borderStyle: "dashed",
  };

  return (
    <>
      {loader ? <Loader data={loader} /> : null}
      <div>
        <div className="flex xs:flex-row flex-col xs:justify-between items-center gap-3 xs:gap-0 max-w-[95%] py-5 font-bold">
          <div></div>
          <div className="text-xl">Chit Master</div>
          <div className="">
            {/* <button
              onClick={showModal}
              className=" bg-[#176B87] flex justify-center items-center text-white w-28 gap-1 rounded-md h-8 xs:text-base text-sm"
            >
              New Chit
            </button> */}
            <button
              className="cursor-pointer transition-all bg-[#176B87] text-white w-28 h-[35px] rounded-lg border-[#15414e] border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]"
              onClick={showModal}
            >
              New Chit
            </button>
          </div>
        </div>

        {chits.length > 0 ? (
          <div className="w-[95%] m-auto mt-5 h-[75vh] overflow-auto">
            <DataTable
              columns={columns}
              data={chits}
              fixedHeader
              pagination
              customStyles={customStyles}
            />
          </div>
        ) : (
          <div className="w-[95%] m-auto h-[88vh]">
            <img src={EmtyPage} alt="" className="w-[80%] h-full m-auto" />
          </div>
        )}
      </div>

      {/* Models */}
      <div>
        <Modal
          title="Add Chits"
          height={"260px"}
          open={isModalOpen}
          onCancel={handleCancel}
          footer={null}
        >
          <div className="flex flex-col justify-center">
            <div className="flex flex-col mb-4">
              <label className="pl-4">Company :</label>
              <Select
                name="companyId"
                id="companyId"
                onBlur={forms.handleBlur}
                onChange={(value) => {
                  forms.setFieldValue("companyId", value);
                  AuctionDateMapping(value);
                }}
                className="h-10 border drop-shadow-lg w-[93%] hover:focus-within:outline-none rounded-md ml-3"
                placeholder="Select Company"
                value={forms.values.companyId || undefined}
                options={
                  companies &&
                  companies.map((e) => ({ value: e._id, label: e.companyName }))
                }
              />
              {forms.errors.companyId && forms.touched.companyId ? (
                <div
                  style={{ width: "100%", color: "red", paddingLeft: "15px" }}
                >
                  {forms.errors.companyId}
                </div>
              ) : null}
              {err ? (
                <div
                  style={{ width: "100%", color: "red", paddingLeft: "15px" }}
                >
                  {err}
                </div>
              ) : null}
            </div>

            <div className="flex flex-col mb-4">
              <label className="pl-4"> Chit Name :</label>
              <input
                type="text"
                placeholder="Enter Chit Name"
                className="h-10 pl-3 border drop-shadow-lg w-[93%] hover:focus-within:outline-none rounded-md ml-3"
                name="chitName"
                id="chitName"
                onBlur={forms.handleBlur}
                value={forms.values.chitName}
                onChange={forms.handleChange}
              />
              {forms.errors.chitName && forms.touched.chitName ? (
                <div
                  style={{ width: "100%", color: "red", paddingLeft: "15px" }}
                >
                  {forms.errors.chitName}
                </div>
              ) : null}
            </div>

            <div className="flex flex-col mb-4">
              <label className="pl-4"> Chit Amount :</label>
              <input
                type="number"
                placeholder="Enter Chit Amount"
                className="h-10 pl-3 border drop-shadow-lg w-[93%] hover:focus-within:outline-none rounded-md ml-3"
                name="chitAmount"
                id="chitAmount"
                onBlur={forms.handleBlur}
                value={forms.values.chitAmount}
                onChange={forms.handleChange}
              />
              {forms.errors.chitAmount && forms.touched.chitAmount ? (
                <div
                  style={{ width: "100%", color: "red", paddingLeft: "15px" }}
                >
                  {forms.errors.chitAmount}
                </div>
              ) : null}
            </div>

            <div className="flex flex-col mb-4">
              <label className="pl-4">20 months Auctions:</label>
              <Radio.Group
                onChange={(e) => forms.setFieldValue("months", e.target.value)}
                value={forms.values.months}
                className="pl-5 flex gap-2"
                defaultValue={true}
              >
                <Radio value={20} className="flex items-center">
                  Yes
                </Radio>
                <Radio value={19} className="flex items-center">
                  No
                </Radio>
              </Radio.Group>
              {forms.errors.months && forms.touched.months ? (
                <div
                  style={{ width: "100%", color: "red", paddingLeft: "15px" }}
                >
                  {forms.errors.months}
                </div>
              ) : null}
            </div>

            <div className="flex flex-col mb-4">
              <label className="pl-4"> No of Peoples :</label>
              <input
                type="number"
                placeholder="Enter no of Peoples"
                className="h-10 pl-3 border drop-shadow-lg w-[93%] hover:focus-within:outline-none rounded-md ml-3"
                name="noOfPeople"
                id="noOfPeople"
                onBlur={forms.handleBlur}
                value={forms.values.noOfPeople}
                onChange={forms.handleChange}
              />
              {forms.errors.noOfPeople && forms.touched.noOfPeople ? (
                <div
                  style={{ width: "100%", color: "red", paddingLeft: "15px" }}
                >
                  {forms.errors.noOfPeople}
                </div>
              ) : null}
            </div>

            <div className="flex flex-col mb-4">
              <label className="pl-4">Auction Date :</label>
              <input
                type="text"
                placeholder="Enter Auction Date"
                className="h-10 pl-3 border drop-shadow-lg w-[93%] hover:focus-within:outline-none rounded-md ml-3"
                readOnly
                value={companyAuctionDate}
              />
            </div>

            <div className="flex justify-center">
              {/* <button
                className="bg-[#176B87] w-36 h-[35px] text-white font-bold rounded-md"
                onClick={forms.handleSubmit}
              >
                Submit
              </button> */}
              <button
                className="cursor-pointer transition-all bg-[#176B87] text-white w-28 h-[35px] rounded-lg border-[#15414e] border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]"
                onClick={showAddgroup}
              >
                Next
              </button>
            </div>
          </div>
        </Modal>
      </div>
      <div>
        <Modal
          title="Add Groups"
          height={"260px"}
          open={isGroupOpen}
          onCancel={handleCancel}
          footer={null}
        >
          <div>
            <Flex gap="small" wrap="wrap" className="justify-center">
              {tags.map((tag, index) => {
                if (editInputIndex === index) {
                  return (
                    <Input
                      ref={editInputRef}
                      key={tag}
                      size="small"
                      style={tagInputStyle}
                      value={editInputValue}
                      onChange={handleEditInputChange}
                      onBlur={handleEditInputConfirm}
                      onPressEnter={handleEditInputConfirm}
                    />
                  );
                }
                const isLongTag = tag.length > 20;
                const tagElem = (
                  <Tag
                    className="flex justify-center items-center"
                    key={tag}
                    closable={true}
                    style={{
                      userSelect: "none",
                    }}
                    onClose={() => handleClose(tag)}
                  >
                    <span
                      className=""
                      onDoubleClick={(e) => {
                        if (index !== 0) {
                          setEditInputIndex(index);
                          setEditInputValue(tag);
                          e.preventDefault();
                        }
                      }}
                    >
                      {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                    </span>
                  </Tag>
                );
                return isLongTag ? (
                  <Tooltip title={tag} key={tag}>
                    {tagElem}
                  </Tooltip>
                ) : (
                  tagElem
                );
              })}
              {inputVisible ? (
                <Input
                  ref={inputRef}
                  type="text"
                  size="small"
                  style={tagInputStyle}
                  value={inputValue}
                  onChange={handleInputChange}
                  onBlur={handleInputConfirm}
                  onPressEnter={handleInputConfirm}
                />
              ) : (
                <Tag
                  style={tagPlusStyle}
                  icon={<PlusOutlined />}
                  onClick={showInput}
                  className="flex justify-center items-center font-medium"
                >
                  New Group
                </Tag>
              )}
            </Flex>
          </div>

          <div className="flex justify-center py-5">
            <button
              className="cursor-pointer transition-all bg-[#176B87] text-white w-28 h-[35px] rounded-lg border-[#15414e] border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]"
              onClick={forms.handleSubmit}
              type="button"
            >
              Submit
            </button>
          </div>
        </Modal>
      </div>
    </>
  );
}

export default ChitMaster;
