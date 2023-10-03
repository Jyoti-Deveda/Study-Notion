import React from 'react'

import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg"
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg"
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg"
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg"
import timelineImage from '../../../assets/Images/TimelineImage.png'

const timeline = [
    {
        Logo: Logo1,
        Heading: "Leadership",
        Description: "Fully committed to the success company"
    },
    {
        Logo: Logo2,
        Heading: "Responsibility",
        Description: "Students will always be our top priority"
    },
    {
        Logo: Logo3,
        Heading: "Flexibility",
        Description: "The ability to switch is an important skill"
    },
    {
        Logo: Logo4,
        Heading: "Solve the problem",
        Description: "Code your way to solution"
    }
]

export const TimelineSection = () => {
  return (
    <div>
        <div className='flex flex-row custom-sm:flex-col-reverse gap-y-[6rem] gap-16 items-center'>
            {/* left part  */}
            <div className=' custom-lg:w-[45%] flex flex-col gap-5'>
                    {
                        timeline.map( (element, index) => {
                            return (
                                <div className='flex flx-row gap-6' key={index}>
                                    <div className='w-[50px] h-[50px] flex items-center '>
                                        <img src={element.Logo}/>
                                    </div>

                                    <div>
                                        <h2 className='font-semibold text-[18px]'>{element.Heading}</h2>
                                        <p className='text-base'>{element.Description}</p>
                                    </div>
                                </div>
                            )
                        })
                    }
            </div>

            {/* right part  */}
            <div className='relative  shadow-blue-200'>
                    <img
                        src={timelineImage}
                        alt='timelineImage'
                        className='shadow-white object-fit h-fit'
                    />
                    <div className='absolute bg-caribbeangreen-700 flex flex-row items-center custom-sm:text-xs custom-sm:flex-col text-white uppercase py-7 custom-sm:py-4 px-2 left-[50%] translate-x-[-50%] -translate-y-[50%] custom-sm:w-[90%]'>
                        <div className='flex flex-row justify-between gap-5 items-center custom-lg:border-r custom-sm:border-b border-caribbeangreen-300 px-7'>
                            <p className='text-3xl font-bold'>10</p>
                            <p className='text-caribbeangreen-300 text-sm custom-sm:text-[10px]'>Years of Exeperience</p>
                        </div>

                        <div className='flex flex-row gap-5 items-center px-7'>
                            <p className='text-3xl font-bold'>250</p>
                            <p className='text-caribbeangreen-300 text-sm custom-sm:text-[10px]'>Types of Courses</p>
                        </div>

                    </div>
            </div>
        </div>
    </div>
  )
}
