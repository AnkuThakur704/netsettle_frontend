import { useEffect } from "react"
import { useContext, useState } from "react"
import { LoggedInctx } from "./App"
import { useNavigate } from "react-router-dom"
const api = import.meta.env.VITE_URL;
const Newtrip = () => {
    const [formdata, setformdata] = useState({})
    const [joindata, setjoindata] = useState({})
    const [alreadyJoined, setalreadyJoined] = useState(false)
    const [invalidCode, setinvalidCode] = useState(false)
    const [user, setuser] = useState({})
    const [invaliname, setinvaliname] = useState(false)
    const navigate = useNavigate()

    const handlesubmit = async (e) => {
        setinvalidCode(false)
        setalreadyJoined(false)
        setinvaliname(false)
        e.preventDefault()
        if (formdata.tripName.trim() != "") {
            const tr = await fetch(`${api}/routes/addtrip`, {
                method: "POST",
                credentials:"include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    tripName: formdata.tripName,
                })
            })
            const tdata = await tr.json();
            if (tdata.success) {
                navigate(tdata.redirect)
            }
            else {
                navigate(tdata.redirect)
            }
        }
        else {
            setinvaliname(true)
        }

    }

    const handlesubmitofJoin = async (e) => {
        setinvalidCode(false)
        setalreadyJoined(false)
        setinvaliname(false)
        e.preventDefault()
        if (joindata.tripCode.trim() === "") {
            setinvalidCode(true)
        }
        else {
            setinvalidCode(false)
            const r = await fetch(`${api}/routes/jointrip`, {
                method: "POST",
                credentials:"include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    tripCode: joindata.tripCode.trim(),
                        email: "",
                        name: ""
                })
            })
            const data = await r.json()
            if (data.success) {
                if (data.alreadyJoined) {
                    setalreadyJoined(true)
                }
                else {
                    navigate(data.redirect)
                }
            }
        }
    }


    return (
        <div className="bg-gray-100 w-full  h-screen flex flex-col items-center">
            <div className=" lg:w-120 lg:h-130 w-90 h-120 shadow-lg border border-green-200 lg:mt-20 mt-0 border-t-8 border-t-green-300 rounded-xl flex flex-col items-center gap-6">
                <p className="font-extrabold text-4xl mt-10 mb-5 text-green-600">GO!</p>
                <form className="flex flex-col items-center gap-7" >
                    <input type="text" name="tripName" placeholder="Give it a name" className="border w-70 h-15 border-gray-200 text-sm p-2 focus:outline-none rounded-2xl text-gray-450 focus:text-sm focus:text-gray-500" autoComplete="off" spellCheck={false} onChange={(e) => setformdata({ tripName: e.target.value })} />
                    <button className="text-white bg-blue-500 box-border border border-transparent hover:bg-blue-600 focus:ring-4  shadow-xs font-medium leading-5 rounded-sm text-sm px-4 py-2.5 focus:outline-none" onClick={handlesubmit} >Make Trip</button>
                    <div className="flex h-0 items-center gap-2">
                        <div className="border border-gray-200 lg:w-55"></div>
                        <p className="text-gray-500">OR</p>
                        <div className="border border-gray-200 lg:w-55"></div>
                    </div>
                    <input type="text" name="tripName" placeholder="Enter the trip code" className="border w-70 h-15 border-gray-200 text-sm p-2 focus:outline-none rounded-2xl text-gray-450 focus:text-sm focus:text-gray-500" autoComplete="off" spellCheck={false} onChange={(e) => setjoindata({ tripCode: e.target.value })} />
                    <button className="text-white bg-blue-500 box-border border border-transparent hover:bg-blue-600 focus:ring-4  shadow-xs font-medium leading-5 rounded-sm text-sm px-4 py-2.5 focus:outline-none" onClick={handlesubmitofJoin} >Join Trip</button>
                    {(invalidCode || invaliname) && <p className="text-red-400 ">Invalid entry</p>}
                    {alreadyJoined && <p className="text-green-700">Dang!! you are already in this trip</p>}
                </form>
            </div>
        </div>
    )
}

export default Newtrip
