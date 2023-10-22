import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { IconButton } from '../../Common/IconButton';
import { BiSolidEdit } from "react-icons/bi"

export const MyProfile = () => {

    const {user} = useSelector((state) => state.profile);
    const navigate = useNavigate();

  return (
    <div className='flex flex-col custom-lg:w-[70%] w-[100%] gap-y-5 custom-sm:mx-auto'>
        <h1 className='text-2xl text-richblack-5 font-bold m-2'>
            My Profile
        </h1>

        {/* section 1 */}
        <div className='flex custom-lg:flex-row flex-col-reverse custom-sm-md:gap-2 justify-between custom-lg:items-center items-start bg-richblack-800 px-5 py-4 rounded-md
        border border-richblack-700'>
            <div className='flex flex-row gap-3 items-center'>
                <img src={user?.image}
                    alt={`profile-${user?.firstName}`}
                    className='aspect-square w-[78px] h-[78px] custom-sm:w-[3rem] custom-sm:h-[3rem] rounded-full'
                />
                <div className='flex flex-col gap-1 '>
                    <p className='capitalize font-semibold text-richblack-5 text-lg'> 
                        {user?.firstName + " " + user?.lastName} 
                    </p>
                    <p className='text-sm custom-sm:text-xs text-richblack-400'> {user?.email} </p>
                </div>
            </div>
            <IconButton
                text={"Edit"}
                onclick={() => {
                        navigate("/dashboard/settings")
                    }}
                customClasses={"flex custom-lg:items-center self-end justify-center"}
                >
                    <BiSolidEdit/>
            </IconButton> 
                
        </div>

        {/* section 2  */}
        <div className='flex custom-lg:flex-row flex-col-reverse justify-between  custom-sm:justify-start bg-richblack-800 px-5 py-4 rounded-md
        border border-richblack-700 gap-5'>
            <div className='flex flex-col gap-2'>
                <p className='capitalize font-semibold text-richblack-5 text-lg'>
                 About
                </p>
                <p className='text-sm text-richblack-400'>
                 { user?.additionalDetails?.about ?? "Write something about Yourself" } 
                </p>
                
            </div>
            <IconButton
                    text={"Edit"}
                    onclick={() => {
                        navigate("/dashboard/settings")
                    }}
                    customClasses={"flex self-end"}
                >
                    <BiSolidEdit/>
                </IconButton>
            
        </div>

        {/* section 3 */}
        <div className='flex custom-lg:flex-row flex-col-reverse  bg-richblack-800 px-5 py-4 rounded-md
        border border-richblack-700 gap-5'>
            <div className='flex flex-col justify-between'>
                <p className='capitalize font-semibold text-richblack-5 text-lg'>
                    Personal Details
                </p>
                <div className='grid gap-3 custom-md:grid-cols-2 custom-sm:grid-cols-1'>
                    <div className='flex flex-col text-sm gap-1'>
                        <p className='capitalize text-richblack-400 custom-md:text-xs'>
                            First Name
                        </p>
                        <p className=' text-richblack-25 font-semibold capitalize custom-md:text-xs'>
                            {user?.firstName}
                        </p>
                    </div>

                    <div className='flex flex-col text-sm gap-1'>
                        <p  className='capitalize text-richblack-400 custom-md:text-xs'>
                            Last Name
                        </p>
                        <p className=' text-richblack-25 font-semibold capitalize custom-md:text-xs'>
                            {user?.lastName}
                        </p>
                    </div>

                    <div className='flex flex-col text-sm gap-1'>
                        <p  className='capitalize text-richblack-400 custom-md:text-xs'>
                            Email
                        </p>
                        <p className=' text-richblack-25 font-semibold custom-md:text-xs'>
                            {user?.email}
                        </p>
                    </div>             

                    <div className='flex flex-col text-sm gap-1'>
                        <p  className='capitalize text-richblack-400 custom-md:text-xs'>
                            Phone Number
                        </p>
                        <p className=' text-richblack-25 font-semibold capitalize custom-md:text-xs'>
                            {user?.additionalDetails?.contactNumber ?? "Add contact Number"}
                        </p>
                    </div>

                    <div className='flex flex-col text-sm gap-1'>
                        <p  className='capitalize text-richblack-400 custom-md:text-xs'>
                            Gender
                        </p>
                        <p className=' text-richblack-25 font-semibold capitalize custom-md:text-xs'>
                            {user?.additionalDetails?.gender ?? "Add gender"}
                            </p>
                    </div>

                    <div className='flex flex-col text-sm gap-1'>
                        <p className='capitalize text-richblack-400 custom-md:text-xs'>
                            Date of Birth
                        </p>
                        <p  className=' text-richblack-25 font-semibold capitalize custom-md:text-xs'>
                            {user?.additionalDetails?.dateOfBirth ?? "Add Date of Birth"}
                        </p>
                    </div>                
                </div>
                
            </div>
            <IconButton
                text={"Edit"}
                onclick={() => {
                        navigate("/dashboard/settings")
                    }}
                    customClasses={"flex self-end"}
                >
                    <BiSolidEdit/>
            </IconButton>
            
        </div>
    </div>
  )
}
