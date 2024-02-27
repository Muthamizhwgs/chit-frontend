import React from 'react';
import DataTable from 'react-data-table-component';
import CurrencyComponent from '../utils/currency';
import DateFormat from '../date';

const ReportTable = () => {
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
                <h1 className="text-lg  text-gray-500">
                    Company
                </h1>
            ),
            selector: (row) => row.companyName,
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
                    Commission
                </h1>
            ),
            selector: (row) => row.commission,
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
                    Auction Date
                </h1>
            ),
            cell: (row) => <DateFormat date={row.createdAt} />,
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
            <div>
                <h1 className='text-center font-bold text-xl p-5'>Chits Details</h1>
                <DataTable columns={columns} customStyles={customStyles} fixedHeader pagination />
            </div>
        </>
    )
}

export default ReportTable