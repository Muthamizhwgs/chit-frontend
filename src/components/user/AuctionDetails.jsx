import React from 'react'
import CurrencyComponent from '../utils/currency';
import DataTable from 'react-data-table-component';
import { Modal } from 'antd';
import { useFormik } from 'formik';
import { AuctionInitValues, AuctionSchema } from '../../validations/auction';


const AuctionDetails = () => {
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const forms = useFormik({
        initialValues: AuctionInitValues,
        validationSchema: AuctionSchema,
        // onSubmit: (values) => {
        //     submitForms(values)
        // },
    })
    const handleCancel = () => {
        setIsModalOpen(false);
        forms.resetForm()
    };
    const chit = [
        { chitName: "Chit--1", chitAmount: "100000", group: "A" },
    ]
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
                    Chit Name
                </h1>
            ),
            selector: (row) => row.chitName,
            sortable: true,
        },
        {
            name: (
                <h1 className="text-lg text-gray-500">
                    Chit Amount
                </h1>
            ),
            selector: (row) => <CurrencyComponent amount={row.chitAmount} />,
        },
        {
            name: (
                <h1 className="text-lg text-gray-500">
                    Group
                </h1>
            ),
            selector: (row) => row.group,
        },
        {
            name: (
                <h1 className="text-lg text-gray-500">
                    Auction
                </h1>
            ),
            selector: (row) => row.reference,
            cell: (row) => (
                <>

                    <>
                        <div className='flex justify-center'>
                            <button className='bg-[#176B87] w-28 h-[32px] text-white font-bold rounded-md' onClick={showModal}>{row.id}Place bid</button>
                        </div>
                    </>
                </>
            ),
        },

    ]
    const customStyles = {
        rows: {
            style: {
                minHeight: "48px",
                minWidth: "800px",
            },
        },
        headCells: {
            style: {
                paddingLeft: "8px",
                paddingRight: "8px",
                backgroundColor: "#F3F4F6",
                color: "#6c737f",
                fontWeight: "bold",
            },
        },
        cells: {
            style: {
                paddingLeft: "8px",
                paddingRight: "8px",
                fontSize: "16px",
                color: "#364353",
            },
        },
    };
    return (
        <>
            <div className='p-10'>
                <h1 className='text-center font-bold text-xl '>Chits Details</h1>
                <DataTable columns={columns} data={chit} customStyles={customStyles} fixedHeader pagination className='pt-10' />
            </div>
            <Modal title="Place bid for this month" height={'260px'} open={isModalOpen} onCancel={handleCancel} footer={null}   >
                <div className='flex flex-col justify-center'>
                    <div className='flex flex-col mb-4'>
                        <label className='pl-4'> Chit Amount :</label>
                        <input type="number" placeholder='Enter Chit Amount' className='h-10 pl-3 border drop-shadow-lg w-[93%] hover:focus-within:outline-none rounded-md ml-3' name='chitAmount' id="chitAmount" onBlur={forms.handleBlur} value={forms.values.chitAmount} onChange={forms.handleChange} />
                    </div>
                    {forms.errors.chitAmount && forms.touched.chitAmount ? <div style={{ width: "100%", color: "red", paddingLeft: "15px" }}>{forms.errors.chitAmount}</div> : null}
                    <div className='flex justify-center'>
                        <button className='bg-[#176B87] w-36 h-[35px] text-white font-bold rounded-md' onClick={forms.handleSubmit}>Submit</button>
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default AuctionDetails