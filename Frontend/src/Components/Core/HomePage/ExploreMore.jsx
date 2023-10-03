import React, { useState } from 'react'
import { HomePageExplore } from '../../../data/homepage-explore';
import { HighlightText } from './HighlightText';
import { CourseCard } from './CourseCard';

const tabName = [
    "Free", 
    "New to coding", 
    "Most popular", 
    "Skills paths",
    "Career paths"
]

export const ExploreMore = () => {
    const [currentTab, setCurrentTab] = useState(tabName[0]);

    const [courses, setCourses] = useState(HomePageExplore[0].courses);
    
    //fetching the first course of the first object from HomePageExplore
    const [currentCard, setCurrentCard] = useState(HomePageExplore[0].courses[0].heading);

    const setMyCards = (value) => {
        setCurrentTab(value);
        const result = HomePageExplore.filter((course) => course.tag === value);
        console.log(result);
        setCourses(result[0].courses);
        setCurrentCard(result[0].courses[0].heading);
        console.log("currentCard ", currentCard);
    }

    return (
        <div className='flex flex-col items-center justify-center custom-sm:w-[80%] mx-auto'>
            <div className='text-center font-semibold text-4xl custom-sm:text-2xl'>
                Unlock the <HighlightText text={"Power of code"}/>
            </div>

            <p className='text-richblack-300 text-center text-md font-sem   ibold mt-3'>
                Learn to build anything you can imagine
            </p>

            {/* tabs  */}
            <div className='flex flex-row gap-2 bg-richblack-800 rounded-full my-5 px-1 py-1 custom-sm:w-[90%] custom-sm:hidden custom-sm:h-[5rem]'>
                {
                    tabName.map((tab, index) => {
                        return(
                            <div className={`text-[16px] flex items-center justify-center
                            ${currentTab === tab ? ("bg-richblack-900 text-richblack-5 font-medium") :
                            ("text-richblack-200")} rounded-full transition-all duration-200 
                            cursor-pointer hover:bg-richblack-900 hover:text-richblack-5 px-7 py-2 custom-sm:w-full`}
                            key={index}
                            onClick={() => setMyCards(tab)}
                            >
                                {tab}
                            </div>
                        )
                    })
                }
            </div>

            {/* cards  */}
            <div className='custom-sm:h-[40rem] h-[150px] '>
                
                <div className='absolute translate-x-[-50%] translate-y-[15%] rounded-sm
                 flex flex-row custom-sm:flex-col gap-y-[3rem] custom-sm:w-[80%] items-center justify-center w-full gap-6 mx-auto '>
                    {
                        courses.map((course, index) => {
                            return (
                                <div key={index}>
                                    <CourseCard     
                                        cardData = {course}
                                        currentCard ={currentCard}
                                        setCurrentCard={setCurrentCard}
                                    />
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        </div>
    )
}
