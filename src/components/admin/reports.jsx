// eslint-disable-next-line no-unused-vars
import React from 'react'


function Report() {
  const chit = [
    {
      name: "Total chits", value: "20"
    },
    {
      name: "Completed Chits", value: "10"
    },
    {
      name: "Ongoing Chits", value: "10"
    }
  ]
  return (
    <div>
      <h1 className='text-xl font-bold pt-10 text-center'>Reports</h1>
      <div className='p-5'>
        <div className='grid gap-10 flex-col p-5 sm:grid-cols-2 md:grid-cols-3'>
          {
            chit.map((data, ind) => (
              <div className='p-5 bg-white flex justify-between w-[100%] rounded-lg py-8' key={ind}>
                <p>{data.name}</p>
                <p className='font-bold text-xl'>{data.value}</p>
              </div>
            ))
          }
        </div>
      </div>

    </div>
  )
}

export default Report