import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { getPasswordResetToken } from '../Services/operations/authAPI';
import { BsArrowLeft } from "react-icons/bs"

// import { getPasswordResetToken } from '../Services/operations/authAPI';

export const ForgotPassword = () => {

    const [emailSent, setEmailsent] = useState(false);
    const [email, setEmail] = useState("")

    const {loading} = useSelector((state) => state.auth);

    const dispatch = useDispatch();

    function handleOnSubmit(event){
        event.preventDefault();
        dispatch(getPasswordResetToken(email,setEmailsent))
    }
  return (
    <div className='flex items-center justify-center'>
        <div className=' w-[30%] max-h-maxContent text-white flex flex-col gap-4 justify-center items-center custom-lg:mt-[7rem]'>
        {
            loading ? 
            (
                <div className='spinner'>
                </div>
            ) : 
            (
                <div className='flex flex-col gap-4'>
                    <h1 className='text-2xl text-richblack-5 font-bold'>
                        {
                            !emailSent ? "Reset your Password " : "Check your Email"
                        }
                    </h1>

                    <p className='text-sm text-richblack-200 tracking-wide'>
                        {
                            !emailSent ? 
                            ("Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery") : 
                            (`We have sent the reset email to ${email}`)
                        }
                    </p>

                    <form onSubmit={handleOnSubmit}
                    className='flex flex-col gap-6'>
                        {
                            !emailSent && (
                                <label className='flex flex-col gap-1'>
                                    <p className='text-richblack-100 text-sm'>Email Address
                                    <sup className="text-pink-200">*</sup>
                                    </p>
                                    <input
                                        required
                                        type='email'
                                        name='email'
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder='abc@gmail.com'
                                        className='bg-richblack-700 p-2 rounded md border-b-2 border-richblack-500
                                        text-sm text-richblack-5 clear'
                                    />
                                </label>
                            )
                        }

                        <button type='submit' className='bg-yellow-50 text-richblack-800 text-sm font-bold py-2 rounded-md'>
                            {
                                !emailSent ? "Reset Password" : "Resend Email"
                            }
                        </button>
                    </form>

                    <div>
                        <Link to={"/login"} className='flex flex-row items-center gap-2 text-sm text-richblack-5 hover:text-blue-400'>
                        <BsArrowLeft/>
                        <p> Back to Login</p>
                        </Link>
                    </div>
                </div>
            )
        }
        </div>
    </div>
  )
}
