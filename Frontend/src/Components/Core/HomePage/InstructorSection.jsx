import React from 'react'
import Instructor from '../../../assets/Images/Instructor.png'
import { HighlightText } from './HighlightText'
import { CTAButton } from './CTAButton'
import {FaArrowRight} from 'react-icons/fa'

export const InstructorSection = () => {
  return (
    <div className='mt-16'>
        <div className='flex flex-row custom-sm:flex-col gap-20 items-center'>
            
            <div className='w-[50%] custom-sm:w-[90%]'>
                <img
                    src={Instructor}
                    alt='Instructor image'
                    className='shadow-white'
                />
            </div>
            <div className='w-[50%] custom-sm:w-[100%] flex flex-col gap-10'>
                <div className='text-4xl custom-sm:text-2xl font-semibold w-[50%] custom-sm:w-full'>
                    Become an <HighlightText text={"Instructor"}/>
                </div>
                <p className='font-medium text-[16px] w-[80%] custom-sm:w-full text-richblack-300'>
                    Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.
                </p>

                <div className='w-fit'>
                    <CTAButton active={true} linkto={"/signup"}>
                        <div className='flex flex-row gap-2 items-center justify-center'>
                            Start teaching today
                            <FaArrowRight/>
                        </div>
                    </CTAButton>
                </div>
            </div>

        </div>
    </div>
  )
}
