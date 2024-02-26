import './App.css'
import { Route, Routes } from 'react-router-dom'
import Homepage from './common/Homepage'
import Pages from './common/Login'
import Admin from './components/superadmin/SuperAdminHome'
import Actions from './components/user/auction'
import Chitmaster from './components/admin/chitmaster'
import Customer from './components/admin/customer'
import ChitMapping from './components/admin/chitmapping';
import Auction from './components/admin/auction'
import Payments from './components/admin/payments'
import Reports from './components/admin/reports'
import Chits from './components/user/chits'
import ChitMapDetails from './components/admin/chitmappingdetail'
import Auctiondetails from './components/admin/auctiondetails'

function App() {


  return (
    <>

      <Routes>
        <Route path='/' element={<Pages />} />
        <Route path='/homepage' element={<Homepage />}>
          <Route path='/homepage/admin' element={<Admin />} />
          <Route path='/homepage/chitauction' element={<Actions />} />


          {/* admin */}
          <Route path='/homepage/chitmaster' element={<Chitmaster />} />
          <Route path='/homepage/customer' element={<Customer />} />
          <Route path='/homepage/chitmapping' element={<ChitMapping />} />
          <Route path='/homepage/chitmapping/chitmapdetails' element={<ChitMapDetails />} />
          <Route path='/homepage/manageauction' element={<Auction />} />
          <Route path='/homepage/auction/auctiondetails' element={<Auctiondetails />} />
          <Route path='/homepage/payments' element={<Payments />} />
          <Route path='/homepage/reports' element={<Reports />} />

          {/* user */}
          <Route path='/homepage/chits' element={<Chits />} />
          <Route path='/homepage/auction' element={<Actions />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
