import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useContext, useEffect } from 'react';
import { LoggedInctx } from './App'
import { useNavigate } from 'react-router-dom';
const api = import.meta.env.VITE_URL;

const Navbar = () => {
  console.log("nav reloaded now")
  const navigate = useNavigate()
  const { loggedIn, setloggedIn, setloggeduser, loggeduser } = useContext(LoggedInctx)

  const getuserdata = async () => {
    const r = await fetch(`${api}/routes/userdata`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      }
    })
    if (r.status === 200) {
      const data = await r.json()
      console.log("set")
      setloggeduser({ name: data.name, email: data.email })
      setloggedIn(true)
    }
  }
  
  const logout = async () => {
    const r = await fetch(`${api}/auth/logout`, {
      method: "POST",
      credentials: "include"
    })

    setloggedIn(false)
    navigate('/')
  }

  useEffect(() => {
    getuserdata()
  }, [])
  
  return (
    <>
      <div className='w-full h-20 lg:h-27 bg-[#1E293B] flex items-center lg:gap-160 gap-1 text-white'>
        <div className='flex items-center lg:gap-20 gap-5'>
          <div className='flex items-center'>
            <img src="/netSettleLogo.png" className='lg:w-35 w-17' alt="logo" />
            <p className='lg:text-3xl text-xl font-bold lg:mr-0 mr-0'>NetSettle</p>
          </div>
          {loggedIn && <div className='text-white flex items-center lg:gap-10 gap-4'>
            <Link to="/dashboard" className='lg:text-[16px] text-[13px]'>Dashboard</Link>

            <Link to="/settleup" className='lg:text-[16px] text-[13px] text-nowrap'>Settle Up</Link>
          </div>}

        </div>
        {loggedIn ? <div className='flex items-center gap-7 lg:ml-0 ml-4 '>
          <p>{loggeduser.name}</p>
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

        </div> :
          <div className='lg:ml-100 ml-10 flex items-center gap-3.5'>
            <Link to={'/signup'} className='bg-indigo-600 lg:text-sm text-xs text-white font-light hover:bg-indigo-700 p-1.5 px-3 rounded-sm'>Sign Up</Link>
            <Link to={'/login'} className='bg-[#F7F9FC]  lg:text-sm text-xs font-light border border-[#1E293B] hover:bg-[#E5E7EB] text-[#1E293B]  p-1.5 px-3 rounded-sm'>Login</Link>
          </div>
        }
      </div>
    </>
  )
}
export default Navbar
