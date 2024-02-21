import React, { useEffect, useState } from 'react'
import { Modal } from 'antd';
import DataTable from "react-data-table-component";
import { useFormik } from 'formik';
import { AdminSchema, AdminInitValues } from '../../validations/admin';
import { createUsers } from "../../services/service";
import Loader from '../utils/loader';
const Admin = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loader, setLoader] = useState(false);
    const [admins, setAdmins] = useState([])

    const showModal = () => {
        setIsModalOpen(true);
    }
    const handleCancel = () => {
        setIsModalOpen(false);
        forms.resetForm()
    };
    const forms = useFormik({
        initialValues: AdminInitValues,
        validationSchema: AdminSchema,
        onSubmit: (values) => {
            submitForms(values)
        },
    })
    const submitForms = async (value) => {
        setLoader(true)
        try {
            let val = await createUsers(value)
            console.log(val)
            handleCancel()
        } catch (error) {
            
        }finally{
            setLoader(true)
        }
    }

    useEffect(()=>{

    },[])

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
                    Phone number
                </h1>
            ),
            selector: (row) => row.phonenumber,
        },
        {
            name: (
                <h1 className="text-lg text-gray-500">
                    Address
                </h1>
            ),
            selector: (row) => row.address,
        },
    ]
    const admindata = [
        {
            Name: "suhail", phonenumber: "9342294599", address: "chennai"
        },
        {
            Name: "assd", phonenumber: "6576454786", address: "chennai"
        }
    ]
    return (
        <div>
               {loader?<Loader/>:null}
            <div className='flex justify-between max-w-[95%] pt-5'>
                <div></div>
                <div className='text-xl'>
                    Manage Admins
                </div>
                <div className=''>
                    <button onClick={showModal} className=' bg-[#176B87] flex justify-center items-center text-white w-28 gap-1 rounded-md h-8'>
                        {/* <FaPlus className='text-white size-4' /> */}
                        Add Admin
                    </button>
                </div>
            </div>
            <div className='px-10 pt-10'>
                <DataTable
                    columns={columns}
                    data={admindata}
                    fixedHeader
                />
            </div>
            <div>
                <Modal title="Add Admin" height={'260px'} open={isModalOpen} onCancel={handleCancel} footer={null} >
                    <div className='flex flex-col justify-center'>
                        <div className='flex flex-col mb-4'>
                            <label className='pl-4'> Name</label>
                            <input type="text" placeholder='Enter Name' className='h-10 pl-3 border drop-shadow-lg w-[93%] hover:focus-within:outline-none rounded-md ml-3' name='name' id="name" onBlur={forms.handleBlur} value={forms.values.name} onChange={forms.handleChange} />
                        </div>
                        {forms.errors.name && forms.touched.name ? <div style={{ width: "100%", color: "red", paddingLeft: "15px" }}>{forms.errors.name}</div> : null}

                        <div className='flex flex-col mb-4'>
                            <label className='pl-4'> Mobile number</label>
                            <input type="text" placeholder='Enter Mobile number' className='h-10 pl-3 border drop-shadow-lg w-[93%] hover:focus-within:outline-none rounded-md ml-3' name='phonenumber' id="phonenumber" onBlur={forms.handleBlur} value={forms.values.phonenumber} onChange={forms.handleChange} />
                        </div>
                        {forms.errors.phonenumber && forms.touched.phonenumber ? <div style={{ width: "100%", color: "red", paddingLeft: "15px" }}>{forms.errors.phonenumber}</div> : null}

                        <div className='flex flex-col mb-4'>
                            <label className='pl-4'> Address</label>
                            <input type="text" placeholder='Enter Address' className='h-10 pl-3 border drop-shadow-lg w-[93%] hover:focus-within:outline-none rounded-md ml-3' name='address' id="address" onBlur={forms.handleBlur} value={forms.values.address} onChange={forms.handleChange} />
                        </div>
                        {forms.errors.address && forms.touched.address ? <div style={{ width: "100%", color: "red", paddingLeft: "15px" }}>{forms.errors.address}</div> : null}

                        <div className='flex justify-center'>
                            <button className='bg-[#176B87] w-36 h-[35px] text-white font-bold rounded-md' onClick={forms.handleSubmit}>Submit</button>
                        </div>
                    </div>
                </Modal>
            </div>


        </div>
    )
}

export default Admin