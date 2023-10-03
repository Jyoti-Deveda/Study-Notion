import React from 'react'
import { HighlightText } from '../Components/Core/HomePage/HighlightText'
import BannerImage1 from  "../assets/Images/aboutus1.webp"
import BannerImage2 from  "../assets/Images/aboutus2.webp"
import BannerImage3 from  "../assets/Images/aboutus3.webp"
import { Quote } from '../Components/Core/AboutPage/Quote'
import FoundingStory from "../assets/Images/FoundingStory.png"
import { StatsComponent } from "../Components/Core/AboutPage/StatsComponent"
import { LearningGrid } from "../Components/Core/AboutPage/LearningGrid"
import { ContactFormSection } from "../Components/Core/AboutPage/ContactFormSection"
import Footer from "../Components/Common/Footer"
import { ReviewSlider } from '../Components/Common/ReviewSlider'
import {Navbar} from "../Components/Common/Navbar"

export const About = () => {
  return ( 
    <div className='w-[100%] '>
        {/* <Navbar/> */}
        <div className='text-white max-w-maxContent'>
        {/* section 1 */}
        <div className='flex flex-col gap-5 bg-richblack-700 pt-[20px] pb-[30px] h-maxContent'>
            <div className='flex flex-col items-center w-11/12 mx-auto py-[5%] custom-lg:h-[350px] custom-md:h-[250px] h-full'>
                <header className='flex flex-col items-center justify-center gap-5 custom-lg:w-[60%]  text-center m-2'>
                    <div className='custom-sm:text-2xl text-3xl font-semibold justify-center'>
                        Driving innovation in Online Education for a <HighlightText text={"Brighter Future"}/>
                    </div>
                    <p className='text-sm text-richblack-300'>
                    Studynotion is at the forefront of driving innovation in online education. We're passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.
                    </p>
                </header>
                {/* <div className="custom-sm:h-[70px] custom-lg:h-[150px]"></div> */}
                <div className='flex custom-sm:flex-col flex-row items-center justify-center gap-3'>
                    <img src={BannerImage1} 
                        className='rounded-sm w-[25%] custom-sm:w-[80%] h-auto'
                    />
                    <img src={BannerImage2}
                         className=' rounded-sm w-[25%] custom-sm:w-[80%] h-auto'
                    />
                    <img src={BannerImage3}
                         className='rounded-sm w-[25%] custom-sm:w-[80%] h-auto'
                    />
                </div>
            </div>
        </div>

        {/* section 2 */}
        <section className='mt-[80px] p-10'>
            <div className='flex justify-center items-center'>
                <Quote/>
            </div>
        </section>

        {/* section 3 */}
        <section className='flex flex-col gap-10 items-center mx-auto lg:w-11/12 max-w-maxContent '>
            <div className='flex custom-sm:flex-col-reverse flex-row gap-10 w-full p-10 justify-between custom-sm:items-center items-end mx-auto'>
                {/* founding story left box  */}
                <div className='flex flex-col custom-sm:w-full custom-lg:w-[45%] w-full gap-3'>
                    <h1 className='text-red-500 text-2xl custom-lg:text-3xl font-semibold'>
                        Our Founding story
                    </h1>
                    <p className='text-sm text-richblack-300 tracking-wide'>Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.</p>
                    <p className='text-sm text-richblack-300 tracking-wide'>As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.</p>
                </div>

                {/* founding story right box  */}
                <div>
                    <img src={FoundingStory}
                        className='custom-lg:w-[400px] w-[100%]'
                    />
                </div>
            </div>

            {/* vision mission div  */}
            <div className='flex flex-row custom-sm:flex-col gap-10 w-full p-10 justify-between items-center mx-auto'>
                {/* left div  */}
                <div className='flex flex-col gap-3 custom-sm:w-full w-[45%]'>
                    <h1 className='text-brown-400 text-3xl font-semibold'>Our Vision</h1>
                    <p className='text-sm text-richblack-300 tracking-wide'>
                        With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.
                    </p>
                </div>

                <div className='flex flex-col custom-sm:w-full w-[45%]'>
                    <h1 className='text-blue-300 text-3xl font-semibold'>Our vision</h1>
                    <p className='text-sm text-richblack-300 tracking-wide'>
                        our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.
                    </p>
                </div>
            </div>
        </section>

        {/* section 4 */}
        <section className='flex justify-center items-center py-10 my-10 bg-richblack-800 border-b border-richblack-600'>
            <StatsComponent/>
        </section>

        {/* section 5  */}
        <section className='w-[90%] flex flex-col justify-center items-center gap-5 mx-10 custom-sm:mx-auto'>
            <LearningGrid/>
            <ContactFormSection/>
        </section>

        {/* section 6  */}
        <div className='flex flex-col '>
            <h1 className='text-center text-2xl custom-lg:text-4xl font-semibold mt-8'>
                Reviews from other Learners
            </h1>            

            <ReviewSlider/>
        </div>


    </div>

        <Footer/>

    </div>
  )
}
