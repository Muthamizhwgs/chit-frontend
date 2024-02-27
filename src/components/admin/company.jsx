// eslint-disable-next-line no-unused-vars
import React from 'react'
import { useLocation } from 'react-router-dom';
import { Modal } from 'antd';
import { CompanySchema, CompanyinitValue } from '../../validations/company';
import { useFormik } from 'formik';
import DataTable from "react-data-table-component";
import CurrencyComponent from '../utils/currency';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

const Company = () => {
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const forms = useFormik({
        initialValues: CompanyinitValue,
        validationSchema: CompanySchema,

    })
    const handleCancel = () => {
        setIsModalOpen(false);
        forms.resetForm()
    };

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
                    Company Name
                </h1>
            ),
            selector: (row) => row.chitName,
            sortable: true,
        },
        {
            name: (
                <h1 className="text-lg text-gray-500">
                    Commission Amount
                </h1>
            ),
            selector: (row) => <CurrencyComponent amount={row.chitAmount} />,
        },
        {
            name: (
                <h1 className="text-lg text-gray-500">
                    Status
                </h1>
            ),
            selector: (row) => row.status
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
                        <FaTrash className='size-5 cursor-pointer' onClick={chengeDelete} color='red' /><span className='ml-2'>{row.id}</span>
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
    return (
        <>
            <div>
                <div className='flex xs:flex-row flex-col xs:justify-between items-center gap-3 xs:gap-0 max-w-[95%] pt-10 font-bold'>
                    <div>
                    </div>
                    <div className='text-xl'>
                        Company Creation
                    </div>
                    <div className=''>
                        <button onClick={showModal} className=' bg-[#176B87] flex justify-center items-center text-white w-32 gap-1 rounded-md h-8 xs:text-base text-sm'>
                            <FaPlus className='text-white size-2' />
                            Add Company
                        </button>
                    </div>
                </div>
                <div>
                    <DataTable
                        columns={columns}
                        customStyles={customStyles}
                        fixedHeader
                        pagination />
                </div>
            </div>
            <div>
                <Modal title="Add Company" height={'260px'} open={isModalOpen} onCancel={handleCancel} footer={null}   >
                    <div className='flex flex-col justify-center'>
                        <div className='flex flex-col mb-4'>
                            <label className='pl-4'> Company Name :</label>
                            <input type="text" placeholder='Enter Company Name' className='h-10 pl-3 border drop-shadow-lg w-[93%] hover:focus-within:outline-none rounded-md ml-3' name='companyName' id="companyName" onBlur={forms.handleBlur} value={forms.values.companyName} onChange={forms.handleChange} />
                        </div>
                        {forms.errors.companyName && forms.touched.companyName ? <div style={{ width: "100%", color: "red", paddingLeft: "15px" }}>{forms.errors.companyName}</div> : null}

                        <div className='flex flex-col mb-4'>
                            <label className='pl-4'> Commission Amount: % </label>
                            <input type="number" placeholder='Enter Commission Amount' className='h-10 pl-3 border drop-shadow-lg w-[93%] hover:focus-within:outline-none rounded-md ml-3' name='commissionAmount' id="commissionAmount" onBlur={forms.handleBlur} value={forms.values.commissionAmount} onChange={forms.handleChange} />
                        </div>
                        {forms.errors.commissionAmount && forms.touched.commissionAmount ? <div style={{ width: "100%", color: "red", paddingLeft: "15px" }}>{forms.errors.commissionAmount}</div> : null}

                        <div className='flex justify-center'>
                            <button className='bg-[#176B87] w-36 h-[35px] text-white font-bold rounded-md' onClick={forms.handleSubmit}>Submit</button>
                        </div>
                    </div>
                </Modal>
            </div>
        </>
    )
}

export default Company