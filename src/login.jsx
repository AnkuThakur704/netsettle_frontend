import { useState } from "react"
import {useNavigate} from "react-router-dom"
import { useContext } from 'react';
import {LoggedInctx} from './App'
const api = import.meta.env.VITE_URL;
const Login = () => {
    const {loggedIn,setloggeduser ,setloggedIn} = useContext(LoggedInctx)
    const navigate = useNavigate()
    const [formdata, setformdata] = useState({})
    const [wrong, setwrong] = useState(false)
    const handlesubmit = async(e)=>{
        e.preventDefault()
        const r = await fetch(`${api}/login`,{method:"POST",headers:{
            "Content-Type":"application/json"
        },
        credentials:"include",
    body:JSON.stringify({
        email:formdata.email,
        password:formdata.password
    })})
    const data = await r.json()
    console.log("this is log data: ",data)
    if(data.success){
        setwrong(false)
        setloggedIn(true)
        setloggeduser({name:data.name,email:formdata.email})
        navigate(data.redirect)
    }
    else{
        setwrong(true)
    }
    }

  return (
    <>
    <div className='w-full h-full flex flex-col items-center justify-center'>
      <div className='bg-linear-to-r from-blue-50 via-white to-white border border-white lg:w-110 w-[90vw] h-120 rounded-sm mt-10 flex flex-col items-center gap-5 shadow-2xl'>
        <p className='font-extrabold lg:text-3xl text-2xl text-zinc-700 mt-20'>Login to your account</p>
        <form className='flex flex-col items-center gap-7 mt-10'onSubmit={handlesubmit}>
            <input type="email" name="email" placeholder="email" onChange={(e)=>setformdata({...formdata,email:e.target.value})} spellCheck={false} autoCorrect='off'  className="lg:w-90  h-11 px-4 rounded-xl 
           bg-white border border-gray-200 
           text-sm text-gray-700 placeholder-gray-400
           shadow-sm
           focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500
           transition" required />
            <input type="password" name="password" placeholder="Password" onChange={(e)=>setformdata({...formdata,password:e.target.value})} spellCheck={false} autoCorrect='off' autoComplete='off' className="lg:w-90 h-11 px-4 rounded-xl 
           bg-white border border-gray-200 
           text-sm text-gray-700 placeholder-gray-400
           shadow-sm
           focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500
           transition" required />
            <input type="submit" className='w-fit h-9 bg-blue-600 hover:bg-blue-700 text-white font mt-5 p-2 px-5 rounded-sm text-sm hover:cursor-pointer' value="Login" />
        </form>
        {wrong&&<p className="text-sm text-red-400 ">*Wrong credentials</p>}
      </div>
    </div>
    </>
  )
}                                                                                                                           

export default Login
