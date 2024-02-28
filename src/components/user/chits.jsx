// eslint-disable-next-line no-unused-vars
import { Select } from 'antd';
import React, { useEffect } from 'react';
const { Option } = Select;
import { Link, useNavigate } from 'react-router-dom'
import { getChitReports } from "../../services/customer.service"
import Loader from '../utils/loader';
import CurrencyComponent from '../utils/currency';
const Chits = () => {
  const [ mychit,setMychit ] = React.useState([]);
  const [loader, setLoader] = React.useState(false)

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

  const getMyChitss = async ()=>{
    setLoader(true)
    try {
      let val = await getChitReports()
      setMychit(val.data)
    } catch (error) {
      if (error.response.status == 401) {
        navigate('/')
      }
    }finally{
      setLoader(false)
    }
  }

  useEffect(() => {
    getMyChitss()
  }, [])

  return (
    <>
    {loader?<Loader/>:null}
    <div>
      <div className='flex justify-center max-w-[95%]'>
        <div></div>
        <div className='text-xl py-5'>
          <h1 className='font-semibold'>My Chits</h1>
        </div>
      </div>

      {/* cards design */}
      {/* <section className='py-5 flex xs:flex-row flex-col w-[95%] m-auto gap-4 mt-4 items-center mb-4'>
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
      </section> */}

      <div className='w-[95%] m-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
        {
          // eslint-disable-next-line no-unused-vars
          mychit.map((data, ind) => (
            // eslint-disable-next-line react/jsx-key
            <div className='h-fit w-[90%] rounded-md bg-[#f1faf9] drop-shadow-md cursor-pointer' key={ind}>
              <div className='flex justify-between px-4 mt-2 flex-nowrap'>
                <h3>{data.chitName}</h3>
                <div className=''>{data.active ? <p className='text-green-600'>Active</p> : <p className='text-red-600'>InActive</p>}</div>
              </div>
              <div className='flex px-4 justify-between mt-2'>
                <h4>Bidding: {data.Auction?data.Auction:0}/{data.no_of_Chit}  </h4>
                <h4>months: {data.months}</h4>
              </div>
              <div className='flex px-4 justify-between mt-2'>
                <h4>Auctions: 0 / {data.months}</h4>
                <h4> monthly : <CurrencyComponent amount={data.monthlyInstallment} /></h4>
              </div>
              <div className='flex px-4 justify-between mt-2'>
                <h4>{data.group}</h4>
                <h4><CurrencyComponent amount={data.chitAmount} /></h4>
              </div>

            </div>
          ))
        }
      </div>
    </div>
    </>
  )
}

export default Chits
