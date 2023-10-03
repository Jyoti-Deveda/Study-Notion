import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { resetPassword } from '../Services/operations/authAPI';
import { useLocation, useNavigate } from 'react-router-dom';
import { AiFillEyeInvisible, AiFillEye} from "react-icons/ai"
import { Link } from 'react-router-dom';
import { BsCheck2Circle, BsArrowLeft } from "react-icons/bs"

export const UpdatePassword = () => {
    const dispatch = useDispatch();
    const location = useLocation();

    const navigate = useNavigate();
    const {loading} = useSelector((state) => state.auth);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [formData, setFormData] = useState({
        password:"",
        confirmPassword: ""
    })

    //taking the passwords out of formData seperately to be passed to the reset password function
    const {password, confirmPassword}= formData;
    //token from url

    function handleOnchange(e){
        setFormData((prev) =>(
            {
                ...prev,
                [e.target.name]: e.target.value
            }
        ))
    }

    function handleOnSubmit(e){
        e.preventDefault();
        const token = location.pathname.split("/").at(-1);
        console.log("Token ", token);
        dispatch(resetPassword(password, confirmPassword, token, navigate));
    }

  return (
    <div className='flex flex-col items-center justify-center'>
        <div className=' w-[30%] max-h-maxContent text-white flex flex-col gap-4 justify-center items-center custom-lg:mt-[5rem]'>
        {
        loading ? 
        (
            <div className='spinner'></div>
        ) : 
        (
            <div className='flex flex-col gap-3'>
                <h1 className='text-2xl text-richblack-5 font-bold'>
                    Choose new password
                </h1>
                <p className='text-sm text-richblack-200 tracking-wide'>
                    Almost done, enter your new password and you are all set.
                </p>
                <form onSubmit={handleOnSubmit}
                className='flex flex-col gap-2'>
                    <label className='flex flex-col gap-1 relative'>
                        <p className='text-richblack-100  text-sm'>
                            New password<sup className="text-pink-200">*</sup>
                        </p>
                        <input
                            required
                            type={showPassword ? "text" : "password"}
                            name='password'
                            value={password}
                            onChange={handleOnchange}
                            placeholder='******'
                            className='w-full p-2 bg-richblack-800 text-richblack-5 rounded-md 
                            placeholder:text-lg placeholder:text-richblack-100 border-b-2 border-richblack-500'
                        />
                        <span className='absolute right-2 top-8' 
                        onClick={() => setShowPassword(!showPassword)}>
                            {
                                showPassword ? 

                                <AiFillEyeInvisible fontSize={24}/> : 

                                <AiFillEye fontSize={24}/>
                            }
                        </span>
                    </label>

                    <label className='flex flex-col gap-1 relative'>
                        <p className='text-richblack-100  text-sm'>
                            Confirm new password<sup className="text-pink-200">*</sup>
                        </p>
                        <input
                            required
                            type={showConfirmPassword ? "text" : "password"}
                            name='confirmPassword'
                            value={confirmPassword}
                            onChange={handleOnchange}
                            placeholder='******'
                            className='w-full p-2 bg-richblack-800 text-richblack-5 rounded-md 
                            placeholder:text-lg placeholder:text-richblack-100 border-b-2 border-richblack-500'
                        />
                        <span className='absolute right-2 top-8' 
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                            {
                                showConfirmPassword ? 

                                <AiFillEyeInvisible fontSize={24}/> : 

                                <AiFillEye fontSize={24}/>
                            }
                        </span>
                    </label>

                    <ul className='flex flex-wrap gap-x-5 gap-y-1 text-caribbeangreen-200'>
                        <li className='text-xs flex flex-row gap-1 items-center'>
                            <BsCheck2Circle/>
                            <p>One lowercase character</p>
                        </li>

                        <li className='text-xs flex flex-row gap-1 items-center'>
                            <BsCheck2Circle/>
                            <p>One special character</p>
                        </li>

                        <li className='text-xs flex flex-row gap-1 items-center'>
                            <BsCheck2Circle/>
                            <p>One uppercase character</p>
                        </li>

                        <li className='text-xs flex flex-row gap-1 items-center'>
                            <BsCheck2Circle/>
                            <p>8 character minimum</p>
                        </li>

                        <li className='text-xs flex flex-row gap-1 items-center'>
                            <BsCheck2Circle/>
                            <p>One number</p>
                        </li>
                        
                    </ul>

                    <button type='submit'
                    className='bg-yellow-50 text-richblack-800 text-sm font-bold py-2 rounded-md'>
                        Reset Password
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
