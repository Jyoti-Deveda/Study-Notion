import React from 'react'
import { HighlightText } from './HighlightText'
import know_your_progress from '../../../assets/Images/Know_your_progress.svg'
import compare_with_others from '../../../assets/Images/Compare_with_others.svg'
import plan_your_lessons from '../../../assets/Images/Plan_your_lessons.svg'
import { CTAButton } from './CTAButton'

export const LearningLanguageSection = () => {
  return (
    <div className='mt-[130px] mb-32'>
      <div className='flex flex-col gap-5 items-center w-full'>

          <div className='font-semibold custom-sm:text-2xl text-4xl text-center'>
            Your Swiss Knife for <HighlightText text={"learning any language"}/>
          </div>

          <div className='text-center text-richblack-600 mx-auto text-base mt-3 font-medium w-[70%]'>
            Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.
          </div>

          <div className='flex flex-row custom-sm:flex-col ites-center justify-content mt-5'>
            <img
              src={know_your_progress}
              alt="know_your_progress"
              className='object-contain -mr-32'
            />
            <img
              src={compare_with_others}
              alt="compare_with_others"
              className='object-contain'
            />
            <img
              src={plan_your_lessons}
              alt="plan_your_lessons"
              className='object-contain -ml-32 custom-sm:ml-0'
            />
          </div>

          <div className='w-fit mx-auto'>
            <CTAButton active={true} linkto={"/signup"}>
                Learn more
            </CTAButton>
          </div>
      </div>
      
    </div>
  )
}
