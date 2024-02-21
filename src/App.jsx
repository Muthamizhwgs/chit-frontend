import './App.css'
import { Route, Routes } from 'react-router-dom'
import Homepage from './common/Homepage'
import Pages from './common/Login'
import Admin from './components/superadmin/SuperAdminHome'
import Actions from './components/superadmin/auction'
import Chitmaster from './components/admin/chitmaster'
import Customer from './components/admin/customer'
import ChitMapping from './components/admin/chitmapping';
import Auction from './components/admin/auction'
import Payments from './components/admin/payments'
import Reports from './components/admin/reports'
import Chits from './components/user/chits'

function App() {


  return (
    <>

  <Routes>
  <Route path='/' element={<Pages />} />   
  <Route path='/homepage' element={<Homepage />}>
    <Route path='/homepage/admin' element={<Admin />}/>
    <Route path='/homepage/auction' element={<Actions/>}/>


    {/* admin */}
    <Route path='/homepage/chitmaster' element={<Chitmaster/>}/>
    <Route path='/homepage/customer' element={<Customer/>}/>
    <Route path='/homepage/chitmapping' element={<ChitMapping/>}/>
    <Route path='/homepage/auction' element={<Auction/>}/>
    <Route path='/homepage/payments' element={<Payments/>}/>
    <Route path='/homepage/reports' element={<Reports/>}/>

    {/* user */}
    <Route path='/homepage/chits' element={<Chits/>}/>
    <Route path='/homepage/auction' element={<Actions/>}/>
  </Route>
  </Routes>
    </>
  )
}

export default App
