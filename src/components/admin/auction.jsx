import React, { useState } from 'react';
import { Select, Drawer } from 'antd';
import Loader from '../utils/loader';


function Auction() {
  const [loader, setLoader] = useState(false);
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  const [open, setOpen] = React.useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  return (
    <div>
      {loader ? <Loader data={loader} /> : null}
      <div className='text-center mt-5 text-xl'>
        <h1>Auction</h1>
      </div>
      <div className='flex w-[95%] pl-10 gap-5 mt-10'>
        <div>
          <label>Select Month: </label>
          <Select
            defaultValue="Select"
            style={{ width: 200 }}
            onChange={handleChange}
            options={[
              { value: 'second sunday', label: 'Second sunday' },
              { value: 'Every month 5th', label: 'Every Month 5th' },
            ]}
          />
        </div>
        <div>
          <label>Select Group: </label>
          <Select
            defaultValue="Select"
            style={{ width: 200 }}
            onChange={handleChange}
            options={[
              { value: 'A', label: 'A' },
              { value: 'B', label: 'B' },
              { value: 'C', label: 'C' },
            ]}
          />
        </div>
        <div>
          <button onClick={showDrawer} className=' bg-[#176B87] flex justify-center items-center text-white w-32 gap-1 rounded-md h-8'>Get Auction</button>
        </div>
      </div>
      <Drawer title="Auction" onClose={onClose} open={open}>

      </Drawer>
    </div>
  )
}

export default Auction