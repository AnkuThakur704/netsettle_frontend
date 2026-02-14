import { useState,useEffect } from 'react'
import './App.css'
import Dashboard from './dashboard'
import { Routes, Route, Link,useNavigate} from 'react-router-dom';
import Signup from './signup';
import Login from './login';
import Navbar from './navbar.jsx';
import { createContext,useContext } from 'react';
import Newtrip from './newtrip.jsx';
import Edittrip from './edittripcode.jsx';
const api = import.meta.env.VITE_URL;
export const LoggedInctx = createContext();

function Home() {
  const navigate = useNavigate()
  const {loggedIn, setloggedIn,loggeduser} = useContext(LoggedInctx)
  const dashreload = async()=>{
    const r = await fetch(`${api}/home`,{method:"POST",
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
    if(data.sucess){
      navigate(data.redirect)
      setloggedIn(true)
    }
    navigate(data.redirect)
    if(!data.success){
      setloggedIn(false)
    }
  }
  useEffect(() => {
    dashreload()
  }, [])
  
  return(
    <>
    <div className='lg:w-full lg:h-full  flex flex-col items-center text-black bg-[#F7F9FC] overflow-x-hidden'>
        <div className='mt-10 flex flex-col items-center lg:gap-7 gap-2'>
          <h2 className="lg:text-5xl text-2xl font-extrabold text-slate-900">
            Travel together.
            <span className="text-indigo-500">Settle smarter.</span>
          </h2>
          <p className="lg:mt-6 mt-1 lg:text-lg text-sm lg:w-full w-[90vw] text-slate-600 max-w-2xl">
            Track shared expenses, split bills fairly, and enjoy your trip without money stress.
          </p>
        </div>
        <div className=' p-5 h-50 w-200  lg:flex lg:flex-row flex flex-col lg:gap-10 gap-3 items-center lg:justify-center lg:mb-0 mb-30'>
          <div className='bg-sky-50 border border-sky-200 rounded-2xl p-5 lg:w-140 w-[90vw] whitespace-nowrap shadow-lg'>
            <p className='text-xl font-bold text-sky-600'>Create a Trip</p>
            <p className='mt-2 lg:text-sm text-xs text-slate-600'>Add your friends and name the trip.</p>
          </div>
          <div className='bg-sky-50 border border-sky-200 rounded-2xl p-5 lg:w-140 w-[90vw] whitespace-nowrap shadow-lg'>
            <p className='text-xl font-bold text-sky-600'>Add expenses</p>
            <p className='mt-2 lg:text-sm text-xs text-slate-600'>Log who paid and who shared the cost.</p>
          </div>
          <div className='bg-sky-50 border border-sky-200 rounded-2xl p-5 lg:w-140 w-[90vw] whitespace-nowrap shadow-lg'>
            <p className='text-xl font-bold text-sky-600'>Settle up</p>
            <p className='mt-2 lg:text-sm text-xs text-slate-600'>NetSettle shows the simplest way to settle</p>
          </div>
        </div>
        <section className=" py-10">
          <div className="lg:max-w-6xl  mx-auto px-6">

            <div className="lg:w-full w-[95vw] rounded-3xl lg:p-10 p-5 md:p-14
                bg-sky-50
                border border-sky-200  shadow-lg">


              <h2 className="lg:text-4xl text-3xl md:text-5xl text-nowrap font-extrabold text-indigo-500">
                Why NetSettle?
              </h2>

              <p className="mt-4 lg:text-lg text-sm text-sky-600 max-w-2xl">
                Because money should never be the reason trips get awkward.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">

                <div>
                  <h3 className="lg:text-xl text-lg font-bold text-sky-600">
                    Edit without breaking things
                  </h3>
                  <p className="mt-2 lg:text-sm text-xs text-slate-700">
                    Change expenses anytime — balances stay correct automatically.
                  </p>
                </div>

                <div>
                  <h3 className="lg:text-xl text-lg font-bold text-sky-600">
                    Clear net balances
                  </h3>
                  <p className="mt-2 lg:text-sm text-xs text-slate-700">
                    Instantly see who owes money and who gets paid.
                  </p>
                </div>

                <div>
                  <h3 className="lg:text-xl text-lg font-bold text-sky-600">
                    Fewer payments
                  </h3>
                  <p className="mt-2 lg:text-sm text-xs text-slate-700">
                    We calculate the simplest way to settle — no chaos.
                  </p>
                </div>

                <div>
                  <h3 className="lg:text-xl text-lg font-bold text-sky-600">
                    Built for trips
                  </h3>
                  <p className="mt-2 lg:text-sm text-xs text-slate-700">
                    Designed for friends traveling together, not spreadsheets.
                  </p>
                </div>

              </div>

            </div>

          </div>
        </section>

        <section className="lg:mt-20 mt-5 bg-sky-50 p-10 lg:w-250 w-[98vw] rounded-2xl lg:h-160 h-fit border border-sky-200 shadow-lg flex flex-col items-center mb-20">
  
  <p className="lg:text-5xl text-2xl text-nowrap font-extrabold text-indigo-500 mb-12 mt-5">
    A quick look inside NetSettle
  </p>

  {/* Image Wrapper */}
  <div className="lg:w-full w-[99vw] flex justify-center">
    <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-xl bg-white p-3">
      <img
        src="/finalreference.png"
        alt="reference"
        className="rounded-xl object-contain lg:h-110 h-[20vh] hover:scale-[1.02] transition duration-300"
      />
    </div>
  </div>
</section>

        <section className="mb-20 py-8">
          <div className="max-w-4xl mx-auto px-6 text-center">

            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900">
              Ready to plan your next trip?
            </h2>

            <p className="mt-4 text-lg text-slate-600 max-w-xl mx-auto">
              Create a trip, add your friends, and let NetSettle handle the money.
            </p>

            <div className="mt-10 flex items-center justify-center gap-4">
              <Link className='px-8 py-4 rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 font-semibold  transition' to={'/signup'} >Get Started</Link>
              {/* <a
                href="/login"
                className="px-8 py-4 rounded-xl border border-slate-300
               text-slate-700 font-semibold hover:bg-slate-100 transition"
              >
                Log in
              </a> */}
            </div>

          </div>
        </section>



      </div>
    </>
  )
}

export function Authprovider({children}) {
const [loggedIn, setloggedIn] = useState(false)
const [loggeduser, setloggeduser] = useState({})
  return(
    <LoggedInctx.Provider value={{loggedIn,setloggedIn,loggeduser,setloggeduser}}>{children}</LoggedInctx.Provider>
  )
}

function App() {


  return (
    <>
    <Authprovider>
    <Navbar/>
      <Routes>
        <Route path='/signup' element={<Signup/>}></Route>
        <Route path='/' element={<Home/>}></Route>
         <Route path={'/login'} element={<Login />}></Route>
         <Route path={'/new-trip'} element={<Newtrip/>}></Route>
         <Route path={`/edittrip/:tripcode`}  element={<Edittrip/>}></Route>
      </Routes>
      </Authprovider>
    </>
  )
}

export default App
