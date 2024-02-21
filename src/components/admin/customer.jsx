import React, { useEffect } from 'react';
import { Modal, Select } from 'antd';
import { CustomerSchema, CustomerInitValue } from '../../validations/customers';
import { useFormik } from 'formik';
import { createUsers, getChitUsers } from "../../services/service"
import DataTable from "react-data-table-component";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
// eslint-disable-next-line no-unused-vars
import DateFormat from '../../components/date';
import Loader from '../utils/loader';

function Customers() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [err, setErr] = React.useState('');
  const [users, setUsers] = React.useState([]);
  // eslint-disable-next-line no-unused-vars
  const [filteredData, setFilteredData] = React.useState([]);
  // eslint-disable-next-line no-unused-vars
  const [searchTerm, setSearchTerm] = React.useState("");
  const [loader, setLoader] = React.useState(false);



  const showModal = () => {
    setIsModalOpen(true);
  };


  const forms = useFormik({
    initialValues: CustomerInitValue,
    validationSchema: CustomerSchema,
    onSubmit: (values) => {
      submitForms(values)
    },
  })
  const handleCancel = () => {
    setIsModalOpen(false);
    forms.resetForm()
    setErr('')
  };

  const submitForms = async (value) => {
    setLoader(true)
    try {
      await createUsers(value)
      handleCancel()
      getChit()
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

    } finally {
      setLoader(false)
    }
  }
  const chengeEdit = () => {
    setIsModalOpen(true);
  }
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
      selector: (row) => row.Name,
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
      name: (
        <h1 className="text-lg text-gray-500">
        </h1>
      ),
      selector: (row) => row.reference,
      cell: (row) => (
        <>

          <>
            <FaEdit className='size-5 cursor-pointer' onClick={chengeEdit} /><span className='ml-2'>{row.id}</span>
            <MdDelete className='size-5 cursor-pointer' onClick={chengeDelete} /><span className='ml-2'>{row.id}</span>
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

  useEffect(() => {
    getChit();
    // const result =
    //   chits &&
    //   chits.filter((value) => {
    //     return value.group.match(group);
    //   });
    // setFilteredData(result);
  }, [])
  return (
    <>
      {loader ? <Loader data={loader} /> : null}
      <div>
        <div className='flex justify-between max-w-[95%] pt-5'>
          <div></div>
          <div className='text-xl'>
            Customers
          </div>
          <div className=''>
            <button onClick={showModal} className=' bg-[#176B87] flex justify-center items-center text-white w-32 gap-1 rounded-md h-8'>
              {/* <FaPlus className='text-white size-4' /> */}
              Add customers
            </button>
          </div>
        </div>

        <div className='w-[95%] m-auto'>
          <input type="text" placeholder='Enter Customer Name or Phone Number' className='w-[30%] h-10 pl-2  border-2 border-black-100 rounded-md' />
        </div>

        <div className='w-[95%] m-auto mt-5 overflow-auto'>
          <DataTable
            columns={columns}
            data={users}
            fixedHeader
            pagination
            bordered
            customStyles={customStyles}
          />
        </div>

      </div>

      {/* Models */}
      <div>
        <Modal title="Add Customers" height={'260px'} open={isModalOpen} onCancel={handleCancel} footer={null}   >
          <div className='flex flex-col justify-center'>
            <div className='flex flex-col mb-4'>
              <label className='pl-4'> Customer Name :</label>
              <input type="text" placeholder='Enter Customer Name' className='h-10 pl-3 border drop-shadow-lg w-[93%] hover:focus-within:outline-none rounded-md ml-3' name='Name' id="Name" onBlur={forms.handleBlur} value={forms.values.Name} onChange={forms.handleChange} />
            </div>
            {forms.errors.Name && forms.touched.Name ? <div style={{ width: "100%", color: "red", paddingLeft: "15px" }}>{forms.errors.Name}</div> : null}


            <div className='flex flex-col mb-4'>
              <label className='pl-4'> Phone number :</label>
              <input type="number" placeholder='Enter Phone Number' className='h-10 pl-3 border drop-shadow-lg w-[93%] hover:focus-within:outline-none rounded-md ml-3' name='phoneNumber' id="phoneNumber" onBlur={forms.handleBlur} value={forms.values.phoneNumber} onChange={forms.handleChange} />
            </div>
            {forms.errors.phoneNumber && forms.touched.phoneNumber ? <div style={{ width: "100%", color: "red", paddingLeft: "15px" }}>{forms.errors.phoneNumber}</div> : null}


            <div className='flex flex-col mb-4'>
              <label className='pl-4'>Address:</label>
              <input type="text" placeholder='Enter Address' className='h-10 pl-3 border drop-shadow-lg w-[93%] hover:focus-within:outline-none rounded-md ml-3' name='adress' id="adress" onBlur={forms.handleBlur} value={forms.values.adress} onChange={forms.handleChange} />
            </div>
            {forms.errors.adress && forms.touched.adress ? <div style={{ width: "100%", color: "red", paddingLeft: "15px" }}>{forms.errors.adress}</div> : null}

            <div className='flex flex-col mb-4'>
              <label className='pl-4'>Reference name :</label>
              <Select name='reference' id="reference" onBlur={forms.handleBlur} onChange={(e) => forms.setFieldValue('reference', e)} value={forms.values.reference}
                className='h-10 border drop-shadow-lg w-[93%] hover:focus-within:outline-none rounded-md ml-3'
                placeholder="Select Date"
                options={[
                  { value: '5', label: 'Admin' },
                ]}
              />
            </div>
            {forms.errors.reference && forms.touched.reference ? <div style={{ width: "100%", color: "red", paddingLeft: "15px" }}>{forms.errors.reference}</div> : null}
            {err ? <div style={{ width: "100%", color: "red", paddingLeft: "15px" }}>{err}</div> : null}
            <div className='flex justify-center'>
              <button className='bg-[#176B87] w-36 h-[35px] text-white font-bold rounded-md' onClick={forms.handleSubmit}>Submit</button>
            </div>
          </div>
        </Modal>
      </div>

    </>
  )
}

export default Customers