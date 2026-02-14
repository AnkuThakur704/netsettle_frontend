import { LoggedInctx } from './App'
import { useContext,useEffect,useState } from 'react'
import {QRCodeSVG} from "qrcode.react"
const api = import.meta.env.VITE_URL;
//settled trips(freezed: true)
//middewre
//
function SettleUp() {
    const {loggeduser,setloggedIn} = useContext(LoggedInctx)
    const [stl, setstl] = useState([])
    const [total, settotal] = useState(0)
    const [pay, setpay] = useState(false)
    const [paylink, setpaylink] = useState([])
    const [rtotal, setrtotal] = useState(0)
    const [rec, setrec] = useState([])
    const [recmodal, setrecmodal] = useState(false)
    const [currpayer, setcurrpayer] = useState({})
    const onreload = async()=>{
        const r = await fetch(`${api}/settleup`,{method:"POST",
            headers:{
                "Content-Type":"application/json"},
            credentials:"include",
            body:JSON.stringify({

            })
        })
        const rr = await fetch(`${api}/recieve`,{method:"POST",
          headers:{
            "Content-Type":"application/json"
          },
          credentials:"include"
          
        })
        const data =  await r.json();
        const rdata = await rr.json()
        if(data.success){
            console.log("s data: ",data)
            setstl(data.s)
            settotal(data.total)
            setloggedIn(true)
        }
        if(rdata.success){
          setrtotal(rdata.rtotal)
          setrec(rdata.rs)
        }
    }

    const handleReceivedPayment = async()=>{
      setrecmodal(false)
      const r = await fetch(`${api}/recieved`,{method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body: JSON.stringify({
          email:currpayer.r,
          payer:currpayer.p,
          tripCode:currpayer.tripCode
        })
      })
      const data = await r.json()
      if(data.success){
        onreload()
      }
    }

    useEffect(() => {
      onreload()
    }, [])
    
    
    
    return(
        <>
        <div className="w-full max-w-5xl mx-auto px-6 py-10">

  <div className="mb-10">
    <p className="lg:text-4xl text-2xl font-semibold text-gray-900 tracking-tight">
      Pending Settlements
    </p>

    <p className="mt-2 lg:text-lg text-sm text-gray-500">
      You need to pay a total of{" "}
      <span className="font-semibold text-blue-600">₹{total.toFixed(2)}</span>{" "}
      across{" "}
      <span className="font-semibold text-gray-800">{stl.length}</span>{" "}
      settlements
    </p>
  </div>

  <div className="rounded-3xl border  border-gray-200 bg-white shadow-sm lg:p-8 p-4">

    <p className="lg:text-2xl text-lg font-semibold text-gray-900 lg:mb-6 mb-3">
      Settle up
    </p>

    <ul className="space-y-4 flex flex-col items-center">
      {stl.length === 0 ? (
        <p className="text-gray-500 text-sm">
          All cleared. No pending settlements.
        </p>
      ) : (
        stl.map((item, i) => {
          return (
            <li
              key={i}
              className="lg:w-full w-fit flex items-center justify-between lg:p-5 p-3 rounded-2xl 
                         border border-gray-200 bg-linear-to-r from-blue-50 via-white to-white
                         hover:shadow-md hover:scale-[1.01] transition-all duration-200"
            >
              <div className="flex flex-col gap-1">
                <p className="lg:text-lg text-sm font-medium text-gray-900">
                  {item.rname}
                </p>

                <p className="lg:text-sm text-xs text-gray-500 text-nowrap">
                  Trip:{" "}
                  <span className="font-medium text-gray-700">
                    {item.tripName}
                  </span>{" "}
                  • Code: {item.tripCode}
                </p>
              </div>

              <div className="flex items-center gap-6">
                <p className="lg:text-lg text-xs font-semibold text-gray-900">
                  ₹{item.amt.toFixed(2)}
                </p>

                <button  onClick={()=>{setpay(true)
                setpaylink({upi:item.upi,amt:item.amt,rname:item.rname})
                }}
                  className="lg:px-5 lg:py-2.5 p-2 rounded-xl lg:text-[16px] text-xs bg-blue-600 text-white font-medium
                             hover:bg-blue-700 text-nowrap transition duration-200 shadow-sm hover:cursor-pointer"
                >
                  Pay Now
                </button>
              </div>
            </li>
          );
        })
      )}
    </ul>
  </div>
  {/* this is recieve section */}
  <div className="mb-10 mt-10">
    <div className="w-full lg:w-fit lg:text-4xl text-2xl font-semibold text-gray-900 tracking-tight flex items-center gap-2">
      <p>Pending Payments</p> <p className=''>to You</p>
    </div>

    <p className="mt-2 lg:text-lg text-sm text-gray-500">
      You get a total of{" "}
      <span className="font-semibold text-blue-600">₹{rtotal.toFixed(2)}</span>{" "}
      across{" "}
      <span className="font-semibold text-gray-800">{rec.length}</span>{" "}
      payments
    </p>
  </div>

  <div className="rounded-3xl border border-gray-200 bg-white shadow-sm lg:p-8 p-4">

  <p className="lg:text-2xl text-lg font-semibold text-gray-900 lg:mb-6 mb-3">
    Confirm Recieved Payments
  </p>

  <ul className="space-y-4 flex flex-col items-center">
    {rec.length === 0 ? (
      <p className="text-gray-500 text-sm">
        All cleared. No pending payments to you.
      </p>
    ) : (
      rec.map((item, i) => {
        return (
          <li
            key={i}
            className="lg:w-full w-fit flex items-center justify-between lg:p-5 p-3 rounded-2xl 
                       border border-gray-200 bg-linear-to-r from-blue-50 via-white to-white
                       hover:shadow-md hover:scale-[1.01] transition-all duration-200 "
          >
            <div className="flex flex-col gap-1">
              <p className="lg:text-lg text-sm font-medium text-gray-900">
                {item.pname}
              </p>

              <p className="lg:text-sm text-xs text-gray-500 text-nowrap">
                Trip:{" "}
                <span className="font-medium text-gray-700">
                  {item.tripName}
                </span>{" "}
                • Code: {item.tripCode}
              </p>
            </div>

            <div className="flex items-center gap-6">
              <p className="lg:text-lg text-xs font-semibold text-gray-900">
                ₹{item.amt.toFixed(2)}
              </p>

              <button
                onClick={() => {
                  setrecmodal(true);
                  setcurrpayer({
                    tripCode: item.tripCode,
                    r: item.remail,
                    p: item.pemail,
                  });
                }}
                className="lg:px-5 lg:py-2.5 p-2 rounded-xl bg-green-400 lg:text-[16px] text-xs text-white font-medium
                           hover:bg-green-600 transition duration-200 shadow-sm hover:cursor-pointer"
              >
                Recieved
              </button>
            </div>
          </li>
        );
      })
    )}
  </ul>
</div>

  {/* this is recieve section */}

 {pay && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
    
    <div className="w-full max-w-md rounded-2xl bg-white shadow-xl border border-gray-200 p-6">
      
      <div className="flex items-center justify-between mb-6">
        <p className="text-xl font-semibold text-gray-900">
          Complete Payment
        </p>

        <button
          onClick={() => setpay(false)}
          className="w-9 h-9 flex items-center justify-center rounded-full 
                     hover:bg-gray-100 text-gray-500 transition"
        >
          ✕
        </button>
      </div>

      <div className="space-y-5">

        {/* QR Section */}
        <div className="p-5 rounded-2xl border border-gray-200 bg-linear-to-br from-blue-50 to-white">
          
          <div className="w-full flex justify-center mb-4">
            <div className="p-3 rounded-xl bg-white shadow-sm border border-gray-200">
              <QRCodeSVG
                size={180}
                value={`upi://pay?pa=${paylink.upi}&pn=${paylink.rname}&am=${paylink.amt}&cu=INR`}
              />
            </div>
          </div>

          <p className="font-medium text-gray-900 text-center">
            Scan QR Code
          </p>

          <p className="text-sm text-gray-500 text-center mt-1">
            Use Google Pay or PhonePe to scan and pay instantly.
          </p>
        </div>

        {/* UPI App Section */}
        <div className="p-5 rounded-2xl border border-gray-200 bg-white">
          <p className="font-medium text-gray-900 mb-1">
            Open UPI App
          </p>

          <p className="text-sm text-gray-500 mb-4">
            Pay directly using your installed UPI app.
          </p>

          <button onClick={() => {
  window.location.href = `upi://pay?pa=${paylink.upi}&pn=${paylink.rname}&am=${paylink.amt}&cu=INR`;
}}
            className="w-full py-2.5 rounded-xl bg-blue-600 text-white font-medium
                       hover:bg-blue-700 transition shadow-sm"
          >
            Continue
          </button>
        </div>

      </div>
    </div>
  </div>
)}
{recmodal && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
    <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl border border-gray-200 p-6">

      {/* Header */}
      <div className="flex items-start justify-between mb-5">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Confirm Payment Received
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            This will mark the payment as completed and remove it from pending.
          </p>
        </div>

        <button
          onClick={() => setrecmodal(false)}
          className="w-9 h-9 flex items-center justify-center rounded-full 
                     hover:bg-gray-100 text-gray-500 transition"
        >
          ✕
        </button>
      </div>
      {/* Actions */}
      <div className="flex gap-3 justify-end">
        {/* Cancel */}
        <button
          onClick={() => setrecmodal(false)}
          className="px-4 py-2 rounded-xl border border-gray-300 
                     text-gray-700 font-medium hover:bg-gray-100 transition"
        >
          No, Cancel
        </button>

        {/* Confirm */}
        <button
          onClick={handleReceivedPayment}
          className="px-5 py-2 rounded-xl bg-green-600 
                     text-white font-semibold hover:bg-green-700 transition shadow-sm"
        >
          Yes, Mark as Received
        </button>
      </div>
    </div>
  </div>
)}



</div>

        </>
    )
}
export default SettleUp