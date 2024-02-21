import React from 'react'
import { useFormik } from 'formik';
import { LoginSchema, LoginInitialValue } from "../validations/Login";
import { Login } from '../services/service';
import { useNavigate } from 'react-router-dom';
import { PoweroffOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import Loader from '../components/utils/loader';

function Pages() {
  const [err, setErr] = React.useState(null);
  const [loadings, setLoadings] = React.useState(false);
  const [loader, setLoader] = React.useState(false)

  const navigate = useNavigate();

  const forms = useFormik({
    initialValues: LoginInitialValue,
    validationSchema: LoginSchema,
    onSubmit: (values) => {
      submitForms(values)
    },
  })

  const submitForms = async (values) => {
    setErr(null)
    setLoader(true)
    try {
      let serverResponse = await Login(values)
      setLoadings(true)

      setErr(null);
      let role = serverResponse.data.user.role
      localStorage.setItem('chits', serverResponse.data.tokens.access.token)
      localStorage.setItem('chitsRole', role)
      if(role==='superAdmin'){
        navigate('/homepage/admin')
      }
      else if(role==='admin'){
        navigate('/homepage/chitmaster')
      }
      else if(role==='customer'){
        navigate('/homepage/chits')
      }
    } catch (error) {
      setErr(error.response.data.message);
    }finally{
      setLoadings(false)
    setLoader(false)

    }
  };

  return (
    <>
    {loader?<Loader/>:null}
    <div className='w-full h-screen bg-[#176B87] flex items-center md:justify-end justify-center'>
      <div className='md:w-1/2 w-full h-[85%] bg-[#EEF5FF] md:mr-10 mx-5 md:ml-0 rounded-[10px] py-5'>
        <div className='w-full h-24 flex justify-center '>
          <img src="https://img.freepik.com/free-vector/colorful-letter-gradient-logo-design_474888-2309.jpg?w=740&t=st=1707221479~exp=1707222079~hmac=2c9000571eaee07dba014797a681feac84793e4a93cb235867afa10ad4f0cc93" alt="" width={100} style={{ height: "100%", objectFit: "fill" }} />
        </div>
        <h2 className='text-2xl text-center mt-5 mb-14 font-semibold'>Login Here!</h2>
        <form onSubmit={forms.handleSubmit} className=' flex flex-col justify-center items-center '>
          <div className=''>
            <label className='sm:text-lg font-semibold mr-2'>Phone number :</label>
            <input type="number" placeholder='Enter phone number' className='h-10 pl-3 border drop-shadow-lg lg:w-80 hover:focus-within:outline-none' name='phoneNumber' id="phoneNumber" onBlur={forms.handleBlur} value={forms.values.phoneNumber} onChange={forms.handleChange} />
          </div>
          {forms.errors.phoneNumber && forms.touched.phoneNumber ? <div style={{ width: "59%", color: "red", textAlign: "end" }}>{forms.errors.phoneNumber}</div> : null}
          <div className='pt-10'>
            <label className='sm:text-lg font-semibold mr-12'>Password :</label>
            <input type="password" placeholder='Enter Password' className='h-10 pl-3 border drop-shadow-lg lg:w-80 hover:focus-within:outline-none' name='password' id="password" onBlur={forms.handleBlur} value={forms.values.password} onChange={forms.handleChange} />
          </div>
          {forms.errors.password && forms.touched.password ? <div style={{ width: "59%", color: "red", textAlign: "end" }}>{forms.errors.password}</div> : null}
          {err != null ? <div style={{ width: "70%", color: "red", textAlign: "end" }}>{err}</div> : null}
          <div className='w-[75%] mt-8 h-8 flex justify-center items-center pt-10'>
            <button type='submit' className='bg-[#176B87] px-5 py-2 rounded-md text-white font-bold'> {loadings?<PoweroffOutlined />:null}  Log In</button>
          </div>
        </form>
      </div>
    </div>
  
  </>
  )
}

export default Pages