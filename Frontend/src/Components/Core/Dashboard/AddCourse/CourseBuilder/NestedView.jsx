import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RxDropdownMenu } from "react-icons/rx"
import { BiSolidEditAlt } from "react-icons/bi"
import { AiOutlineDelete, AiFillCaretDown } from "react-icons/ai"
import { HiMiniSquaresPlus } from "react-icons/hi2"
import { SubSectionModal } from './SubSectionModal'
import { ConfirmationModal } from '../../../../Common/ConfirmationModal'
import { deleteSection } from '../../../../../Services/operations/courseDetailsAPI'
import { setCourse } from '../../../../../Slices/courseSlice'
import { deleteSubSection } from '../../../../../Services/operations/courseDetailsAPI'

export const NestedView = ({handleChangeEditSectionName}) => {

    const {course} = useSelector((state) => state.course);
    const {token} = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    //this are the modes a lecture can be viewed in
    const [addSubSection, setAddSubSection] = useState(null)
    const [viewSubSection, setViewSubSection] = useState(null)
    const [editSubSection, setEditSubSection] = useState(null)

    const [confirmationModal, setConfirmationModal] = useState(null);

    // console.log("COURSE IN NESTEDVIEW ", course.courseContent);

    const handleDeleteSection = async (sectionId) => {
        console.log("TOKEN SENT FOR DELETING SECTION ", token);
        const result = await deleteSection({
            sectionId,
            courseId: course._id,
        }, token);

        if(result){
            dispatch(setCourse(result));
        }
        setConfirmationModal(null);
    }

    const handleDeleteSubSection = async (subSectionId, sectionId) => {
        const result = await deleteSubSection({subSectionId, sectionId}, token);
        //the result returns an updated section in which the subsection has been deleted
        //now we need to update the course withthe updated section to be rendered correctly on UI
        if(result){
            const updatedCourseContent = course.courseContent.map((section) => (
                section._id === sectionId ? result : section     
            ))
            const updatedCourse = {...course, courseContent: updatedCourseContent}
            dispatch(setCourse(updatedCourse));
        }
        setConfirmationModal(null);
    }

  return (
    <div>
        <div className="rounded-lg bg-richblack-700 p-6 px-8 custom-sm:px-3"
        id="nestedViewContainer">
            {
                course?.courseContent?.map((section) => (
                    <details key={section._id} open>
                        <summary className="flex cursor-pointer items-center justify-between border-b-2 border-b-richblack-600 py-2">
                            {/* 1 */}
                            <div className='flex items-center gap-x-3'>
                                <RxDropdownMenu className="custom-sm:text-xl text-2xl text-richblack-50"/>
                                <p className="font-semibold text-richblack-50">
                                    {section.sectionName}
                                </p>
                            </div>

                            {/* 2 */}
                            <div className='flex items-center gap-x-3'>
                                <button 
                                type='button'
                                onClick={() => handleChangeEditSectionName(section._id, section.sectionName)}>
                                    <BiSolidEditAlt className="text-xl custom-sm:text-sm text-richblack-300" />
                                </button>

                                <button
                                type='button'
                                onClick={() => {
                                   setConfirmationModal({
                                    text1: "Delete this Section ",
                                    text2: "All the lectures in this section ",
                                    btn1Text: "Delete",
                                    btn2Text: "Cancel",
                                    btn1Handler: () => handleDeleteSection(section._id),
                                    btn2Handler: () => setConfirmationModal(null),
                                   }) 
                                }}>
                                    <AiOutlineDelete className="custom-sm:text-sm text-xl text-richblack-300" />
                                </button>
                            </div>

                            {/* 3 */}
                            <span className="font-medium text-richblack-300">|</span>

                            {/* 4 */}
                            <AiFillCaretDown className='custom-sm:text-md text-xl text-richblack-300'/>
                        </summary>

                        {/* the section of dropdown other then details */}
                        <div className='px-6 pb-4'>
                            {
                                section?.subSection?.map((data) => (
                                    <div key={data?._id} 
                                    onClick={() => setViewSubSection(data)}
                                    className='flex cursor-pointer items-center justify-between gap-x-3 border-b-2 border-b-richblack-600 py-2'
                                    >
                                        {/* 1 */}
                                        <div className='flex items-center justify-between gap-x-3 py-2'>
                                            <RxDropdownMenu className="custom-sm:text-xl text-2xl text-richblack-50" />
                                            <p className="font-semibold custom-sm:w-[80px] w-[150px] custom-lg:w-max text-richblack-50 overflow-hidden">
                                                {data.title}
                                            </p>
                                        </div>

                                        {/* 2 */}
                                        <div onClick={e => e.stopPropagation()}
                                        className='flex items-center gap-x-3'
                                        >
                                            <button onClick={() => setEditSubSection({...data, sectionId: section._id})}
                                            >
                                               <BiSolidEditAlt className="custom-sm:text-sm text-xl text-richblack-300" />
                                            </button>

                                            <button
                                                type='button'
                                                onClick={() => {
                                                setConfirmationModal({
                                                    text1: "Delete this Sub Section ",
                                                    text2: "Selected lecture will be deleted",
                                                    btn1Text: "Delete",
                                                    btn2Text: "Cancel",
                                                    btn1Handler: () => handleDeleteSubSection(data._id, section._id),
                                                    btn2Handler: () => setConfirmationModal(null),
                                                }) 
                                                }}>
                                                    <AiOutlineDelete className="custom-sm:text-sm text-xl text-richblack-300" />
                                            </button>

                                        </div>
                                    </div>
                                ))
                            }

                            <button 
                            onClick={() => setAddSubSection(section._id)}
                            className='flex items-center gap-x-1 text-yellow-50'>
                                <HiMiniSquaresPlus className='text-lg'/>
                                <p>
                                    Add Lecture
                                </p>
                            </button>
                        </div>
                    </details>
                ))
            }
        </div>

        {
            addSubSection ? (<SubSectionModal 
                modalData={addSubSection}
                setModalData={setAddSubSection}
                add={true}
            />) : 
            viewSubSection ? (<SubSectionModal
                modalData={viewSubSection}
                setModalData={setViewSubSection}
                view={true}
            />) : 
            editSubSection ? (<SubSectionModal
                modalData={editSubSection}
                setModalData={setEditSubSection}
                edit={true}
            />) : 
            (<div></div>)

        }

        {
            confirmationModal 
            ? (
                <ConfirmationModal modalData={confirmationModal}/>
            ) : 
            (<div></div>)
        }
    </div>
  )
}
