// eslint-disable-next-line no-unused-vars
import React from 'react'


function Report() {
  return (
    <div>
      <h1 className='text-xl font-bold pt-10 text-center'>Reports</h1>
      <div className='p-5'>
        <div className='grid gap-10 flex-col p-5 sm:grid-cols-2 md:grid-cols-3'>
           
              <div className='p-5 bg-[#c1c5c5] flex justify-between w-[100%] rounded-lg py-8' >
                <p>Total chits</p>
                <p className='font-bold text-xl'>20</p>
              </div>

              <div className='p-5 bg-white flex justify-between w-[100%] rounded-lg py-8' >
                <p>On Going</p>
                <p className='font-bold text-xl'>30</p>
              </div>

              <div className='p-5 bg-white flex justify-between w-[100%] rounded-lg py-8'>
                <p>Completed</p>
                <p className='font-bold text-xl'>100</p>
              </div>
        </div>
      </div>

    </div>
  )
}

export default Report