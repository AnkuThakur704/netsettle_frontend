import { useState } from "react"
const api = import.meta.env.VITE_URL;
const Resetpass = () => {
    const [formdata, setformdata] = useState({email:""})
    const [formdata2, setformdata2] = useState({token:""})
    const [sent, setsent] = useState(false)
    const handlesubmit = async(e)=>{
        e.preventDefault()
        console.log(formdata)
        setsent(true)
        const r = await fetch(`${api}/sendtoken`,{method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({
                email:formdata.email
            })
        })
        // const d = await r.json()
        // console.log("email sent: ",d.success)
    }

    const checktoken = async(e)=>{
        e.preventDefault()
        const r = await fetch("",{method:"POST",
            headers:{"Content-Type":"application/json"},
        })
        console.log("checktoken")
    }
  return (
    <div className="flex flex-col items-center">
        <p className='font-bold lg:text-3xl text-2xl text-zinc-700 mt-20'>Enter your registered email Id</p>
      <form onSubmit={handlesubmit} className='flex flex-col items-center gap-7 mt-10'>
        <input type="email" disabled={sent} name="email" placeholder="email" onChange={(e)=>setformdata({...formdata,email:e.target.value})} spellCheck={false} autoCorrect='off'  className="lg:w-90  h-11 px-4 rounded-xl 
           bg-white border border-gray-200 
           text-sm text-gray-700 placeholder-gray-400
           shadow-sm
           focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500
           transition" required />
           
            {!sent&&<input type="submit" className='w-fit h-9 bg-blue-600 hover:bg-blue-700 text-white font mt-5 p-2 px-5 rounded-sm text-sm hover:cursor-pointer' value="Send reset token" />}
        
      </form>
      {sent&&/* {sent&&<form className="flex flex-col items-center gap-7 mt-10" onSubmit={checktoken}>
        <div className="flex flex-col items-Start gap-2">
            <label htmlFor="token" className="text-amber-600">Enter the token sent to your email</label>
            <input type="text" name="token" placeholder="Ex : 123 .  .   ." onChange={(e)=>setformdata2({...formdata2,token:e.target.value})} spellCheck={false} autoCorrect='off' autoComplete="off" className="lg:w-90  h-11 px-4 rounded-xl 
           bg-white border border-gray-200 
           text-sm text-gray-700 placeholder-gray-400
           shadow-sm
           focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500
           transition" required />
        </div>
           <input type="submit" className='w-fit h-9 bg-blue-600 hover:bg-blue-700 text-white font mt-5 p-2 px-5 rounded-sm text-sm hover:cursor-pointer' value="Verify token" />
      </form>} */
      <p className="text-amber-600 mt-4 text-center">The reset link has been sent to your email.
      <br /> The link is valid for 5 minutes after email has been sent.</p>}
    </div>
  )
}

export default Resetpass
