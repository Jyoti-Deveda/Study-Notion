import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../Components/Core/Dashboard/Sidebar';

export const Dashboard = () => {

    const {loading:authLoading} = useSelector((state) => state.auth);
    const {loading:profileLoading} = useSelector((state) => state.profile);

    const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
      window.addEventListener('resize', () => setSidebarOpen(false))
    }, [])

    useEffect(() => {
      console.log("sidebaropen ", sidebarOpen);
    }, [sidebarOpen])
  

    if(profileLoading || authLoading){
      return (
        <div className='spinner '>
        </div>
      )
    }
  return (
    <div className='w-full relative flex flex-row custom-lg:gap-10 min-h-[calc(100vh-3.5rem)] custom-sm:gap-0'>
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/>
      <div className={`h-[calc(100vh-3.5rem)] overflow-auto custom-lg:w-[90%] w-full custom-lg:ml-[7rem] custom-sm:pt-10
      custom-sm:mx-auto custom-sm:${sidebarOpen ? "hidden" : ""}`}>
          <div className='mx-auto w-11/12 custom-lg:max-w-[1000px] py-10'>
              <Outlet context={[setSidebarOpen]}/>
          </div>
      </div>
    </div>
  )
}
