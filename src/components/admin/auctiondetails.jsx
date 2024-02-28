import React from 'react'
import CurrencyComponent from '../utils/currency';
import Loader from '../utils/loader';
import DataTable from 'react-data-table-component';

const Auctiondetails = () => {
    const [users,setUsers] = React.useState([])
    
    const columns = [
        {
            name: (
                <h1 className="text-lg text-black">
                    S.No
                </h1>
            ),
            selector: (row, ind) => ind + 1,
        },
        {
            name: (
                <h1 className="text-lg text-black">
                    Customer Name
                </h1>
            ),
            selector: (row) => row.Name,
        },
        {
            name: (
                <h1 className="text-lg text-black">
                    Month
                </h1>
            ),
            selector: (row) => row.month,
        },
        {
            name: (
                <h1 className="text-lg text-black">
                   Dividend Amount
                </h1>
            ),
            selector: (row) => row.dividendAmount,
        },
        {
            name: (
                <h1 className="text-lg text-black">
                    Action
                </h1>
            ),
            selector: (row) => row.reference,

        },

    ];
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
        <div className='px-10'>
            <h1 className='text-xl text-center font-bold py-5'>Auctions Details</h1>
            <DataTable columns={columns} data={users} customStyles={customStyles} pagination fixedHeader className='' />
        </div>
    )
}

export default Auctiondetails