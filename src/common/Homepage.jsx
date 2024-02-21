import Adminsidebar from './Sidebar'
import { Outlet } from 'react-router-dom'

const Homepage = () => {
    return (
        <div className='w-full '>
            <div className="w-[15%] h-[100vh] bg-[#176b87] float-left">
                <Adminsidebar />
            </div>
            <div className='w-[85%] h-[100vh] bg-slate-200 float-right'>
                <Outlet/>
            </div>
        </div>
    )
}

export default Homepage