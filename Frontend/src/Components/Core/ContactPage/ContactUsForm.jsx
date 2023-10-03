import React, { useEffect, useState } from 'react'
import {useForm} from "react-hook-form"
import CountryCode from "../../../data/countrycode.json"

export const ContactUsForm = () => {
    const [loading, setLoading] = useState(false);
    // destructing the objects and functions we need in form 
    const {
        register,
        handleSubmit,
        reset,
        formState: {errors, isSubmitSuccessful},
    } = useForm();

    const submitContactForm = async (data) => {
        console.log("Logging data ", data);
        try{
            setLoading(true);
            // const response = await apiConnector("POST", contsctusEndpoint.CONTACT_US_API, data);
            const response = {status: "OK"};

            console.log("Logging response ", response);
        }catch(err){
            console.log("Error: ", err.message);
        }
        setLoading(false);

    }


    //reset form everytime the page is refreshed
    useEffect(() => {
        {
            if(isSubmitSuccessful){
                reset({
                    email: "",
                    firstName: "",
                    lastName: "",
                    message: "",
                    phoneNo: "",
                })
            }
        }
    }, [reset, isSubmitSuccessful]);
    
  return (
    <form onSubmit={handleSubmit(submitContactForm)}>
        <div className='flex flex-col gap-5 w-full'>
            <div className='flex flex-row gap-5 custom-sm:flex-col'>
                {/* first name  */}
                <div className='flex flex-col gap-1'>
                    <label htmlFor='firstName'
                    className='text-md text-richblack-100'>
                        First Name
                    </label>
                    <input
                        type='text'
                        name='firstName'
                        id='firstName'
                        placeholder='Enter first name'
                        {...register("firstName", {required: true})}
                        className='bg-richblack-700 text-richblack-100 rounded-md border-b border-richblack-500 py-2 px-1 box-border'
                    />
                </div>

                {/* last name */}
                <div className='flex flex-col gap-1'>
                    <label htmlFor='lastName'
                    className='text-md text-richblack-100'>
                        Last Name
                    </label>
                    <input
                        type='text'
                        name='lastName'
                        id='lastName'
                        placeholder='Enter first name'
                        {...register("lastName")}
                        className='bg-richblack-700 text-richblack-100 rounded-md border-b border-richblack-500 py-2 px-1 box-border'
                    />
                </div>
            </div>

            {/* email  */}
            <div className='flex flex-col gap-1'>
                <label htmlFor='email'
                className='text-md text-richblack-100'>
                    Email Address
                </label>
                <input
                    type='email'
                    name='email'
                    id='email'
                    placeholder='Enter email Address'
                    {...register("email", {required: true})}
                    className='bg-richblack-700 text-richblack-100 rounded-md border-b border-richblack-500 py-2 px-1 box-border'
                />
                {
                    errors.email && (
                        <span>
                            Please enter your email address
                        </span>
                    )
                }
            </div>

            {/* phoneNo  */}
            <div className='flex flex-col gap-1'>
                <label htmlFor='phonenumber'
                className='text-md text-richblack-100'>
                    Phone Number
                </label>

                <div className='flex flex-row gap-5 '>

                {/* dropdown  */}
                <select
                    name='dropdown'
                    id='dropdown'
                    {...register("countrycode", {require: true})}
                    className='bg-richblack-700 w-[80px] rounded-md border-b border-richblack-500 py-2 px-1 box-border'
                >
                {
                    CountryCode.map((element, index) => {
                        return (
                            <option key={index}>
                                {element.code}-{element.country}
                            </option>
                        )
                    })
                }
                </select>

                <input
                    type='number'
                        name='phonenumber'
                        id='phonenumber'
                        placeholder='12345 67890'
                        className='bg-richblack-700 text-richblack-100 w-[calc(100%-90px)] rounded-md border-b border-richblack-500 py-2 px-1 box-border'
                        {...register("phoneNo", 
                        {
                            required: {value: true, message: "Please enter valid Phone number"},
                            maxLength: { value:10, message: "Invalid Phone number"},
                            minLength: {value: 8, message: "Invalid Phone number"}
                    })}
                />
                </div>
                {
                    errors.phoneNo &&  (
                        <span>
                            {errors.phoneNo.message}
                        </span>
                    )
                }

                
            </div>

            {/* message  */}
            <div className='flex flex-col gap-1'>
                <label className='text-md text-richblack-100'>
                    Message
                </label>
                <textarea
                    name='message'
                    id='message'
                    cols={30}
                    rows={7}
                    placeholder='Enter your message'
                    {...register("message", {required: true})}
                    className='bg-richblack-700 text-richblack-100 rounded-md border-b border-richblack-500 py-2 px-1 box-border'
                />
                {
                    errors.email && (
                        <span>
                            Please enter your message
                        </span>
                    )
                }
            </div>

            <button type='submit'
            className='rounded-md bg-yellow-50 px-6 text-[16px] font-bold text-richblack-900 p-2'>
                Send Message
            </button>
        </div>
    </form>
  )
}
