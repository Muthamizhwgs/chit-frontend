import React from 'react';
import DataTable from 'react-data-table-component';

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
                <h1 className="text-lg text-gray-500">
                    Customer Name
                </h1>
            ),
            selector: (row) => row.customerName,
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
                    Monthly Installment
                </h1>
            ),
            selector: (row) => <CurrencyComponent amount={row.monthlyInstallment} />,
        },
        {
            name: (
                <h1 className="text-lg text-gray-500">
                    Status
                </h1>
            ),
            selector: (row) => "working...",
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