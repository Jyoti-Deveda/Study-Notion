import React from 'react'
import { CTAButton } from './CTAButton'
import { FaArrowRight } from "react-icons/fa"
import {TypeAnimation} from 'react-type-animation'

export const CodeBlocks = ({position, heading, subHeading, ctabtn1, ctabtn2, codeblock, backgroundGradient, codeColor}) => {
  return (
    <div className={`flex ${position} my-20 items-start custom-lg:justify-between gap-10`}>
        
        {/* section 1  */}
        <div className='w-[100%] custom-lg:w-[50%] flex flex-col gap-8'>
            {heading}
            <div className='custom-lg:text-center custom-sm:text-sm text-lg font-bold text-richblack-300 '>
                {subHeading}
            </div>
            <div className='flex gap-7 mt-7'>
                <CTAButton active={ctabtn1.active} linkto={ctabtn1.linkto}>
                    <div className='flex gap-2 items-center'>
                        {ctabtn1.btnText}
                        <FaArrowRight/>
                    </div>
                </CTAButton>
                    
                <CTAButton active={ctabtn2.active} linkto={ctabtn2.linkto}>
                    {ctabtn2.btnText}
                </CTAButton>
            </div>
        </div>

        {/* section 2 */}
        <div className='bg flex flex-row justify-between h-fit w-[80%] custom-lg:w-[500px] py-4 border-richblack-100
        bg-[radial-gradient(ellipse_at_center)] from-richblack-700 to-yellow-900'>
            {/* hw- bg gradient  */}
            {backgroundGradient}


            <div className='text-center flex flex-col w-[10%]  custom-sm:text-xs text-richblack-400 font-inter font-bold'>
                <p>1</p>
                <p>2</p>
                <p>3</p>
                <p>4</p>
                <p>5</p>
                <p>6</p>
                <p>7</p>
                <p>8</p>
                <p>9</p>
                <p>10</p>
                <p>11</p>
            </div>

            <div className={`w-[90%] custom-sm:text-xs flex flex-col custom-sm:flex-wrap  custom-sm:overflow-x-hidden pr-2 gap-2 font-bold font-mono ${codeColor} pr-2`}>
                <TypeAnimation
                    sequence ={[codeblock, 2000, ""]}
                    repeat={Infinity}
                    omitDeletionAnimation={true}
                    cursor={true}
                    style={
                        {
                            whiteSpace:"pre-line",
                            display:"block"
                        }

                    }
                />
            </div>
        </div>
    </div>
  )
}

