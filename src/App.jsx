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
import Company from './components/admin/company'
import ReportTable from './components/admin/reportTable'
import AuctionDetails from './components/user/AuctionDetails'

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
          <Route path='/homepage/company' element={<Company />} />
          <Route path='/homepage/chitmapping' element={<ChitMapping />} />
          <Route path='/homepage/chitmapping/chitmapdetails' element={<ChitMapDetails />} />
          <Route path='/homepage/manageauction' element={<Auction />} />
          <Route path='/homepage/manageauction/auctiondetails' element={<Auctiondetails />} />
          <Route path='/homepage/payments' element={<Payments />} />
          <Route path='/homepage/reports' element={<Reports />} />
          <Route path='/homepage/reports/reportDetails' element={<ReportTable />} />

          {/* user */}
          <Route path='/homepage/chits' element={<Chits />} />
          <Route path='/homepage/auction' element={<Actions />} />
          <Route path='/homepage/auction/UserauctionDetails' element={<AuctionDetails/>}/>
        </Route>
      </Routes>
    </>
  )
}

export default App
