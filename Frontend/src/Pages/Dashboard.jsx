import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../Components/Core/Dashboard/Sidebar';

export const Dashboard = () => {

    const {loading:authLoading} = useSelector((state) => state.auth);
    const {loading:profileLoading} = useSelector((state) => state.profile);

    if(profileLoading || authLoading){
      return (
        <div className='spinner '>
        </div>
      )
    }
  return (
    <div className='w-full relative flex flex-row gap-10 min-h-[calc(100vh-3.5rem)]'>
      <Sidebar/>
      <div className='h-[calc(100vh-3.5rem)] overflow-auto custom-lg:w-[90%] w-full ml-[8rem] custom-sm:mx-auto'>
          <div className='mx-auto w-11/12 max-w-[1000px] py-10'>
              <Outlet/>
          </div>
      </div>
    </div>
  )
}
