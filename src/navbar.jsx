import { Routes, Route, Link } from 'react-router-dom';
import Dashboard from './dashboard';
import { useState } from 'react';
import { useContext } from 'react';
import {LoggedInctx} from './App'
import { useNavigate } from 'react-router-dom';
import SettleUp from './settleup';
const api = import.meta.env.VITE_URL;
function Trips() {
    return(
        <>
        <div>No trips yet</div>
        </>
    )
}





const Navbar = () => {
  const navigate =  useNavigate()
    const {loggedIn, setloggedIn} = useContext(LoggedInctx)
    const logout = async()=>{
      console.log("this is logout start")
    const r = await fetch(`${api}/logout`,{method:"POST",
      credentials:"include"
    })
    console.log("this is the logout end")
    setloggedIn(false)
    navigate('/')
  }
  return (
    <>
     <div className='w-full h-20 lg:h-27 bg-[#1E293B] flex items-center lg:gap-160 gap-1 text-white'>
       <div className='flex items-center lg:gap-20 gap-5'>
        <div className='flex items-center'>
        <img src="/netSettleLogo.png" className='lg:w-35 w-17' alt="logo" />
        <p className='lg:text-3xl text-xl font-bold lg:mr-0 mr-0'>NetSettle</p>
       </div>
       {loggedIn&&<div className='text-white flex items-center lg:gap-10 gap-4'>
        <Link to="/dashboard" className='lg:text-[16px] text-[13px]'>Dashboard</Link>
        
        <Link to="/settleup" className='lg:text-[16px] text-[13px] text-nowrap'>Settle Up</Link>
       </div>}
       
       </div>
       {loggedIn? <div className='flex items-center gap-7 lg:ml-0 ml-4 '>
        {/* <button className='bg-green-500 text-[#1E293B] font-bold rounded-sm p-3 hover:cursor-pointer hover:outline-3 hover:outline-green-300'>Create Trip</button> */}
       <button onClick={logout} className="relative group hover:cursor-pointer">
  <img src="/logout.png" className="lg:w-8 w-5" alt="Logout" />

  <span
    className="
      absolute bottom-full left-1/2 -translate-x-1/2 mb-2
      opacity-0 group-hover:opacity-100
      transition-opacity duration-200
      bg-black text-white text-xs px-2 py-1 rounded
      whitespace-nowrap
      pointer-events-none
    "
  >
    Logout
  </span>
</button>

       </div>:
       <div className='lg:ml-100 ml-10 flex items-center gap-3.5'>
        <Link to={'/signup'} className='bg-indigo-600 lg:text-sm text-xs text-white font-light hover:bg-indigo-700 p-1.5 px-3 rounded-sm'>Sign Up</Link>
        <Link to={'/login'} className='bg-[#F7F9FC]  lg:text-sm text-xs font-light border border-[#1E293B] hover:bg-[#E5E7EB] text-[#1E293B]  p-1.5 px-3 rounded-sm'>Login</Link>
       </div>
       }
       
      
      
     </div>
      <Routes>
       <Route path='/dashboard' element={<Dashboard />}></Route>
      
        <Route path="/settleup" element={<SettleUp />} />
      </Routes>
     </>
     

  )
}
export default Navbar
