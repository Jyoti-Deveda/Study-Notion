import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import OtpInput from "react-otp-input"
import { signUp } from '../Services/operations/authAPI';
import { useNavigate } from 'react-router-dom';
import { sendOtp } from '../Services/operations/authAPI';
import { Link } from 'react-router-dom';
import { BsArrowLeft, BsClockHistory } from "react-icons/bs"
import "../App.css"

export const VerifyEmail = () => {
  const [otp, setOtp] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const {loading, signupData} = useSelector((state) => state.auth);

  useEffect(() => {
    console.log("Sign up data ", signupData);
    if(!signupData){
      navigate("/signup");
    }
  })
  const handleOnSubmit = (e) => {
    e.preventDefault();

    const {
      accountType,
      firstName,
      lastName,
      email,
      password,
      confirmPassword
    }  = signupData;
    
    console.log("Otp ", otp);
    dispatch(signUp(accountType, firstName, lastName, email, password, confirmPassword, otp, navigate));
  }

  return (
    <div className='min-h-[calc(100vh-3.5rem)] flex flex-col items-center justify-center'>
      <div className=' custom-lg:w-[40%] w-[80%] max-h-maxContent text-white flex flex-col gap-4 justify-center items-center custom-lg:mt-[7rem]'>
      {
        loading ? 
        (
          <div className='spinner'></div>
        ) : 
        (
          <div className='flex flex-col gap-3'>
            <h1  className='text-2xl text-richblack-5 font-bold'>
              Verify Email
            </h1>
            <p className='text-sm text-richblack-200 tracking-wide'>
              A verification code has been sent to you. Enter the code below
            </p>
            <form onSubmit={handleOnSubmit} className='flex flex-col gap-4'>
              <OtpInput
                value={otp}
                onChange={setOtp}
                numInputs={6}
                // renderSeparator={<span>-</span>}
                renderInput={(props) => <input {...props}
                style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                  }} 
                className="custom-xs:w-[30px] w-[48px] lg:w-[60px] border-0 bg-richblack-800 rounded-[0.5rem] text-richblack-5 aspect-square text-center focus:border-0 focus:outline-2 focus:outline-yellow-50" />}
                inputStyle={"p-5"}
                containerStyle={"flex justify-between"}
                placeholder='000000'
                
              />

              <button type='submit' className='bg-yellow-50 text-richblack-800 text-sm font-bold py-2 rounded-md'>
                Verify email
              </button>
            </form>

            <div className='flex flex-row justify-between text-sm tracking-wide'>
              <div>
              <Link to={"/login"} className='flex flex-row items-center gap-2  text-richblack-5 hover:text-blue-400'>
                  <BsArrowLeft/>
                  <p> Back to Login</p>
                  </Link>
              </div>

              <button onClick={() => dispatch(sendOtp(signupData.email, navigate))} 
              className='flex flex-row items-center gap-2 text-blue-400'>
              <BsClockHistory/>
                Resend it
              </button>
            </div>
          </div>
        )
      }
    </div>
    </div>
  )
}

