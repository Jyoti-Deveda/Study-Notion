import React from 'react'
import {BsPeopleFill} from 'react-icons/bs'
import { BiSolidNetworkChart } from 'react-icons/bi'

export const CourseCard = ({cardData, currentCard, setCurrentCard, key}) => {
  return (
    <div className={`flex flex-col gap-2  custom-lg:w-[220px] px-2 pt-3 trasition-all duration-500
    ${currentCard === cardData.heading ? ("bg-white shadow-[10px_10px_0px_3px_#FFD60A]") : ("bg-richblack-800")}`}
    onClick={() => setCurrentCard(cardData.heading)}>
        <h2 className={`font-semibold ${currentCard === cardData.heading ? ("text-richblack-900") : ("")}`}>
            {cardData.heading}
        </h2>
        <p className={`text-richblack-500 text-xs ${currentCard === cardData.heading ? ("") : ("")}`}>
            {cardData.description}
        </p>

        <div className={`flex flex-row items-center justify-between mt-7 m-1 py-2 border-t border-dashed
        ${currentCard === cardData.heading ? ("border-blue-200") : ("border-richblack-500")}`}>
            <div className={`flex flex-row items-center gap-1 text-xs 
            ${currentCard === cardData.heading ? ("text-blue-200") : ("text-richblack-500")}`}>
                <BsPeopleFill/>
                <p>
                    {cardData.level}
                </p>
            </div>

            <div className={`flex flex-row items-center gap-1 text-xs
            ${currentCard === cardData.heading ? ("text-blue-200") : ("text-richblack-500")}`}>
                <BiSolidNetworkChart/>
                <p>
                    {cardData.lessionNumber} Lessons
                </p>
            </div>
        </div>
    </div>
  )
}
