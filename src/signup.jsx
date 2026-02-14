import { useState } from "react"
import {useNavigate,Routes,Route} from "react-router-dom"
const api = import.meta.env.VITE_URL;
const signup = () => {
  const navigate = useNavigate()
  const [formdata, setformdata] = useState({})
  const [matchpass, setmatchpass] = useState(true)
  const [exists, setexists] = useState(false)
  const handlesubmit = async(e)=>{
    e.preventDefault()
    console.log(formdata)
    if(formdata.password!=formdata.cnfrm){
      setmatchpass(false);
    }
    else{
      setmatchpass(true)
      const r = await fetch(`${api}/signup`,{method:"POST",headers:{
        "Content-Type":"application/json"
      },body:JSON.stringify({
        name:formdata.name,
        email:formdata.email,
        upi:formdata.upi,
        password:formdata.password
      })})
      const data = await r.json()
      if(data.exists===true){
        setexists(true)
      }
      else if(data.success){
        console.log("account created")
        console.log(data.redirect)
        console.log("redirect above")
        navigate(data.redirect)
      }
    }
  }
  return (
    <>
    <div className='lg:w-full h-full flex flex-col items-center justify-center'>
      <div className='bg-linear-to-r from-blue-50 via-white to-white border border-white lg:w-110 w-[90vw] h-130 rounded-sm mt-10 flex flex-col items-center gap-5 shadow-2xl'>
        <p className='font-extrabold text-3xl text-zinc-700 mt-10'>Create an account</p>
        <form className='flex flex-col items-center gap-4' onSubmit={handlesubmit}>
          <input type="text" name="name" placeholder='Full name' onChange={(e)=>setformdata({...formdata,name:e.target.value})} spellCheck={false} autoCorrect='off' autoComplete='off' className="lg:w-90  h-11 px-4 rounded-xl 
           bg-white border border-gray-200 
           text-sm text-gray-700 placeholder-gray-400
           shadow-sm
           focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500
           transition" required/>
          <input type="email" name="email" placeholder='email' autoComplete='off' spellCheck={false} autoCorrect='off' onChange={(e)=>setformdata({...formdata,email:e.target.value})} className="lg:w-90 h-11 px-4 rounded-xl 
           bg-white border border-gray-200 
           text-sm text-gray-700 placeholder-gray-400
           shadow-sm
           focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500
           transition" required />
          <input type="text" name="upi" placeholder='upi id (optional)' autoComplete='off' spellCheck={false} autoCorrect='off' onChange={(e)=>setformdata({...formdata,upi:e.target.value})} className="lg:w-90 h-11 px-4 rounded-xl 
           bg-white border border-gray-200 
           text-sm text-gray-700 placeholder-gray-400
           shadow-sm
           focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500
           transition"  />
          <input type="password" name="password" placeholder='Password' autoComplete='off' spellCheck={false} autoCorrect='off' className="lg:w-90 h-11 px-4 rounded-xl 
           bg-white border border-gray-200 
           text-sm text-gray-700 placeholder-gray-400
           shadow-sm
           focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500
           transition" onChange={(e)=>setformdata({...formdata,password:e.target.value})} required/>
          <input type="password" name="cnfrm" placeholder='Confirm password' autoComplete='off' spellCheck={false} autoCorrect='off' className="lg:w-90 h-11 px-4 rounded-xl 
           bg-white border border-gray-200 
           text-sm text-gray-700 placeholder-gray-400
           shadow-sm
           focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500
           transition" onChange={(e)=>setformdata({...formdata,cnfrm:e.target.value})} required/>
          <input type="submit" className='w-fit h-9 bg-blue-600 hover:bg-blue-700 text-white font mt-5 p-2 rounded-sm text-sm hover:cursor-pointer' value="Create account" />
        </form>
        {!matchpass&& <div className="text-red-400 text-sm">Please confirm your password</div>}
        {exists && (
  <p className="text-sm text-red-600 mt-2">
    This email is already registered. Please use a different email or log in.
  </p>
)}
        <div className='text-[10px] text-gray-400 flex  lg:gap-1'><p>*By submitting, you declare that you have read the</p>
        <a href="" className='text-[10px] text-nowrap text-blue-400'>Terms and Conditions</a></div>
      </div>
    </div>
    {/* <Routes>
      <Route path={'/login'} element={<Login />}></Route>
    </Routes> */}
    </>
  )
}

export default signup
