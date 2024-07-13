import React,{ useState,useEffect }from 'react'
import authserv from './appwrite/auth'
import { useDispatch } from 'react-redux'
import './App.css'
import {login,logout} from './store/authslice'
import { Footer,Header } from './Components/index'
import { Outlet } from 'react-router-dom'

function App() {
  const [loading, setloading] = useState(false)
  const dispatch=useDispatch();

  useEffect(()=>{
    authserv.getcurrentuser()
    .then((userdata)=>{
      if (userdata) {
        dispatch(login({userdata}))
      } else {
        dispatch(logout());
      } 
    })
    .finally(()=>setloading(false));
  },[])

  return !loading?(
    <div className='min-h-screen flex flex-wrap content-between bg-cyan-400 w-full'>
      <div className='w-full block'>
        <Header/>
        <main>
          <Outlet/> 
        </main>
        <Footer/>
      </div>
    </div>
  ):null
}

export default App
