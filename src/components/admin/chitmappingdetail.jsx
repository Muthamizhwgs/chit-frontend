// eslint-disable-next-line no-unused-vars
import React from 'react';
import DataTable from "react-data-table-component";
import { useLocation } from 'react-router-dom';
import { getChitMapDetailsById } from "../../services/service"
import CurrencyComponent from '../utils/currency';
import Loader from '../utils/loader';

function ChitMapDetails() {
  const location = useLocation();
  const [customer, setCustumers] = React.useState([]);
  const [loader, setLoader] = React.useState(false);


  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  const getDetails = async (id) => {
    setLoader(true)
    try {
      let values = await getChitMapDetailsById(id)
      console.log(values.data)
      setCustumers(values.data)
    } catch (error) {
      console.log(error)
    } finally {
      setLoader(false)
    }

  }

  React.useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const idParam = searchParams.get('id');
    getDetails(idParam)
    console.log(idParam)
  }, [location.search]);


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
      {loader ? <Loader data={loader} /> : null}
      <div>

        <h1 className='text-center pt-8 text-xl'>Chit Map Details</h1>
        <div className='flex w-[95%] gap-5 pl-10 pt-5 '>
          {/* <div>
          <Select
            defaultValue="Select Customer Name"
            style={{ width: 200 }}
            onChange={handleChange}
            options={[
              { value: 'second sunday', label: 'Second sunday' },
              { value: 'Every month 5th', label: 'Every Month 5th' },
            ]}
          />
        </div> */}
          {/* <div>
          <Select
            defaultValue="Select Phone Number"
            style={{ width: 200 }}
            onChange={handleChange}
            options={[
              { value: 'second sunday', label: 'Second sunday' },
              { value: 'Every month 5th', label: 'Every Month 5th' },
            ]}
          />
        </div> */}
        </div>
        <div className='w-[95%] m-auto mt-5 overflow-auto'>
          <DataTable
            columns={columns}
            data={customer}
            fixedHeader
            pagination
            bordered1
            customStyles={customStyles}
          />
        </div>
      </div>
    </>
  )
}

export default ChitMapDetails