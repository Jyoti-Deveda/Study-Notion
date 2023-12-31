import React, { useEffect, useState } from 'react'
import { sidebarLinks } from '../../../data/dashboard-links'
import { logout } from '../../../Services/operations/authAPI'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import {SidebarLink} from "./SidebarLink"
import {VscSignOut} from "react-icons/vsc"
import { ConfirmationModal } from '../../Common/ConfirmationModal'
import { HiArrowRightOnRectangle } from 'react-icons/hi2'
import { GiTireIronCross } from 'react-icons/gi'

export const Sidebar = ({sidebarOpen, setSidebarOpen}) => {
  const {user, loading: profileLoading}= useSelector((state) => state.profile)
  const {loading:authLoading} = useSelector((state => state.auth));

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [confirmationModal, setConfirmationModal] = useState(null)
  const [sidebarArrow, setSidebarArrow] = useState(null)

 
  if(profileLoading || authLoading){
    return(
      <div className="grid h-[calc(100vh-3.5rem)] min-w-[220px] items-center border-r-[1px] border-r-richblack-700 bg-richblack-800">
        <div className="spinner"></div>
      </div>
    )
  }

  return (
    <div className={`relative text-white custom-lg:w-[10%] custom-md: custom-sm:${sidebarOpen ? "w-[100%] flex flex-grow-1" : "w-0"}`}
    // onClick={() => sidebarOpen(false)}
    >
        <div className='absolute hover:bg-richblack-400 bg-opacity-30 p-2 m-2 rounded-md hidden custom-sm:block text-2xl text-richblack-400 hover:text-yellow-50'
        onClick={() => {
          console.log("sidebar ", sidebarOpen)
          setSidebarOpen(!sidebarOpen)
        }}
        >
        {
          sidebarOpen ? 
          (
            <GiTireIronCross/>
          )
          : (
            <HiArrowRightOnRectangle/>
          )
        }
        </div>

        <div className={`custom-sm:${sidebarOpen ? "w-full" : "hidden"} custom-sm:pt-14 flex custom-lg:min-w-[222px] custom-md:w-[224px] flex-col border-r-[1px] border-r-richblack-700
        h-[calc(100vh-3.5rem)] bg-richblack-800 py-10 transition-all duration-150`}>

            <div className='flex flex-col'>
                {
                  sidebarLinks.map((link) => {
                    {/* comparing to display the corresponding links  */}
                    if(link.type && user?.accountType !== link.type) return null;
                    return (
                        <SidebarLink key={link?.id} link={link} iconName={link.iconName} setSidebarOpen={setSidebarOpen}/>
                    )
                  })
                }
            </div>

            <div className='mx-auto my-6 h-[1px] w-10/12 bg-richblack-600'></div>

            <div className='flex flex-col'>
                <SidebarLink
                  link={{name:"Settings", path: "dashboard/settings"}}
                  iconName={"VscSettingsGear"}
                  setSidebarOpen={setSidebarOpen}
                />
                <button
                  onClick={() => setConfirmationModal({
                    text1: "Are you Sure? ",
                    text2: "You will be logged out of your Account",
                    btn1Text: "Logout",
                    btn2Text: "Cancel",
                    btn1Handler: () => dispatch(logout(navigate)),
                    btn2Handler: () => setConfirmationModal(null)
                  })} 
                  className='text-sm font-medium text-richblack-300'
                >
                  <div className='flex flex-row items-center gap-x-2 text-richblack-300 relative px-8 py-2 text-sm font-medium'>
                      <VscSignOut/>
                      <span>Logout</span>
                  </div>
                </button>
            </div>
        </div>

        {
          confirmationModal && <ConfirmationModal modalData={confirmationModal}
            className='bg-richblack-700 translate-x-[50%] translate-y-[50%] text-richblack-5'
          />
        }
    </div>
  )
}
