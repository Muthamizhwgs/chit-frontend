import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import DataTable from "react-data-table-component";
import { useFormik } from "formik";
import { AdminSchema, AdminInitValues } from "../../validations/admin";
import { EditAdminForSuperAdmin, createUsers, getAdminForSuperAdmin } from "../../services/service";
import Loader from "../utils/loader";
import {  FaEdit, } from "react-icons/fa";
import { MdDelete } from "react-icons/md"
const Admin = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loader, setLoader] = useState(false);
  const [admins, setAdmins] = useState([]);
  const [id, setId] = useState("");
  const [edit, setEdit] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    forms.resetForm();
  };
  const forms = useFormik({
    initialValues: AdminInitValues,
    validationSchema: AdminSchema,
    onSubmit: (values) => {
      edit ? EditForms(values) : submitForms(values);
    },
  });
  const submitForms = async (value) => {
    setLoader(true);
    try {
      let serverData = { ...value, ...{ role: 'admin' } }
      let val = await createUsers(serverData);
      console.log(val);
      handleCancel();
      getAdmins()
      forms.resetForm();
    } catch (error) {
    } finally {
      setLoader(false);
    }
  };

  const getAdmins = async () => {
    setLoader(true);
    try {
      let val = await getAdminForSuperAdmin();
      setAdmins(val.data);
    } catch (error) {
      console.log(error.response.status);
      if (error.response.status == 401) {
        localStorage.removeItem("chits");
        localStorage.removeItem("chitsRole");
        navigate("/");
      }
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    getAdmins();
  }, []);
  const handleEdit = (data) => {
    AdminInitValues.name = data.name;
    AdminInitValues.phoneNumber = data.phoneNumber;
    AdminInitValues.address = data.address;
    setId(data._id);
    setEdit(true);
    setIsModalOpen(true);
    console.log(data);
  };

  const EditForms = async (values) => {
    setLoader(true);
    try {
      let val = await EditAdminForSuperAdmin(id, values);
      console.log(val);
      getAdmins();
      handleCancel();
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  };

  const columns = [
    {
      name: <h1 className="text-lg text-gray-500">S.No</h1>,
      selector: (row, ind) => ind + 1,
    },
    {
      name: <h1 className="text-lg text-gray-500">Name</h1>,
      selector: (row) => row.name,
    },
    {
      name: <h1 className="text-lg text-gray-500">Phone number</h1>,
      selector: (row) => row.phoneNumber,
    },
    {
      name: <h1 className="text-lg text-gray-500">Address</h1>,
      selector: (row) => row.address,
    },
    {
      name: (
        <h1 className="text-lg text-gray-500">
          Actions
        </h1>
      ),
      selector: (row) => row.actions,
      cell: (row) => (
        <>
          <>
            <FaEdit className='size-5 cursor-pointer' onClick={handleEdit} /><span className='ml-2'>{row.id}</span>
            <MdDelete className='size-5 cursor-pointer' /><span className='ml-2'>{row.id}</span>
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
        paddingLeft: "10px", // override the cell padding for data cells
        paddingRight: "10px",
        fontSize: "16px",
        color: "#364353",
      },
    },
  };
  return (
    <div>
      {loader ? <Loader /> : null}
      <div className="flex justify-between max-w-[95%] pt-5">
        <div></div>
        <div className="text-xl">Manage Admins</div>
        <div className="">
          <button
            onClick={showModal}
            className=" bg-[#176B87] flex justify-center items-center text-white w-28 gap-1 rounded-md h-8"
          >
            {/* <FaPlus className='text-white size-4' /> */}
            Add Admin
          </button>
        </div>
      </div>
      <div className="px-10 pt-10 rounded-md">
        <DataTable columns={columns} data={admins} fixedHeader customStyles={customStyles} pagination />
      </div>
      <div>
        <Modal
          title="Add Admin"
          height={"260px"}
          open={isModalOpen}
          onCancel={handleCancel}
          footer={null}
        >
          <div className="flex flex-col justify-center">
            <div className="flex flex-col mb-4">
              <label className="pl-4"> Name</label>
              <input
                type="text"
                placeholder="Enter Name"
                className="h-10 pl-3 border drop-shadow-lg w-[93%] hover:focus-within:outline-none rounded-md ml-3"
                name="name"
                id="name"
                onBlur={forms.handleBlur}
                value={forms.values.name}
                onChange={forms.handleChange}
              />
            </div>
            {forms.errors.name && forms.touched.name ? (
              <div style={{ width: "100%", color: "red", paddingLeft: "15px" }}>
                {forms.errors.name}
              </div>
            ) : null}

            <div className="flex flex-col mb-4">
              <label className="pl-4"> Mobile number</label>
              <input
                type="text"
                placeholder="Enter Mobile number"
                className="h-10 pl-3 border drop-shadow-lg w-[93%] hover:focus-within:outline-none rounded-md ml-3"
                name="phoneNumber"
                id="phoneNumber"
                onBlur={forms.handleBlur}
                value={forms.values.phoneNumber}
                onChange={forms.handleChange}
              />
            </div>
            {forms.errors.phoneNumber && forms.touched.phoneNumber ? (
              <div style={{ width: "100%", color: "red", paddingLeft: "15px" }}>
                {forms.errors.phoneNumber}
              </div>
            ) : null}

            <div className="flex flex-col mb-4">
              <label className="pl-4"> Address</label>
              <input
                type="text"
                placeholder="Enter Address"
                className="h-10 pl-3 border drop-shadow-lg w-[93%] hover:focus-within:outline-none rounded-md ml-3"
                name="address"
                id="address"
                onBlur={forms.handleBlur}
                value={forms.values.address}
                onChange={forms.handleChange}
              />
            </div>
            {forms.errors.address && forms.touched.address ? (
              <div style={{ width: "100%", color: "red", paddingLeft: "15px" }}>
                {forms.errors.address}
              </div>
            ) : null}

            <div className="flex justify-center">
              <button
                className="bg-[#176B87] w-36 h-[35px] text-white font-bold rounded-md"
                onClick={forms.handleSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Admin;
