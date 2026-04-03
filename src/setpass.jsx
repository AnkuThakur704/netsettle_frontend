import { useState,useEffect } from "react"
import {useNavigate} from "react-router-dom"
const api = import.meta.env.VITE_URL;

const Setpass = () => {
    const navigate  = useNavigate()
    const [formdata, setformdata] = useState({})
    const [validlink, setvalidlink] = useState(false)
    const [seepass, setseepass] = useState(false)
    const [email, setemail] = useState("")
    const handlesubmit = async()=>{

    }
    const verifytoken = async(email,token)=>{
        const r = await fetch(`${api}/verifypasstoken`,{method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                token:token,
                email: email
            })
        })
        const data = await r.json()
        if(data.success){
            setvalidlink(data.valid)
        }
    }
    const submitnewpass = async(e)=>{
        e.preventDefault()
        console.log("formdata newpass: ",formdata)
        const r = await fetch(`${api}/updatepass`,{method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                email: email,
                newpass: formdata.newpass,
            })
        })
        const data  = await r.json()
        if(data.success){
            navigate(data.redirect)
        }
    }
    useEffect(() => {
        const params = new URLSearchParams(window.location.search)
const token = params.get("token")
const eml =params.get("email")
setemail(eml)
      console.log(token)
      verifytoken(eml,token.toString())
      console.log("token: ",typeof token.toString())
    }, [])
    
  return (
    <div className="flex flex-col items-center justify-center">
       {!validlink?<p className="text-red-400 mt-50 text-xl">Reset link is either expired or is invalid</p>:<div className="flex flex-col items-center">
        <p className='font-bold lg:text-3xl text-2xl text-zinc-700 mt-20'>Reset Password</p>
      <form onSubmit={handlesubmit} className='flex flex-col items-center gap-7 mt-10'>
        <div className="flex flex-col items-start gap-2">
            <label htmlFor="newpass" className="text-gray-600">Enter new password</label>
        <div className="relative">
            <input type={seepass?"text":"password"}  name="newpass" placeholder="new password" onChange={(e)=>setformdata({...formdata,newpass:e.target.value})} spellCheck={false} autoCorrect='off'  className="lg:w-90 h-11 px-4 rounded-xl 
           bg-white border border-gray-200 
           text-sm text-gray-700 placeholder-gray-400
           shadow-sm
           focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500
           transition" required />
           <button type="button" className="w-5 absolute top-3 right-2 " onClick={()=>setseepass(!seepass)}> <img className="grayscale opacity-60" src={!seepass?"/openeye.png":"/closedeye.png"} alt="" />
           </button>
        </div>
        </div>
           
            <input type="submit" onClick={submitnewpass} className='w-fit h-9 bg-blue-600 hover:bg-blue-700 text-white font mt-5 p-2 px-5 rounded-sm text-sm hover:cursor-pointer' value="Send reset token" />
        
      </form></div>}
    </div>
  )
}

export default Setpass
