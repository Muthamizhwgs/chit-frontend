// eslint-disable-next-line no-unused-vars
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Modal, Select } from "antd";
import { CompanySchema, CompanyinitValue } from "../../validations/company";
import {
  getChitUsers,
  UpdateChituserById,
  UpdateChitcompanyById,
  getChitCompany,
} from "../../services/service";
import { useFormik } from "formik";
import DataTable from "react-data-table-component";
import CurrencyComponent from "../utils/currency";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import {
  companyCreation,
  getAllCompany,
  editCompany,
} from "../../services/service";
import Loader from "../utils/loader";
import { Switch } from "antd";

const Company = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [loader, setLoader] = React.useState(false);
  const [chits, Setchits] = React.useState([]);
  const [id, setId] = React.useState("");
  const [edit, setEdit] = React.useState(false);
  const [err, setErr] = React.useState("");

  const showModal = () => {
    setIsModalOpen(true);
  };
  const forms = useFormik({
    initialValues: CompanyinitValue,
    validationSchema: CompanySchema,
    onSubmit: (values) => {
      edit == false ? submitCompanyCreation(values) : EditSubmit(values);
    },
  });

  const handleCancel = () => {
    setIsModalOpen(false);
    forms.values.commission = "";
    forms.values.companyName = "";
    forms.values.auctionDates = "";
    setEdit(false);
    forms.resetForm();
  };

  const submitCompanyCreation = async (val) => {
    setLoader(true);
    try {
      let creation = await companyCreation(val);
      console.log(creation.data);
      fetchChits()
      handleCancel();
    } catch (error) {
      if (error.response.status == 401) {
        navigate("/");
      }
    } finally {
      setLoader(false);
    }
  };

  const fetchChits = async () => {
    setLoader(true);
    try {
      let val = await getAllCompany();
      Setchits(val.data);
    } catch (error) {
      if (error.response.status == 401) {
        navigate("/");
      }
    } finally {
      setLoader(false);
    }
  };

  const changeEdit = async (data) => {
    setId(data._id);
    (forms.values.commission = data.commission),
      (forms.values.companyName = data.companyName);
    (forms.values.auctionDates = data.auctionDates);
    showModal();
    setEdit(true);
  };

  const EditSubmit = async (values) => {
    setLoader(true);
    try {
      let editResponse = await editCompany(id, values);
      console.log(editResponse, "edted response");
      setEdit(false);
      fetchChits();
      handleCancel();
    } catch (error) {
      if (error.response.status == 401) {
        navigate("/");
      }
    } finally {
      setLoader(false);
    }
  };

  // const Disable = async (values) => {
  //   setId(values._id)
  //   console.log(values,"values")
  //   setLoader(true);
  //   try {
  //     let serverData;
  //     if (values.active == true) {
  //       serverData = false;
  //     } else {
  //       serverData = true;
  //     }
  //     let data = { active: serverData };
  //     let editResponse = await editCompany(id, data);
  //     console.log(editResponse, "edted response");
  //     setEdit(false);
  //     fetchChits();
  //     handleCancel();
  //   } catch (error) {
  //     if (error.response.status == 401) {
  //       navigate("/");
  //     }
  //   } finally {
  //     setLoader(false);
  //   }
  // };

  React.useEffect(() => {
    fetchChits();
  }, []);

  const getChit = async () => {
    setLoader(true);
    try {
      let values = await getChitCompany();

      // eslint-disable-next-line no-empty
    } catch (error) {
      console.log(error.response.status);
      if (error.response.status == 401) {
        navigate("/");
      }
    } finally {
      setLoader(false);
    }
  };

  const Active_Inactive = async (Id, data) => {
    let active;
    if (data.active == true) {
      active = false;
    } else {
      active = true;
    }
    try {
      await UpdateChitcompanyById(Id, { active: active });
      getChit();
    } catch (error) {
      if (error.response.status == 401) {
        navigate("/");
      }
    }
  };

  const columns = [
    {
      name: <h1 className="text-lg text-gray-500">S.No</h1>,
      selector: (row, ind) => ind + 1,
    },
    {
      name: <h1 className="text-lg text-gray-500">Company Name</h1>,
      selector: (row) => row.companyName,
      sortable: true,
    },
    {
      name: <h1 className="text-lg text-gray-500">Commission</h1>,
      selector: (row) => row.commission + "%",
    },
    // {
    //   name: <h1 className="text-lg text-gray-500">Status</h1>,
    //   selector: (row) => (
    //     <>
    //       <div className="flex flex-row items-center ">
    //         <Switch
    //           checkedChildren={``}
    //           unCheckedChildren={``}
    //           onChange={() => Active_Inactive(row._id,row)}
    //           defaultChecked={row.active}
    //           className={
    //             row.active
    //               ? "custom-switch-checked"
    //               : "custom-switch-unchecked"
    //           }
    //         />
    //       </div>
    //     </>
    //   ),
    // },
    {
      name: <h1 className="text-lg text-gray-500">Action</h1>,
      selector: (row) => row.reference,
      cell: (row) => (
        <>
          <>
            <FaEdit
              className="size-5 cursor-pointer"
              onClick={() => {
                changeEdit(row);
              }}
              color="#176b87"
            />
            <span className="ml-2">{row.id}</span>
            <span className="ml-2">{row.id}</span>
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

  const handleChange = () => { };

  return (
    <>
      {loader ? <Loader /> : null}
      <div>
        <div className="flex xs:flex-row flex-col xs:justify-between items-center gap-3 xs:gap-0 max-w-[95%] py-5 font-bold">
          <div></div>
          <div className="text-xl xs:py-5">Company Creation</div>
          <div className="xs:pb-0 pb-5">
            {/* <button
              onClick={showModal}
              className=" bg-[#176B87] hover:scale-105 transition-all duration-300  flex justify-center items-center text-white w-36 gap-1 rounded-md h-9 xs:text-base text-sm"
            >
              
              Add Company
            </button> */}
            <button class="cursor-pointer transition-all w-36 h-9 bg-[#176B87] text-white rounded-lg border-[#15414e] border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px]
               active:border-b-[2px] active:brightness-90 active:translate-y-[2px] flex justify-center items-center gap-2"
              onClick={showModal}
            >
              <FaPlus className="text-white size-2.5" />
              Add Company
            </button>
          </div>
        </div>
        <div className="px-5">
          <DataTable
            columns={columns}
            customStyles={customStyles}
            data={chits}
            fixedHeader
            pagination
          />
        </div>
      </div>
      <div>
        <Modal
          title="Add Company"
          height={"260px"}
          open={isModalOpen}
          onCancel={handleCancel}
          footer={null}
        >
          <div className="flex flex-col justify-center">
            <div className="flex flex-col mb-4">
              <label className="pl-4"> Company Name :</label>
              <input
                type="text"
                placeholder="Enter Company Name"
                className="h-10 pl-3 border drop-shadow-lg w-[93%] hover:focus-within:outline-none rounded-md ml-3"
                name="companyName"
                id="companyName"
                onBlur={forms.handleBlur}
                value={forms.values.companyName}
                onChange={forms.handleChange}
              />
              {forms.errors.companyName && forms.touched.companyName ? (
                <div
                  style={{ width: "100%", color: "red", paddingLeft: "15px" }}
                >
                  {forms.errors.companyName}
                </div>
              ) : null}
            </div>

            <div className="flex flex-col mb-4">
              <label className="pl-4"> Commission: % </label>
              <input
                type="number"
                placeholder="Commission"
                className="h-10 pl-3 border drop-shadow-lg w-[93%] hover:focus-within:outline-none rounded-md ml-3"
                name="commission"
                id="commission"
                onBlur={forms.handleBlur}
                value={forms.values.commission}
                onChange={forms.handleChange}
              />
              {forms.errors.commission && forms.touched.commission ? (
                <div
                  style={{ width: "100%", color: "red", paddingLeft: "15px" }}
                >
                  {forms.errors.commission}
                </div>
              ) : null}
            </div>
            <div className="flex flex-col mb-4">
              <label className="pl-4">Auction Date :</label>
              <Select
                name="auctionDates"
                id="auctionDates"
                onBlur={forms.handleBlur}
                onChange={(e) => forms.setFieldValue("auctionDates", e)}
                value={forms.values.auctionDates || undefined}
                className="h-10 border drop-shadow-lg w-[93%] hover:focus-within:outline-none rounded-md ml-3"
                placeholder="Select Auction Date"
                options={[
                  // { value: '', label: "Select Auction Date" },
                  { value: "5", label: "Every month 5th " },
                  { value: "second sunday", label: "Second Sunday" },
                ]}
              />

              {forms.errors.auctionDates && forms.touched.auctionDates ? (
                <div
                  style={{ width: "100%", color: "red", paddingLeft: "15px" }}
                >
                  {forms.errors.auctionDates}
                </div>
              ) : null}
            </div>
            <div className="flex justify-center">
              {/* <button
                className="bg-[#176B87] w-36 h-[35px] text-white font-bold rounded-md hover:scale-105 transition-all duration-300"
              >
                Submit
              </button> */}
              <button className="cursor-pointer transition-all w-36 h-[35px] bg-[#176B87] text-white rounded-lg border-[#15414e] border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px]
               active:border-b-[2px] active:brightness-90 active:translate-y-[2px]"
                onClick={forms.handleSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default Company;
