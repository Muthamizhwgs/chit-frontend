import React, { useEffect } from 'react';
import { Modal, Select } from 'antd';
import { CustomerSchema, CustomerInitValue } from '../../validations/customers';
import { useFormik } from 'formik';
import { createUsers, getChitUsers, UpdateChituserById, getUsersByAdmin } from "../../services/service"
import DataTable from "react-data-table-component";
import { FaEdit, FaSearch } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
// eslint-disable-next-line no-unused-vars
import DateFormat from '../../components/date';
import Loader from '../utils/loader';
import { useLocation, useNavigate } from 'react-router-dom';
import { Switch } from 'antd';

function Customers() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [err, setErr] = React.useState('');
  const [users, setUsers] = React.useState([]);
  // eslint-disable-next-line no-unused-vars
  const [filteredData, setFilteredData] = React.useState([]);
  // eslint-disable-next-line no-unused-vars
  const [searchTerm, setSearchTerm] = React.useState("");
  const [loader, setLoader] = React.useState(false);
  const [edit, setEdit] = React.useState(false);
  const [id, setId] = React.useState('');
  const [referenceUser, setReferenceUser] = React.useState([])
  const [status, setStatus] = React.useState(false);


  const navigate = useNavigate()


  const showModal = () => {
    setIsModalOpen(true);
  };


  const forms = useFormik({
    initialValues: CustomerInitValue,
    validationSchema: CustomerSchema,
    onSubmit: (values) => {
      edit ? EditSubmit(values) : submitForms(values)
    },
  })
  const handleCancel = () => {
    setIsModalOpen(false);
    forms.values.address = '',
      forms.values.name = '',
      forms.values.reference = '',
      forms.values.address = '',
      forms.values.phoneNumber = '',
      forms.resetForm()
    setEdit(false)
    setErr('')
  };

  const submitForms = async (value) => {
    setLoader(true)
    try {
      await createUsers({ ...value, ...{ role: "customer" } })
      handleCancel()
      getChit()
      getReferenceUSers();

      setEdit(false)

      setErr(null);
    } catch (error) {
      setErr(error.response.data.message);
    } finally {
      setLoader(false)
    }
  }

  const getChit = async () => {
    setLoader(true)
    try {
      let values = await getChitUsers();
      setUsers(values.data)
      // eslint-disable-next-line no-empty
    } catch (error) {
      console.log(error.response.status)
      if (error.response.status == 401) {
        navigate('/')
      }
    } finally {
      setLoader(false)
    }
  }

  const chengeEdit = (val) => {
    forms.values.name = val.name
    forms.values.address = val.address
    forms.values.phoneNumber = val.phoneNumber
    forms.values.reference = val.reference
    setEdit(true);
    setIsModalOpen(true);
  }

  const EditSubmit = async (values) => {
    console.log(values)
    try {
      let val = await UpdateChituserById(id, values)
      console.log(val, "response")
      getChit()
      handleCancel()

    } catch (error) {
      if (error.response.status == 401) {
        navigate('/')
      }
    }
  }

  const Active_Inactive = async (Id, data) => {
    let active;
    if (data.active == true) {
      active = false
    } else {
      active = true
    }
    try {
      let val = await UpdateChituserById(Id, { active: active })
      getChit()
    } catch (error) {
      if (error.response.status == 401) {
        navigate('/')
      }
    }
  }

  // const handleStatus = async (id, value) => {
  //   const newStatus = value ? 0 : 1;
  //   try {
  //     await axios
  //       .put(`${apiUrl}/collegebranchstatus/${id}`, {
  //         status: newStatus,
  //       })
  //       .then((res) => {
  //         if (res.status === 200) {
  //           toast.success(
  //             `User ${newStatus ? "activated" : "deactivated"} successfully`
  //           );
  //           setStatus(!status);
  //         }
  //       });
  //   } catch (error) {
  //     toast.error(error.message);
  //   }
  // };



  const chengeDelete = () => {

  }

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
          Name
        </h1>
      ),
      selector: (row) => row.name,
    },
    {
      name: (
        <h1 className="text-lg text-gray-500">
          Phone No
        </h1>
      ),
      selector: (row) => row.phoneNumber,
    },
    {
      name: (
        <h1 className="text-lg text-gray-500">
          Address
        </h1>
      ),
      selector: (row) => row.address,
    },
    {
      name: <h1 className="text-lg text-gray-500">Status</h1>,
      selector: (row) => (
        <>
          <div className="flex flex-row items-center ">
            <Switch
              checkedChildren={``}
              unCheckedChildren={``}
              onChange={() => Active_Inactive(row._id, row)}
              defaultChecked={row.active}
              className={
                row.active
                  ? "custom-switch-checked"
                  : "custom-switch-unchecked"
              }
            />
          </div>
        </>
      ),
      // width:"150px"
    },
    {
      name: (
        <h1 className="text-lg text-gray-500">
          Action
        </h1>
      ),
      selector: (row) => row.reference,
      cell: (row) => (
        <>

          <>
            <FaEdit className='size-5 cursor-pointer' onClick={() => { chengeEdit(row), setId(row._id) }} color='#176b87' /><span className='ml-2'>{row.id}</span>
            {/* <MdDelete className='size-5 cursor-pointer' onClick={chengeDelete} color='red'/><span className='ml-2'>{row.id}</span> */}
          </>
        </>
      ),
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
        paddingLeft: "8px", // override the cell padding for data cells
        paddingRight: "8px",
        fontSize: "16px",
        color: "#364353",
      },
    },
  };

  const getReferenceUSers = async () => {
    setLoader(true)
    try {
      let values = await getUsersByAdmin();
      setReferenceUser(values.data)
    } catch (error) {
      if (error.response.status == 401) {
        navigate('/')
      }
    } finally {
      setLoader(false)
    }
  }

  useEffect(() => {
    getChit();
    getReferenceUSers();
  }, [])


  console.log(forms.values);

  //for searchbar
  const handleSearch = (searchValue) => {
    setSearchTerm(searchValue);
    if (!searchValue) {
      setFilteredData([]);
      return;
    }
    const filteredResults = users.filter(user =>
      user.name.toLowerCase().includes(searchValue.toLowerCase()) ||
      user.phoneNumber.toString().includes(searchValue)
    );
    setFilteredData(filteredResults);
  };

  useEffect(() => {
    if (searchTerm === "") {
      setFilteredData(users);
    }
  }, [searchTerm, users]);

  // Update DataTable component to use filteredData if searchTerm is not empty
  const dataTableData = searchTerm ? filteredData : users;


  return (
    <>
      {loader ? <Loader data={loader} /> : null}
      <div>
        <div className='flex xs:justify-between flex-col xs:flex-row items-center gap-2 xs:gap-0 max-w-[95%] py-5'>
          <div></div>
          <div className='text-xl font-semibold'>
            Customers
          </div>
          <div className=''>
            <button onClick={showModal} className=' bg-[#176B87] hover:scale-105 transition-all duration-300 flex justify-center items-center text-white w-32 gap-1 rounded-md h-10 xs:text-base text-sm'>
              {/* <FaPlus className='text-white size-4' /> */}
              Add customers
            </button>
          </div>
        </div>

        <div className='w-[95%] m-auto xs:block flex items-center justify-center'>
          <div className='relative w-fit'>
            <input type="text" placeholder='Enter Customer Name or Phone Number' className='sm:w-80 xs:w-72 w-60 h-10 pl-3  border-2 border-black-100 rounded-full pb-1  placeholder:text-[10.5px] xs:placeholder:text-xs  sm:placeholder:text-sm' value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)} />
            <FaSearch className='text-gray-300 absolute -translate-x-1/2 -translate-y-1/2 top-[50%] right-[2%]' />
          </div>
        </div>

        <div className='w-[95%] m-auto mt-5 overflow-auto'>
          <DataTable
            columns={columns}
            data={dataTableData}
            fixedHeader
            pagination
            bordered
            customStyles={customStyles}
          />
        </div>

      </div>

      {/* Models */}
      <div>
        <Modal title={edit ? "Edit Customer" : 'Add Customers'} height={'260px'} open={isModalOpen} onCancel={handleCancel} footer={null}   >
          <div className='flex flex-col justify-center'>
            <div className='flex flex-col mb-4'>
              <label className='pl-4'> Customer Name :</label>
              <input type="text" placeholder='Enter Customer Name' className='h-10 pl-3 border drop-shadow-lg w-[93%] hover:focus-within:outline-none rounded-md ml-3' name='name' id="name" onBlur={forms.handleBlur} value={forms.values.name} onChange={forms.handleChange} />
            </div>
            {forms.errors.name && forms.touched.name ? <div style={{ width: "100%", color: "red", paddingLeft: "15px" }}>{forms.errors.name}</div> : null}


            <div className='flex flex-col mb-4'>
              <label className='pl-4'> Phone number :</label>
