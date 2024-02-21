import React from 'react'


const Actions = () => {


  return (
    <>
      <div>
        <h1 className='text-center text-xl pt-10'>Action</h1>
        <div className='p-10 flex gap-10'>
          <div className='flex gap-5 justify-center items-center'>
            <h1 className='text-lg'>Chit Name:</h1>
            <input type='text' placeholder='Enter chit name' className='p-2 w-60' />
          </div>
          <div className='flex gap-5 justify-center items-center'>
            <h1>Action Amount</h1>
            {/* <Autocomplete>
              <Option
            </Autocomplete> */}
            <input type='number' placeholder='Enter Action amount' className='p-2 w-60' />
          </div>
          <button className='bg-[#176B87] px-10 rounded-md text-white'>Submit</button>
        </div>
      </div>
    </>
  )
}

export default Actions