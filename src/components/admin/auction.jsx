import { Select } from 'antd';
const { Option } = Select;
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa'

const Actions = () => {

  const chits = [{
    _id: 'id1',
    active: true,
    chitAmount: 100000,
    chitName: '1 Lacs',
    createdAt: '12-12-12',
    describeDate: "4",
    group: 'A',
    months: 19,
    noOfPeople: 12,
    updatedAt: '11-11-11',
    status: 'Pending'
  }, {
    _id: 'id2',
    active: false,
    chitAmount: 200000,
    chitName: '2 Lacs',
    createdAt: '12-12-12',
    describeDate: "4",
    group: 'B',
    months: 20,
    noOfPeople: 12,
    updatedAt: '11-11-11',
    status: 'Completed'
  }, {
    _id: 'id3',
    active: false,
    chitAmount: 300000,
    chitName: '3 Lacs',
    createdAt: '12-12-12',
    describeDate: "4",
    group: 'C',
    months: 19,
    noOfPeople: 12,
    updatedAt: '11-11-11',
    status: 'Pending'
  }];

  const handleChange = () => {
  }
  return (
    <div>
      <div className='flex justify-center max-w-[95%] pt-5'>
        <div></div>
        <div className='text-xl py-5 font-bold'>
          <h1>Manage Auction</h1>

        </div>
      </div>

      {/* cards design */}
      <section className='flex w-[95%] m-auto gap-4 mt-4 xs:flex-row flex-col  items-center mb-4'>
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

      <div className='w-[95%] m-auto grid grid-cols-1 md:grid-cols-2 place-items-center lg:grid-cols-3 gap-5'>
        {
          // eslint-disable-next-line no-unused-vars
          chits.map((data, ind) => (
            // eslint-disable-next-line react/jsx-key
            <div className='h-fit w-[90%] rounded-md bg-[#f1faf9] drop-shadow-md '>
              <Link to={'/homepage/auction/auctiondetails/?id=' + data._id}>
                <div className='flex justify-between px-4 mt-2 flex-nowrap'>
                  <h3>{data.chitName}</h3>
                  <div className='flex gap-2'><FaEdit className=' cursor-pointer' /><FaTrash className=' cursor-pointer' /></div>
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
              </Link>
            </div>
          ))
        }


      </div>
    </div>
  )
}

export default Actions