<<<<<<< HEAD
              <input type="number" disabled={edit} placeholder='Enter Phone Number' className='h-10 pl-3 border drop-shadow-lg w-[93%] hover:focus-within:outline-none rounded-md ml-3' name='phoneNumber' id="phoneNumber" onBlur={forms.handleBlur} value={forms.values.phoneNumber} onChange={forms.handleChange} />
=======
              <input type="number" placeholder='Enter Phone Number' className='h-10 pl-3 border drop-shadow-lg w-[93%] hover:focus-within:outline-none rounded-md ml-3' name='phoneNumber' id="phoneNumber" onBlur={forms.handleBlur} value={forms.values.phoneNumber} onChange={forms.handleChange} />
>>>>>>> 718e5a8dc5ae2ba787207a84bbe592ccfedb6c58
            </div>
            {forms.errors.phoneNumber && forms.touched.phoneNumber ? <div style={{ width: "100%", color: "red", paddingLeft: "15px" }}>{forms.errors.phoneNumber}</div> : null}


            <div className='flex flex-col mb-4'>
              <label className='pl-4'>Address:</label>
              <input type="text" placeholder='Enter Address' className='h-10 pl-3 border drop-shadow-lg w-[93%] hover:focus-within:outline-none rounded-md ml-3' name='address' id="address" onBlur={forms.handleBlur} value={forms.values.address} onChange={forms.handleChange} />
            </div>
            {forms.errors.address && forms.touched.address ? <div style={{ width: "100%", color: "red", paddingLeft: "15px" }}>{forms.errors.address}</div> : null}

            <div className='flex flex-col mb-4'>
              <label className='pl-4'>Reference name :</label>
              {edit ? <Select name='reference' id="reference" onBlur={forms.handleBlur} onChange={(e) => forms.setFieldValue('reference', e)}
                className='h-10 border drop-shadow-lg w-[93%] hover:focus-within:outline-none rounded-md ml-3'
                placeholder="Select reference"
                options={referenceUser && referenceUser.map((e) => ({ value: e.id, label: e.name }))}
              /> : <Select name='reference' id="reference" onBlur={forms.handleBlur} onChange={(e) => forms.setFieldValue('reference', e)}
                className='h-10 border drop-shadow-lg w-[93%] hover:focus-within:outline-none rounded-md ml-3'
                placeholder="Select reference"
                options={referenceUser && referenceUser.map((e) => ({ value: e.id, label: e.name }))}
              />}
            </div>
            {forms.errors.reference && forms.touched.reference ? <div style={{ width: "100%", color: "red", paddingLeft: "15px" }}>{forms.errors.reference}</div> : null}
            {err ? <div style={{ width: "100%", color: "red", paddingLeft: "15px" }}>{err}</div> : null}
            <div className='flex justify-center'>
              <button type='submit' className='bg-[#176B87] hover:scale-105 transition-all duration-300 w-36 h-[35px] text-white font-bold rounded-md' onClick={forms.handleSubmit}>Submit</button>
            </div>
          </div>
        </Modal>
      </div>

    </>
  )
}

export default Customers