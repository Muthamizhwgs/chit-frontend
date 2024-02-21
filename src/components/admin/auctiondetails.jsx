import React from 'react'
import CurrencyComponent from '../utils/currency';
import Loader from '../utils/loader';
import DataTable from 'react-data-table-component';

const Auctiondetails = () => {
    const A = [
        { Name: 'A' },
        { Name: 'B' },
        { Name: 'C' },
        { Name: 'D' },
        { Name: 'E' },
        { Name: 'F' },
        { Name: 'G' },
        { Name: 'H' },
        { Name: 'I' },
        { Name: 'J' },
        { Name: 'K' },
        { Name: 'L' },
    ]
    const B = [
        { Name: 'a' },
        { Name: 'b' },
        { Name: 'c' },
        { Name: 'd' },
        { Name: 'e' },
        { Name: 'f' },
        { Name: 'g' },
        { Name: 'h' },
    ]
    const C = [
        { Name: 'a' },
        { Name: 'b' },
        { Name: 'c' },
        { Name: 'd' },
        { Name: 'e' },
        { Name: 'f' },
    ]
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
                    Name
                </h1>
            ),
            selector: (row) => row.Name,
        },
        {
            name: (
                <h1 className="text-lg text-black">
                    Phone No
                </h1>
            ),
            selector: (row) => row.phoneNumber,
        },
        {
            name: (
                <h1 className="text-lg text-black">
                    Address
                </h1>
            ),
            selector: (row) => row.adress,
        },
        {
            name: (
                <h1 className="text-lg text-black">
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
        <div>
            <h1 className='text-xl text-center pt-10 font-bold'>Actions Details</h1>
            <DataTable columns={columns} data={A} customStyles={customStyles} className='pt-5' />
        </div>
    )
}

export default Auctiondetails