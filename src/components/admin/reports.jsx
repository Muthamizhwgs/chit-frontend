// eslint-disable-next-line no-unused-vars
import { icons } from 'antd/es/image/PreviewGroup';
import React from 'react';
import { GrInProgress } from "react-icons/gr";
import { BsThreeDots } from "react-icons/bs";
import { FaCheckCircle } from "react-icons/fa";
import { RiHandCoinFill } from "react-icons/ri";
import { Link } from 'react-router-dom';


function Report() {
  const report = [
    {
      icons: <RiHandCoinFill className="size-5 text-blue-500" />,
      name: "Total Chits",
      value: "20",
    },
    {
      icons: <GrInProgress className="size-5 text-orange-400" />,
      name: "On Going",
      value: "30",
    },
    {
      icons: <FaCheckCircle className="size-5 text-green-500" />,
      name: "Completed",
      value: "100"
    }
  ]
  return (
    <div>
      <h1 className='text-xl font-bold pt-10 text-center'>Reports</h1>
      <div className='p-5'>
        <div className='grid gap-10 flex-col p-5 sm:grid-cols-2 md:grid-cols-3'>
          {report.map((data, ind) => (
            // eslint-disable-next-line react/jsx-key
            <Link to={'/homepage/reports/reportDetails?id=' + data._id}>
              <div className='p-4 bg-white border-s-2 border-b-2 border-gray-300 drop-shadow-lg flex flex-col justify-between w-[100%] rounded-lg py-4' >
                <div className='flex justify-between w-full'>
                  <p className='bg-white border-2 p-2 rounded-md'>{data.icons}</p>
                  <BsThreeDots />
                </div>
                <div className='pt-2'>
                  <p>{data.name}</p>
                  <p className='font-bold text-xl'>{data.value}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

    </div>
  )
}

export default Report