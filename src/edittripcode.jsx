import React from 'react'
import { useParams } from 'react-router-dom'
import { useContext,useState,useEffect } from "react"
import { LoggedInctx } from "./App"
const api = import.meta.env.VITE_URL;
const Edittrip = () => {
    const {loggedIn, setloggedIn,loggeduser} = useContext(LoggedInctx)
    const [openadd, setopenadd] = useState(false)
    const {tripcode} = useParams()
    const [formdata, setformdata] = useState({amount:0,paidfor:"",paidby:"",paidbyuid:""})
    const [tripname, settripname] = useState("")
    const [members, setmembers] = useState([])
    const [adderror, setadderror] = useState(false)
    const [expenses, setexpenses] = useState([])
    const [balances, setbalances] = useState([])
    const [pb, setpb] = useState("")
    const [rusure, setrusure] = useState(false)
    const [stlmnt, setstlmnt] = useState([])
    const [freeze, setfreeze] = useState(false)
    const onreload = async()=>{
        const r = await fetch(`${api}/edittrip/${tripcode}`,{method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            credentials:"include",
            body:JSON.stringify({
                name:"",
                email:""
            })
        })
        const data =  await r.json()
        if(data.logcheck){
            setloggedIn(true)
            settripname(data.tripname)
            setmembers(data.members)
            setexpenses(data.expenses)
            setbalances(data.balances)
            
            setstlmnt(data.s)
            setfreeze(data.freezed)
        }
    }

    const handleclick= async(e)=>{
      e.preventDefault()
      if(formdata.amount===""||formdata.amount<=0||formdata.paidfor.trim()===""||formdata.paidby==""){
        setadderror(true)
      }
      else{
        console.log(formdata)
        setopenadd(false)
        const rex = await fetch(`${api}/addexpense`,{method:"POST",
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify({
            tripCode: tripcode,
            amount: formdata.amount,
            paidfor:formdata.paidfor,
            paidby:formdata.paidby,
            n:members.length,
            paidbyuid:formdata.paidbyuid,
            members:members
          })
        })
        console.log("paid by: ",pb )
        onreload()
      }
    }

    const settletrip = async()=>{
      setrusure(false)
      const r = await fetch(`${api}/settletrip`,{method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          tripCode:tripcode,
          balances: balances,
          members:members
        })
      })

      const data = await r.json()
      if(!data.success){

      }
      else{
      
        setfreeze(true)
         
       
      }
    }

    const checkmem = ()=>{
      console.log("this is from checkmem: ",members,"  ",expenses)
      if(members.length>1&&expenses.length!=0){
        console.log("valid mems and amt")
        setrusure(true)
      }
    }

    useEffect(() => {
       if(stlmnt.length!=0) console.log("s.p: ",stlmnt[0].p)
       console.log(typeof stlmnt)
    }, [members,expenses,balances,stlmnt])
    
    useEffect(() => {
      onreload()
    }, [])
    useEffect(() => {
      
    onreload()
    
    }, [freeze])
    
    return (
    <div className='w-full lg:min-h-[85vh] h-fit text-black flex  items-center  justify-center '>
      {!openadd?<><div className='flex flex-col items-center justify-center lg:w-full  h-full gap-10 mt-5'>
        <div className='lg:w-[60vw] w-[95vw] relative bg-white min-h-[80vh] h-fit border border-blue-200 rounded-xl shadow-lg shadow-blue-200 flex flex-col items-center gap-7 p-8'>
        <div className='flex  gap-10'>
          <p className='font-extrabold text-blue-500 lg:text-4xl text-3xl overflow-hidden lg:max-w-full max-w-[35vw]'>{tripname}</p>
         {freeze&&<div className="inline-flex items-center gap-2 px-2 py-1 rounded-2xl
  bg-linear-to-br from-cyan-100 to-blue-200
  border border-cyan-300
  shadow-md shadow-cyan-300/40
  text-blue-700 font-semibold text-sm">
   Freezed
</div>}
        </div>
      <div className='flex lg:w-47 w-37 h-7 p-2 rounded-2xl border text-[14px]  border-gray-400 bg-gray-50 items-center gap-7'>
        <p className='text-blue-500 text-xs text-nowrap'>Trip Code</p>
        <p className='text-blue-400 text-xs'>{tripcode}</p>
      </div>
      <ul className='flex lg:gap-2.5 gap-1.5'  >
        {members.length === 0 ? (
  <p>No members yet</p>
) : (
  members.map((m,i) => <li key={i} className='relative group w-fit lg:py-2 py-1 lg:text-sm text-[9px] flex gap-1 rounded-xl lg:px-2 px-1 h-fit bg-linear-to-r from-blue-50 via-white to-white shadow-lg text-blue-500 border border-blue-300'>
    <p>{m.name}</p>

  {!freeze&&<div> {balances.length===0?<p>0</p>:<p className={balances[i].bal>=0?"w-fit rounded-2xl border bg-green-100 text-green-700 border-green-700 lg:px-1.5 px-0.5":"w-fit rounded-2xl border border-red-500 text-red-500 bg-red-100 lg:px-1.5 px-0.5"}>{Math.round(balances[i].bal)}</p>}</div>}
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
    {m.uid}
  </span>
  </li>)
)}
      </ul>
     {!freeze&&<button className=" absolute lg:top-38 lg:right-20 top-7 right-5 text-white bg-blue-500 box-border border border-transparent hover:bg-blue-600 focus:ring-4 shadow-xs font-medium leading-5 rounded-sm lg:text-sm text-xs lg:px-4 lg:py-2.5 px-1.5 py-1 focus:outline-none " onClick={()=>setopenadd(true)}>Add expense</button>}
      <div className='lg:w-[55vw] w-[90vw] min-h-[20vh] max-h-[50vh] border border-gray-300 rounded-2xl shadow-lg overflow-y-auto'>
        <div className='flex lg:gap-20 gap-7 items-center justify-start p-3 border-b border-b-gray-300 bg-linear-to-r from-blue-50 via-white to-white'>
          <p className='text-zinc-600 font-bold lg:text-[15px] text-[13px] w-20'>S.No.</p>
          <p className='text-zinc-600 lg:text-[15px] text-[13px] font-bold w-45'>Paid By</p>
          <p className='w-30 text-zinc-600 lg:text-[15px] text-[13px] font-bold'>Amount</p>
          <p className='w-25 text-zinc-600 lg:text-[15px] text-[13px] font-bold'>For</p>
        </div>
        <ul>
          {expenses.length==0?<li className='text-center mt-5 lg:text-3xl font-extrabold text-gray-400'>Saving for a car?</li>:expenses.map((m,i)=>{
            return( <li key={i} className='flex lg:gap-20 gap-7 items-center justify-start p-3 border-b border-b-gray-300'>
               <p className='text-gray-400 lg:text-[15px] text-[13px]  w-20'>{i+1}.</p>
          <p className='text-blue-500 lg:text-[15px] text-[13px] font-medium  w-45'>{m.paidby}</p>
          <p className=' text-blue-600 lg:text-[15px] text-[13px] font-medium  w-30 '>₹{m.amount}/-</p>
          <p className=' text-blue-500  lg:text-[15px] text-[13px] w-25 '>{m.paidfor}</p>
            </li>)
          })}
          
        </ul>
      </div>
       {!freeze&&<button onClick={()=>checkmem()} className="  text-white bg-blue-500 box-border border border-transparent hover:bg-blue-600 focus:ring-4 shadow-xs font-medium leading-5 rounded-sm text-sm px-6 py-4 focus:outline-none">Settle this trip</button>}
       {stlmnt.length!=0&&<div className="lg:w-full w-[90vw] max-w-2xl lg:mx-auto mt-10 lg:p-8 p-3 rounded-3xl bg-white shadow-[0_8px_30px_rgba(0,0,0,0.08)] border border-gray-200 flex flex-col gap-7"
>
        <p className="lg:text-2xl text-lg font-extrabold bg-linear-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent tracking-tight"

>Settlement for the trip</p>
        {stlmnt.map((item,i)=>{
          return(<div key={i} className="lg:w-full w-[85vw]  flex items-center justify-between lg:p-5 p-2.5 rounded-2xl bg-linear-to-r from-gray-50 to-white border border-gray-200 hover:scale-[1.01] hover:shadow-md transition-all duration-200 overflow-x-auto"
><p className="lg:text-base text-sm  font-medium text-gray-700">
  <span className="font-bold text-blue-600 text-nowrap">{item.p}</span>

  <span className="mx-1 text-gray-500">pays</span>

  <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 font-extrabold text-sm shadow-sm">
    ₹{item.amt.toFixed(2)}
  </span>

  <span className="mx-1 text-gray-500">to</span>

  <span className="font-bold text-indigo-600 text-nowrap">{item.r}</span>
</p>
</div>)
        })} 
       </div>}
      </div>
     </div></>:<><div className="relative w-full max-w-md bg-white shadow-2xl border border-gray-200 rounded-3xl p-8 flex flex-col gap-7">

  {/* Close Button */}
  <button onClick={() => setopenadd(false)}>
    <img
      src="/closeicon.png"
      alt=""
      className="absolute top-6 right-6 w-5 opacity-70 hover:opacity-100 hover:scale-110 transition"
    />
  </button>

  {/* Header */}
  <div className="text-center">
    <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
      Add New Expense
    </h2>
    <p className="mt-2 text-sm text-gray-500">
      Enter the details of this payment to keep the trip balanced.
    </p>
  </div>

  {/* Form */}
  <form className="flex flex-col gap-5">

    {/* Amount */}
    <input
      type="number"
      name="amount"
      placeholder="Amount (₹)"
      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm
                 focus:ring-2 focus:ring-blue-500 focus:outline-none"
      autoComplete="off"
      spellCheck={false}
      onChange={(e) =>
        setformdata({ ...formdata, amount: e.target.value })
      }
    />

    {/* Paid For */}
    <input
      type="text"
      name="paidfor"
      placeholder="Paid for (e.g. Food, Hotel, Travel)"
      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm
                 focus:ring-2 focus:ring-blue-500 focus:outline-none"
      autoComplete="off"
      spellCheck={false}
      onChange={(e) =>
        setformdata({ ...formdata, paidfor: e.target.value })
      }
    />

    {/* Paid By */}
    <div className="w-full flex items-center justify-between px-4 py-3 rounded-xl border border-gray-200 text-sm">
      <label htmlFor="paidby" className="text-gray-500 font-medium">
        Paid By
      </label>

      <select
        id="paidby"
        name="paidby"
        className="outline-none text-gray-700 font-medium bg-transparent"
        onChange={(e) =>
          setformdata({
            ...formdata,
            paidby: JSON.parse(e.target.value).mname,
            paidbyuid: JSON.parse(e.target.value).muid,
          })
        }
      >
        <option value="" disabled selected>
          Select Member
        </option>

        {members.map((m, i) => {
          return (
            <option
              key={i}
              value={JSON.stringify({ mname: m.name, muid: m.uid })}
            >
              {m.name}
            </option>
          );
        })}
      </select>
    </div>

    {/* Submit */}
    <button
      className="w-full py-3 rounded-xl bg-blue-600 text-white font-semibold
                 hover:bg-blue-700 transition shadow-md"
      onClick={handleclick}
    >
      Save Expense
    </button>
  </form>

  {/* Error */}
  {adderror && (
    <p className="text-sm text-red-500 font-medium text-center">
      Please fill valid details before continuing.
    </p>
  )}
</div>
</>}
      {rusure && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
    
    <div className="w-full max-w-md rounded-2xl bg-white p-7 shadow-xl border border-gray-200">
      
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-gray-900 tracking-tight">
          Confirm Settlement
        </h2>

        <p className="mt-3 text-sm text-gray-500 leading-relaxed">
          Are you sure you want to settle this trip?
          <br />
          <span className="text-red-500 font-medium">
            No changes can be made after this.
          </span>
        </p>
      </div>

      <div className="mt-7 flex gap-3">
        
        <button
          className="flex-1 rounded-xl bg-blue-600 text-white font-medium py-2.5 
                     hover:bg-blue-700 transition duration-200 shadow-sm"
          onClick={settletrip}
        >
          Yes, Continue
        </button>

        <button
          className="flex-1 rounded-xl border border-gray-300 bg-white text-gray-700 font-medium py-2.5 
                     hover:bg-gray-50 transition duration-200"
          onClick={() => setrusure(false)}
        >
          Cancel
        </button>

      </div>
    </div>

  </div>
)}

    </div>
  )
  
}

export default Edittrip


