import React from 'react'
import { RenderSteps } from './RenderSteps'

export const AddCourse = () => {
  return (
        <>
            <div className='text-white flex gap-5 custom-sm-md:flex-col'>
                <div className='custom-lg:w-[60%] w-full flex flex-col gap-8'>
                    <h1 className='text-3xl font-bold'>Add course</h1>
                    <div>
                        <RenderSteps/>
                    </div>
                </div>
                <div className='bg-richblack-800 text-richblack-5 flex flex-col gap-4 h-max p-3 custom-lg:w-[40%]'>
                    <p className='text-lg'>⚡Code Upload Tips</p>
                    <ul className='text-xs list-disc m-3 flex flex-col gap-2'>
                        <li>Set the Course Price option or make it free.</li>
                        <li>Standard size for the course thumbnail is 1024x576.</li>
                        <li>Video section controls the course overview video.</li>
                        <li>Course Builder is where you create & organize a course.</li>
                        <li>Add Topics in the Course Builder section to create lessons, quizzes, and assignments.</li>
                        <li>Information from the Additional Data section shows up on the course single page.</li>
                        <li>Make Announcements to notify any important</li>
                        <li>Notes to all enrolled students at once.</li>
                    </ul>
                </div>
            </div>
        </>
  )
}
