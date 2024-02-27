// eslint-disable-next-line no-unused-vars
import { Select } from 'antd';
import React, { useEffect } from 'react';
const { Option } = Select;
import { Link, useNavigate } from 'react-router-dom'
import { getMyChits } from "../../services/service"
const Chits = () => {
  const [mychit, setMychit] = React.useState([]);
  let navigate = useNavigate()
  const chits = [{
    _id: 'id1',
    active: true,
    chitAmount: 1,
    chitName: 'dippam',
    createdAt: '12-12-12',
    describeDate: "4",
    group: 'A',
    months: 12,
    noOfPeople: 12,
    updatedAt: '11-11-11',
    status: 'Pending'
  }, {
    _id: 'id2',
    active: false,
    chitAmount: 100000,
    chitName: 'dappam',
    createdAt: '12-12-12',
    describeDate: "4",
    group: 'B',
    months: 12,
    noOfPeople: 12,
    updatedAt: '11-11-11',
    status: 'Completed'
  }, {
    _id: 'id2',
    active: false,
    chitAmount: 100000,
    chitName: 'dappam',
    createdAt: '12-12-12',
    describeDate: "4",
    group: 'C',
    months: 12,
    noOfPeople: 12,
    updatedAt: '11-11-11',
    status: 'Pending'
  }];

  const handleChange = () => {

  }

  const getMyChitss = async () => {
    try {
      let val = await getMyChits()
      setMychit(val.data)
    } catch (error) {
      if (error.response.status == 401) {
        navigate('/')
      }
    }
  }

  useEffect(() => {
    getMyChitss()
  }, [])

  return (
    <div>
      <div className='flex justify-center max-w-[95%]'>
        <div></div>
        <div className='text-xl py-5'>
          <h1 className='font-semibold'>My Chits</h1>
        </div>
      </div>

      {/* cards design */}
      <section className='py-5 flex xs:flex-row flex-col w-[95%] m-auto gap-4 mt-4 items-center mb-4'>
        Chit Name:<Select
          defaultValue="select chit"
          style={{
            width: 120,
          }}
          onChange={handleChange}
        >
          {
            // eslint-disable-next-line no-unused-vars
            chits.map((item, ind) => (
              // eslint-disable-next-line react/jsx-key
              <Option value={item._id}>{item.chitName}</Option>
            ))
          }
        </Select>
      </section>

      <div className='w-[95%] m-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
        {
          // eslint-disable-next-line no-unused-vars
          chits.map((data, ind) => (
            // eslint-disable-next-line react/jsx-key
            <div className='h-fit w-[90%] rounded-md bg-[#f1faf9] drop-shadow-md cursor-pointer'>

              <div className='flex justify-between px-4 mt-2 flex-nowrap'>
                <h3>{data.chitName}</h3>
                <div className=''>{data.active ? <p className='text-green-600'>Active</p> : <p className='text-red-600'>InActive</p>}</div>
              </div>
              <div className='flex px-4 justify-between mt-2'>
                <h4>customer: {data.noOfPeople}</h4>
                <h4>months: {data.months}</h4>
              </div>
              <div className='flex px-4 justify-between mt-2'>
                <h4>Auctions: 0 / {data.months}</h4>
                <h4 className={data.status == 'Pending' ? 'text-red-600' : 'text-green-300'}>{data.status}</h4>
              </div>
              <div className='flex px-4 justify-between mt-2'>
                <h4>{data.group}</h4>
                <h4>₹ {data.chitAmount}</h4>
              </div>

            </div>
          ))
        }


      </div>
    </div>
  )
}

export default Chits
