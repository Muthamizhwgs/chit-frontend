// eslint-disable-next-line no-unused-vars
import { icons } from 'antd/es/image/PreviewGroup';
import React from 'react';
import { GrInProgress } from "react-icons/gr";
import { BsThreeDots } from "react-icons/bs";
import { FaCheckCircle } from "react-icons/fa";
import { RiHandCoinFill } from "react-icons/ri";
import { Link } from 'react-router-dom';
import { getChitReports } from "../../services/service"
import Loader from '../utils/loader';

function Report() {
  const [ reports, setReport ] = React.useState({});
  const [ loader, setLoader ] = React.useState(false);



  const getReports = async ()=>{
    setLoader(true)
    try {
        let val = await getChitReports()
        setReport(val.data)
    } catch (error) {
      if (error.response.status == 401) {
        console.log(error)
        navigate("/");
      }
    }finally{
      setLoader(false)
    }
  }

  React.useEffect(()=>{
    getReports()
  },[])

  const report = [
    {
      icons: <RiHandCoinFill className="size-5 text-blue-500" />,
      name: "Total Chits",
      value: reports.totalChit?reports.totalChit:0,
    },
    {
      icons: <GrInProgress className="size-5 text-orange-400" />,
      name: "On Going",
      value: reports.progress?reports.progress:0,
    },
    {
      icons: <FaCheckCircle className="size-5 text-green-500" />,
      name: "Completed",
      value: reports.complated?reports.complated:0,
    }
  ]
  return (
    <>
    {loader?<Loader/>:null}
    <div>
      <h1 className='text-xl font-bold pt-10 text-center'>Reports</h1>
      <div className='p-5'>
        <div className='grid gap-10 flex-col p-5 sm:grid-cols-2 md:grid-cols-3'>
          {report.map((data, ind) => (
            // eslint-disable-next-line react/jsx-key
            <Link to={'/homepage/report/reportDetails?id=' + data._id}>
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
    </>
  )
}

export default Report