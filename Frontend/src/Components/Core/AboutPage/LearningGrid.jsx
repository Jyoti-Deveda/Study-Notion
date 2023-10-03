import React from 'react'
import { HighlightText } from "../HomePage/HighlightText"
import { CTAButton } from "../HomePage/CTAButton"

export const LearningGrid = () => {
    const LearningGridArray = [
        {
            order: -1,
            heading: "World-Class Learning for",
            highlightText: "Anyone, Anywhere",
            description: 
            "Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
            BtnText: "learn More",
            BtnLink: "/",
        },
        {
            order: 1,
            heading: "Curriculum Based on Industry Needs",
            description: 
            "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs."
        },
        {
            order: 2,
            heading: "Our Learning Methods",
            description: 
            "The learning process uses the namely online and offline."
        },
        {
            order: 3,
            heading: "Certification",
            description: 
            "You will get a certificate that can be used as a certification during job hunting."
        },
        {
            order: 4,
            heading: `Rating "Auto-grading"`,
            description: 
            "You will immediately get feedback during the learning process without having to wait for an answer or response from the mentor."
        },
        {
            order: 5,
            heading: `Ready to work`,
            description: 
            "Connected with over 150+ hiring partners, you will have the opportunity to find a job after graduating from our program."
        },
        
    ]

  return (
    <div className='grid mx-auto grid-cols-1 custom-lg:grid-cols-4 custom-lg:grid-rows-2 mb-10 custom-lg:w-fit w-11/12 max-w-maxContent '>
        {
            LearningGridArray.map((card, index) => {
                return (
                    <div
                    key={index}
                    className={`${index == 0 && "custom-lg:col-span-2 p-5 custom-lg:h-[280px]"} 
                    ${
                        card.order % 2 === 1 ? "bg-richblack-700 custom-lg:h-[280px] p-5" : "bg-richblack-800 custom-lg:h-[280px] p-5"
                    }
                    ${card.order === 3 && "custom-lg:col-start-2 p-5"}
                    ${card.order  < 0 && "bg-transparent"}
                    `}
                    >
                        {
                            card.order < 0 ? 
                            (
                                <div className='flex flex-col pb-5 gap-3'> 
                                    <div className='custom-sm:text-2xl text-4xl font-semibold'>
                                        {card.heading} <HighlightText text={card.highlightText}/>
                                    </div>

                                    <p className='font-medium text-richblack-300'>
                                        {card.description}
                                    </p>
                                    <div className='w-fit mt-4'>
                                        <CTAButton active={true} linkto={"/signup"}>
                                            <p>
                                                Learn More
                                            </p>
                                        </CTAButton>
                                    </div>
                                </div>
                            )
                            : (
                                <div className='flex flex-col gap-8 '>
                                    <h1 className='text-richblack-5 text-lg'>
                                        {card.heading}
                                    </h1>
                                    <p className='text-richblack-300 font-medium'>
                                        {card.description}
                                    </p>
                                </div>
                            )
                        }
                    </div>
                )
            })
        }
    </div>
  )
}
