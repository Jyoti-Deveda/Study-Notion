import React from 'react'
import { Link } from 'react-router-dom'
import { FaArrowRight } from "react-icons/fa"
import { HighlightText } from '../Components/Core/HomePage/HighlightText'
import { CTAButton } from '../Components/Core/HomePage/CTAButton'
import Banner from '../assets/Images/banner.mp4'
import { CodeBlocks } from '../Components/Core/HomePage/CodeBlocks'
import { TimelineSection } from '../Components/Core/HomePage/TimelineSection'
import { LearningLanguageSection } from '../Components/Core/HomePage/LearningLanguageSection'
import { InstructorSection } from '../Components/Core/HomePage/InstructorSection'
import { ExploreMore } from '../Components/Core/HomePage/ExploreMore'
import  Footer from '../Components/Common/Footer'
import { ReviewSlider } from '../Components/Common/ReviewSlider'
import "../App.css";

export const Home = () => {
  return (
    <div>
        {/* Section 1 */}
        <div className='w-11/12 max-w-maxContent relative mx-auto flex flex-col items-center custom-sm:items-start justify-between text-white gap-y-2'>
            <Link to={"/signup"}>
                <div className='mt-16 p-1 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200 
                transition-all duration-200 hover:scale-95 w-fit group stroke-gray-100 border-b border-pure-greys-400'>
                    <div className='flex flex-row items-center gap-2 rounded-full px-10 py-[5px] custom-sm:px-2 custom-sm:text-sm transition-all duration-200 group-hover:bg-richblack-900
                    '>
                        <p>Become an instructor</p>
                        <FaArrowRight/>
                    </div>
                </div>
            </Link>

            <div className='custom-lg:text-center text-2xl custom-sm:text-xl font-semibold mt-4'>
                Empower your Future Growth with <HighlightText text={"Coding Skills"}/>
            </div>

            <div className='w-[90%] custom-lg:text-center custom-sm:text-sm text-lg font-bold text-richblack-300 mt-4'>               
                With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors. 
            </div>

            <div className='flex flex-row flex-wrap gap-7 mt-8'>
                <CTAButton active={true} linkto={"/signup"}>
                    Learn more
                </CTAButton>

                <CTAButton>
                    Book a demo
                </CTAButton>
            </div>

            {/* video section  */}
            <div className='w-[90%] mx-auto custom-sm:mr-[10%] my-12 shadow-[15px_15px_1px_rgba(255,_255,_255,_1)] '>
            {/* <div className='absolute bg-blue-100 h-[300px] w-[300px] rounded-full shadow-lg shadow-blue-100 '></div> */}
                <video className='shadow-[0_-2px_10px_rgba(8,_112,_184,_0.7)]'
                muted loop autoPlay
                >
                <source src={Banner} type="video/mp4"></source>
                </video>
            </div>

            {/* code section 1 */}
            <div className='relative'>
                <CodeBlocks
                    position={"custom-lg:flex-row flex-col"}
                    heading = {
                        <div className='text-2xl custom-lg:text-4xl font-semibold'>
                            Unlock your <HighlightText text={"Coding Potential"}/> with our online courses                         
                        </div>
                    }
                    subHeading={
                        "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
                    }
                    ctabtn1={
                        {
                            btnText: "Try it yourself",
                            linkto: "/signup",
                            active: true,
                        }
                    }
                    ctabtn2={
                        {
                            btnText: "Learn more",
                            linkto: "/signup",
                            active: false,
                        }
                    }
                    codeblock={
                        `<!DOCTYPE html>\n<html>\nhead><title>Example</\ntitle><linkrel="stylesheet"href="styles.css">\n/head>\nbody>\nh1><ahref="/">Header</a>\n/h1>\nnav><ahref="one/">One</a><ahref="two/">Two</\na><ahref="three/">Three</a>\n/nav>`
                    }
                    codeColor={"text-yellow-25"}
                    backgroundGradient={<div className="codeblock1 absolute"></div>}
                />
            </div>

            {/* code section 2  */}
            <div>
                <CodeBlocks
                    position={"custom-lg:flex-row-reverse flex-col"}
                    heading = {
                        <div className='text-2xl custom-lg:text-4xl font-semibold'>
                            Unlock your <HighlightText text={"Coding Potential"}/> with our online courses                         
                        </div>
                    }
                    subHeading={
                        "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
                    }
                    ctabtn1={
                        {
                            btnText: "Try it yourself",
                            linkto: "/signup",
                            active: true,
                        }
                    }
                    ctabtn2={
                        {
                            btnText: "Learn more",
                            linkto: "/signup",
                            active: false,
                        }
                    }
                    codeblock={
                        `<!DOCTYPE html>\n<html>\nhead><title>Example</\ntitle><linkrel="stylesheet"href="styles.css">\n/head>\nbody>\nh1><ahref="/">Header</a>\n/h1>\nnav><ahref="one/">One</a><ahref="two/">Two</\na><ahref="three/">Three</a>\n/nav>`
                    }
                    codeColor={"text-pink-500"}
                    backgroundGradient={<div className="codeblock2 absolute"></div>}

                />
        </div>

        <ExploreMore/>
        </div>


        

        {/* Section 2 */}
        <div className='bg-pure-greys-5 text-richblack-700'>
                <div className='homepage_bg h-[300px]'>
                    
                    <div className='w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-5 mx-auto'>
                        <div className='h-[150px]'>

                        </div>
                        {/* for buttons  */}
                        <div className='flex flex-row custom-sm:flex-col custom-sm:gap-2 gap-7 text-white items-center justify-center mx-auto custom-sm:text-xs'>
                            <CTAButton active={true} linkto={"/signup"}>
                                <div className='flex items-center gap-3'>
                                    Explore Full Catalog   
                                    <FaArrowRight/> 
                                </div>
                            </CTAButton>

                            <CTAButton active={false} linkto={"/signup"}>
                                <div>
                                    Learn more
                                </div>
                            </CTAButton>
                        </div>
                    </div>
                </div>
                
                <div className='w-11/12 max-w-maxContent mx-auto flex flex-col items-center justify-between gap-7'>
                    <div className='flex flex-row custom-sm:flex-col mx-auto gap-5 mb-10 mt-[95px]'>
                        <div className='text-3xl custom-lg:text-4xl font-semibold w-full custom-lg:w-[45%]'>
                            Get the skills you need for a <HighlightText text={"job that is in demand"}/>
                        </div>

                        <div className='flex flex-col gap-10 w-full custom-lg:w-[40%] items-start m '>
                            <div className='text-[16px]'>
                                The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.
                            </div>
                            <CTAButton active={true} linkto={"/signup"}>
                                Learn more
                            </CTAButton>
                        </div>
                    </div>

                    <TimelineSection/>

                    <LearningLanguageSection/>
                </div>
        </div>

        {/* section 3 */}
        <div className='w-11/12 mx-auto max-w-maxContent flex flex-col items-center justify-between gap-8 bg-richblack-900 text-white'>
            <InstructorSection/>
        </div>

        <div className='flex flex-col'>
            <h2 className='text-center text-2xl custom-lg:text-4xl font-semibold mt-8 text-richblack-5'> 
                Reviews from other learners
            </h2>
             {/* Review slider  */}
             <ReviewSlider/>
        </div>

        {/* Footer */}
        <Footer />
    </div>
  )
}
