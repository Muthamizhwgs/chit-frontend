import React from 'react'
import DataTable from 'react-data-table-component';

const Actions = () => {
 const customStyles ={
  headCells:{
    style:{
      backgroundColor:"#176b87",
      color:"#D7E4C0",
      fontWeight:"semibold",
      fontSize:"15px",
      //borderRadius:"3px"
    },
  },
  rows:{
    style:{
      color:"#176b87",
      fontWeight:"bold",
      fontSize:"15px"

    }
  }
 }
  const columns = [
    {
      name: "ChitName",
      selector: (row) => row.ChitName,
    },
    {
      name: "Customers",
      selector: (row) => row.Customers,
    },
    {
      name: "Months",
      selector: (row) => row.Months,
    },
    {
      name: "Amount",
      selector: (row) => row.Amount,
    },
    {
      name: "Auction",
      selector: (row) => row.Auction,
    }
  ];
  const data = [
    {
      ChitName: "dippam",
      Customers: "12",
      Months: "12",
      Amount:"1",
      Auction:"Active"
    },
    {
      ChitName: "dippam",
      Customers: "12",
      Months: "12",
      Amount:"1",
      Auction:"Active"
    },
    {
      ChitName: "dippam",
      Customers: "12",
      Months: "12",
      Amount:"1",
      Auction:"Active"
    }
  ];


  return (
    <>
      <div>
        <h1 className='text-center text-xl pt-10 font-semibold'>Auction</h1>
        <div className='p-10 flex gap-10'>
          <div className='flex gap-5 justify-center items-center'>
            <h1 className='text-lg'>Chit Name:</h1>
            <input type='text' placeholder='Enter chit name' className='p-2 w-60' />
          </div>
          <div className='flex gap-5 justify-center items-center'>
            <h1 >Auction Amount</h1>
            {/* <Autocomplete>
              <Option
            </Autocomplete> */}
            <input type='number' placeholder='Enter Action amount' className='p-2 w-60' />
          </div>
          <button className='bg-[#176B87] px-10 rounded-md text-white'>Submit</button>
        </div>
      </div>
      {/* <div> 
      <DataTable
                  columns={columns}
                  data={data}
                  customStyles={customStyles}
                />
                </div> */}
    </>
  )
}

export default Actions