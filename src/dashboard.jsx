import { LoggedInctx } from './App'
import { useContext,useEffect,useState } from 'react'
import { useNavigate,Link } from 'react-router-dom'
const api = import.meta.env.VITE_URL;
const dashboard = () => {
  const navigate = useNavigate()
  const [tripcode, settripcode] = useState("")
   const [trips, settrips] = useState([])
  const {setloggedIn} = useContext(LoggedInctx)
  const [wlcm, setwlcm] = useState("")
  const [totals, settotals] = useState([])
  const [bal, setbal] = useState([])
  const [uemail, setuemail] = useState("")
  const [confrmdel, setconfrmdel] = useState(false)
  const [delcode, setdelcode] = useState("")
  const dashreload = async()=>{
    const r = await fetch(`${api}/dashboard`,{method:"POST",
      credentials:"include",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        email:" "
      })
    })
    const data = await r.json();
    console.log(data)
    setwlcm(data.nm)
    setuemail(data.email)
    setloggedIn(true)
    settrips(data.trips?data.trips:[])
    settotals(data.totals?data.totals:[])
    setbal(data.bal?data.bal:[])
    if(!data.success){
      setloggedIn(false)
      navigate(data.redirect)
    }
  }
  const edittrip = async(e)=>{
    settripcode(e.target.value)
    // const r = await fetch(`http://localhost:8080/edittrip/${e.target.value}`,{method:"POST",
    //   headers:{
    //     "Content-Type":"application/json"
    //   },
    //   credentials:"include"
    // })
    navigate(`/edittrip/${e.target.value}`)
  }

  const deltrip = async(tripCode)=>{
    setconfrmdel(false)
    const dr = await fetch(`${api}/deltrip`,{
      method:"DELETE",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        tripCode:tripCode,
        email:uemail
      })
    })
    const dres = await dr.json()
    if(dres.success){
      const updatedtrips =  trips.filter((i)=>
        i.tripCode!=tripCode
      )
      updatedtrips.reverse()
      settrips(updatedtrips)
    }
  }

  useEffect(() => {
    dashreload()
  }, [])


  
  // useEffect(() => {
  //  console.log("wlcm: ",wlcm)
  //  dashreload()
  // }, [wlcm,trips,totals,bal])
  

  return (
    <>
     <div className='w-full h-fit text-black lg:bg-[#F7F9FC] overflow-x-hidden'>
     <div className='flex flex-col gap-2 items-center lg:ml-10 ml-0 pt-6'>
      <div className=" flex flex-col justify-center items-center">
  <p className="lg:text-5xl text-2xl font-extrabold tracking-tight text-gray-900">
    Welcome,{" "}
    <span className="text-blue-600">{wlcm}</span> 
  </p>

  <p className="lg:mt-3 mt-2 lg:text-lg text-sm text-gray-500">
    Here’s a quick look at your active trips and past trips.
  </p>
</div>


      <Link to={'/new-trip'} className='bg-green-400 mt-6 text-[#1E293B] font-bold rounded-xl p-2 px-5 hover:cursor-pointer hover:outline-3 hover:outline-green-300'>Go for a trip</Link>
     </div>
     <div className='w-full h-full lg:flex items-center flex flex-col justify-center lg:mt-10 mt-2' >
      <div className='shadow-xl rounded-xl bg-white lg:w-270 w-100 h-fit min-h-[30vh] p-10'>
        <div><div className="flex items-center gap-3 mb-6">
  <div className="w-1.5 h-8 rounded-full bg-blue-600"></div>
  <p className="text-3xl font-semibold text-gray-900">
    Your Trips
  </p>
</div>

        <ul className='grid lg:grid-cols-3 grid-cols-1  lg:gap-6 gap-6  lg:w-full  h-fit   lg:overflow-y-hidden'>
          { (trips.length===0)?<li className='text-black mb-50 flex w-full h-fit flex-col items-center relative'>
            <p className='text-xl text-gray-600 mt-20 absolute -top-7.5'>No trips yet? </p><img src="/notrips.png" alt="No Trips yet" className='
         w-70' /></li>:trips.reverse().map((item,i)=>{
          const spent = totals.find((t)=>t.tripCode===item.tripCode)
          const balance = bal.find((b)=>b.tripCode===item.tripCode)
          
            return(
              <li key={i} className='flex flex-col items-center gap-3.5 p-5 shadow-lg rounded-2xl mt-5 border w-full lg:h-98   border-blue-400'>
                <img src="netSettleLogo.png" className='w-70 h-20 object-cover mb-3.5' alt="" />
            <div className='flex items-center justify-center gap-3'>
              <p className='text-2xl font-bold'>{item.tripName}</p>
              {item.freezed&&<div className="px-3 py-1 text-xs font-semibold text-blue-700 rounded-full 
               bg-linear-to-r from-blue-100 via-white to-blue-200
                border border-blue-200 shadow-sm backdrop-blur-md">
  Settled
</div>
}
            </div>
           <div className="relative group flex w-45 h-7 p-2 rounded-2xl border border-gray-400 bg-gray-50 items-center gap-7">
  <p className="text-sm font-bold text-blue-500">Trip Code</p>
  <p className="text-sm text-blue-400">{item.tripCode}</p>

  <span
    className="
      absolute top-full left-1/2 -translate-x-1/2 mb-2
      opacity-0 group-hover:opacity-100
      transition-opacity duration-200
      bg-black text-white text-xs px-2 py-1 rounded
      whitespace-nowrap
      pointer-events-none
    "
  >
    Share this with your friends
  </span>
</div>

            <p className='text-sm'>You and {item.members.length -1} others</p>
            <div className='w-75 border border-gray-200'></div>
            <div className='flex items-center gap-10'>
              <p className='font-medium'>Total: ₹{spent?Math.round(spent.total):0}</p>
              <div className={(balance&&(balance.amt>=0))?"w-20 h-7 flex items-center justify-center rounded-xl bg-green-400":"w-20 h-7 flex items-center justify-center rounded-xl bg-red-400"}>
                <p className='text-white font-bold'>₹{balance?Math.round(balance.amt):0}</p>
              </div>
            </div>
            {item.freezed?<div className='flex items-center gap-7'>
              <button value={item.tripCode} onClick={edittrip} className='flex flex-col items-center hover:cursor-pointer bg-blue-400 text-white font-bold gap-3.5 p-2 py-4 shadow-lg rounded-2xl mt-5 border w-30 border-gray-200 text-sm'>
             Trip History
            </button>
            <button className='flex flex-col items-center hover:cursor-pointer bg-red-400 text-white font-bold gap-3.5 p-2 py-4 shadow-lg rounded-2xl mt-5 border w-30 border-gray-200 text-sm' onClick={()=>{setconfrmdel(true);setdelcode(item.tripCode)}}>Delete</button>
            </div>:<button value={item.tripCode} onClick={edittrip} className='flex flex-col items-center hover:cursor-pointer bg-blue-400 text-white font-bold gap-3.5 p-5 shadow-lg rounded-2xl mt-5 border w-75 border-gray-200'>
            Edit
            </button>}
          </li>
            )
          })}
        </ul>
        </div>
      </div>
     </div>
     {confrmdel && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
    
    <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
      
      <p className="text-xl font-semibold text-gray-900">
        Delete this trip?
      </p>

      <p className="mt-2 text-sm text-gray-500">
        This will permanently remove the trip and all its expenses. This action cannot be undone.
      </p>

      <div className="mt-6 flex justify-end gap-3">
        
        <button
          onClick={() => {
            setconfrmdel(false);
          }}
          className="px-4 py-2 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
        >
          Cancel
        </button>

        <button
          onClick={() => {
            deltrip(delcode)
          }}
          className="px-4 py-2 rounded-xl bg-red-500 text-white font-medium hover:bg-red-600 transition"
        >
          Delete
        </button>

      </div>
    </div>
  </div>
)}

     </div></>
  )
}
export default dashboard
//className='w-20 h-7 flex items-center justify-center rounded-xl bg-green-400 '