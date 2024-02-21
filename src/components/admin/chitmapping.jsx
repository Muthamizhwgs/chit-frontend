// eslint-disable-next-line no-unused-vars
import React from 'react'
import { Select, message } from 'antd';
import { getChitsList, getUserList, createMap, getChitsMaps } from "../../services/service"
const { Option } = Select;
import Loader from '../utils/loader';
import { GoDotFill } from "react-icons/go";


function ChitMapping() {

  const [userSelect, setuserSelect] = React.useState([]);
  const [chit, setChit] = React.useState([]);
  const [chitUsers, setchitUsers] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [chitmap, setChetMap] = React.useState([]);
  const [chitCount, setChitCount] = React.useState('')
  const [messageApi, contextHolder] = message.useMessage();
  const [chitId, setChitId] = React.useState('');
  const [getchitmaps, setgetchitmaps] = React.useState([]);
  const [loader, setLoader] = React.useState(false);



  const handleSelectChange = (selected) => {
    setuserSelect(selected)
  };

  const handleChange = (e) => {
    setChitId(e)
  }

  let arr = [];
  const getusers = async () => {
    setLoader(true)
    if (chitId == '') {
      error()
    } else {
      if (userSelect.length == 0) {
        error1()
      } else {
        userSelect.map((e) => {
          arr.push({ ...chitUsers[e], ...{ chit: 1 } })
        })
        setChetMap(arr)
        const sum = arr.reduce(
          (accumulator, currentValue) => accumulator + currentValue.chit,
          0,
        );
        setChitCount(sum)
        showDrawer()
      }
    }
  }

  const chitChange = async (id) => {
    setLoader(true)
    if (chitCount < 20) {
      setChetMap(chitmap => {
        return chitmap.map(item => {
          if (item._id === id) {
            return { ...item, chit: item.chit + 1 };
          }
          return item;
        });
      });
    }
  }


  const chitChangereduce = async (id) => {
    console.log(id)
    setChetMap(chitmap => {
      return chitmap.map(item => {
        if (item._id === id) {
          return { ...item, chit: item.chit - 1 };
        }
        return item;
      });
    });
  }


  React.useEffect(() => {
    const sum = chitmap.reduce(
      (accumulator, currentValue) => accumulator + currentValue.chit,
      0,
    );
    console.log(chit)
    setChitCount(sum)
  }, [chitmap]);


  let getChits = async () => {
    setLoader(true)
    try {
      let serverdata = await getChitsList()
      setChit(serverdata.data);
      console.log("chit " + serverdata.data)
    } catch (error) {
      console.error("Error fetching chits:", error);

    } finally {
      setLoader(false)
    }
  }
  let getchitusersLists = async () => {
    setLoader(true)
    try {
      let users = await getUserList();
      setchitUsers(users.data)
      // eslint-disable-next-line no-empty
    } catch (error) {

    } finally {
      setLoader(false)

    }
  }

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false)
  }



  const getChitMaps = async () => {
    try {
      let serData = await getChitsMaps()
      setgetchitmaps(serData.data)
      // eslint-disable-next-line no-empty
    } catch (error) {

    }
  }


  React.useEffect(() => {
    getChits();
    getchitusersLists();
    getChitMaps()
  }, []);

  const error = () => {
    messageApi.open({
      type: 'error',
      content: 'Please Select Chit To Map',
      duration: 1
    });
  };

  const error1 = () => {
    messageApi.open({
      type: 'error',
      content: 'Please Select At least One Users To Map',
      duration: 1
    });
  };

  const submitMapping = async () => {
    setLoader(true)
    let serSendData = {
      chitId: chitId,
      chitMaps: chitmap
    }

    try {
      let apiRes = await createMap(serSendData);
      console.log(apiRes.data)
      getChitMaps()
      onClose()
      // eslint-disable-next-line no-empty
    } catch (error) {
    } finally {
      setLoader(false)
    }
    console.log(serSendData)
  }

  const chits = [{
    _id: 'id1',
    active: true,
    chitAmount: 1,
    chitName: 'dippam',
    createdAt: '12-12-12',
    describeDate: "4",
    group: 'Silakidum',
    months: 12,
    noOfPeople: 8,
    updatedAt: '11-11-11',
    status: 'Pending'
  }, {
    _id: 'id2',
    active: false,
    chitAmount: 1000,
    chitName: 'dappam',
    createdAt: '11-11-11',
    describeDate: "4",
    group: 'Silakidum',
    months: 24,
    noOfPeople: 10,
    updatedAt: '11-11-11',
    status: 'Completed'
  }, {
    _id: 'id3',
    active: true,
    chitAmount: 100000,
    chitName: 'dappam',
    createdAt: '10-10-10',
    describeDate: "4",
    group: 'Silakidum',
    months: 20,
    noOfPeople: 12,
    updatedAt: '11-11-11',
    status: 'Pending'
  }];

  return (
    // <>
    // {loader?<Loader data={loader}/>:null}
    //   {contextHolder}
    //   <div className='flex justify-center max-w-[95%] pt-5'>
    //     <div></div>
    //     <div className='text-xl'>
    //       <h1>Chit Mapping</h1>
    //     </div>
    //   </div>

    //   <div className=' flex w-[95%] m-auto gap-4 mt-4 items-center mb-4'>
    //     Chit Name:<Select
    //       defaultValue="select chit"
    //       style={{
    //         width: 120,
    //       }}
    //       onChange={handleChange}
    //     >
    //       {
    //         // eslint-disable-next-line no-unused-vars
    //         chit.map((item, ind) => (
    //           // eslint-disable-next-line react/jsx-key
    //           <Option value={item._id}>{item.chitName}</Option>
    //         ))
    //       }
    //     </Select>

    //     Select Users  <Select
    //       mode="multiple"
    //       style={{
    //         width: 500,
    //       }}
    //       onChange={handleSelectChange}
    //     >
    //       {
    //         chitUsers.map((item, ind) => (
    //           // eslint-disable-next-line react/jsx-key
    //           <Option value={ind}>{item.Name} - {item.phoneNumber} </Option>
    //         ))
    //       }
    //     </Select>

    //     <div>
    //       <button onClick={getusers} className='bg-[#176B87] flex justify-center items-center text-white w-32 gap-1 rounded-md h-8'> Map Chit </button>
    //     </div>
    //   </div>
    //   {/* cards design */}

    //   <div className='w-[95%] m-auto flex gap-5 flex-wrap '>
    //     {
    //       // eslint-disable-next-line no-unused-vars
    //       getchitmaps.map((data, ind) => (
    //         // eslint-disable-next-line react/jsx-key
    //         <div className='h-36 w-[30%] rounded-md bg-[#f1faf9] drop-shadow-md cursor-pointer'>
    //           <Link to={'/chitmapdetails?id=' + data._id}>
    //             <div className='flex justify-between px-4 mt-2'>
    //               <h3>{data.chitName}</h3>
    //               <div className=''>{data.chitActive ? <p className='text-green-600'>Active</p> : <p>InActive</p>}</div>
    //             </div>
    //             <div className='flex px-4 justify-between mt-2'>
    //               <h4>customer: {data.no_of_Peoples}</h4>
    //               <h4>months: {data.months}</h4>
    //             </div>
    //             <div className='flex px-4 justify-between mt-2'>
    //               <h4>Auctions: 0 / {data.months}</h4>
    //               <h4 className={data.status == 'Pending' ? 'text-red-600' : 'text-green-300'}>{data.status}</h4>
    //             </div>
    //             <div className='flex px-4 justify-between mt-2'>
    //               <h4>{data.group}</h4>
    //               <h4>₹ {data.chitAmount}</h4>
    //             </div>
    //           </Link>
    //         </div>
    //       ))
    //     }


    //   </div>

    //   {/* drawer */}
    //   <div>
    //     <Drawer title={"Total Chits " + chitCount} onClose={onClose} open={open}>
    //       {
    //         chitmap.map((e) => (
    //           <>
    //             <div className='w-full flex space-y-2 items-center'>
    //               <label className='w-[90%]'>{e.Name}</label>
    //               <button onClick={() => { e.chit > 1 ? chitChangereduce(e._id) : null }} className='bg-[#176B87] w-6 text-white'>-</button><input type="number" value={e.chit} className='border-2 w-10 text-center pl-1' disabled /> <button onClick={() => { chitChange(e._id) }} className='bg-[#176B87] w-6 text-white'>+</button>
    //             </div>
    //           </>
    //         ))
    //       }
    //       <div className='flex justify-center mt-8'>
    //         <button className='bg-[#176B87] flex justify-center items-center text-white w-20 gap-1 rounded-md h-8' onClick={submitMapping}>Submit</button>
    //       </div>
    //     </Drawer>
    //   </div>
    // </>

    <>
      {loader ? <Loader data={loader} /> : null}
      <div className=''>
        <div className='flex justify-center max-w-[95%] pt-5'>
          <div></div>
          <div className='text-xl'>
            <h1>Chit Mapping</h1>
          </div>
        </div>

        {/* cards design */}
        <section className=' flex w-[95%] m-auto gap-4 mt-4 items-center mb-4'>
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

        <div className='w-[95%] m-auto grid grid-cols-1 gap-2'>

          {chits.map((key, value) => (
            <section key={key} className='grid md:grid-cols-3 sm:grid-cols-2 grid-cols-2 lg:grid-cols-6  xl:grid-cols-6 bg-white p-2 rounded cursor-pointer'>
              <section className='flex flex-col'>
                <p className='font-bold'>{key.chitName}</p>
                <p>{key.createdAt}</p>
              </section>
              <section className='flex p-1 rounded-xl bg-slate-200 w-fit h-fit mt-2'>
                {key.active ? <div className='text-green-600 flex justify-center items-center text-center'><GoDotFill /> <p className='text-sm'>Active</p></div> : <div className='text-red-600 flex justify-center items-center text-center'><GoDotFill /> <p className='text-sm'>Pending</p></div>}
              </section>
              <section className=''>
                <p className='font-bold'>Amount</p>
                <p>{key.chitAmount}</p>
              </section>
              <section className=''>
                <p className='font-bold'>Group</p>
                <p>{key.group}</p>
              </section>
              <section className=''>
                <p className='font-bold'>Months</p>
                <p>{key.months}</p>
              </section>
              <section className=''>
                <p className='font-bold'>Members</p>
                <p>{key.noOfPeople}</p>
              </section>
            </section>
          ))}


        </div>
      </div>
    </>
  )
}

export default ChitMapping