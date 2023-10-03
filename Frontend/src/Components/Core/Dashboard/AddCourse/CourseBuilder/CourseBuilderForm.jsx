import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { IconButton } from '../../../../Common/IconButton';
import { HiSquaresPlus } from "react-icons/hi2"
import { useDispatch, useSelector } from 'react-redux';
import { BiRightArrow } from "react-icons/bi"
import { setCourse, setEditCourse, setStep } from '../../../../../Slices/courseSlice';
import { toast } from 'react-hot-toast';
import { createSection, updateSection } from '../../../../../Services/operations/courseDetailsAPI';
import { NestedView } from './NestedView';

export const CourseBuilderForm = () => {

  const {
    register, 
    handleSubmit, 
    setValue, 
    getValues,
    formState: {errors}
  } = useForm();

  const [editSectionName, setEditSectionName] = useState(null);
  const {course} = useSelector((state) => state.course);
  const {token} = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const goBack = () => {
    dispatch(setStep(1));
    dispatch(setEditCourse(true));
  }

  const goToNext = () => {
    //can go to next step inly if atleast one section and subsection i.e video is added
    if(course?.courseContent?.length === 0){
      toast.error("Please add atleast one section");
      return;
    }
    if(course?.courseContent?.some((section) => section.subSection.length === 0)){
      toast.error("Please add atleast one lecture in each section")
      return;
    }
    //if everything is good
    dispatch(setStep(3));
  }

  const onSubmit = async(data) => {
    console.log("Course in CourseBUILDER ", course);
    setLoading(true);
    let result = null;

    if(editSectionName){
      //editing section
      result = await updateSection(
        {
          sectionName: data.sectionName,
          sectionId: editSectionName,
          courseId: course._id,
        }, token
      )
    }
    else{
      result = await createSection(
        {
          sectionName: data.sectionName,
          courseId: course._id,
        }, token
      )
    }

    console.log("RESULT IN COURSEBUILDER ONSUBMIT", result);
    //update values
    if(result){
      dispatch(setCourse(result));
      setEditSectionName(null);
      setValue("sectionName", "");
    }
    console.log("Course ", course);
  }
  
  const cancelEdit = () => {
    setEditSectionName(null);
    //this value is being set as the form value handled by useForm
    setValue("sectionName", "")
  }


  const handleChangeEditSectionName = (sectionId, sectionName) => {
    // this function toggles the function of the edit button in NestedView
    if(editSectionName){
      cancelEdit();
      return;
    }
    
    //editSectionName is a boolean variable 
    setEditSectionName(sectionId);
    setValue("sectionName", sectionName);
  }

  return (
    <div className="space-y-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6">
      <p className="text-2xl font-semibold text-richblack-5">
        Course Builder
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
        <div className='flex flex-col space-y-2'>
          <label className="text-sm text-richblack-5" htmlFor='sectionName'>
            Section name<sup className="text-pink-200">*</sup>
          </label>
          <input
            id='sectionName'
            placeholder='Add a section to build your course'
            type='text'
            {...register("sectionName", {required: true})}
            className='w-full form-style'
          />
          {
            errors.sectionName && (
              <span className="ml-2 text-xs tracking-wide text-pink-200"> 
              Section name is required</span>
            )
          }
        </div>
        <div className='flex flex-row items-end gap-x-4'>
          <IconButton
            type='submit'
            text={editSectionName ? "Edit section name" : "Create section"}
            outline={true}
            customClasses={"text-yellow-50"}
          >
            <HiSquaresPlus className='text-yellow-50'/>
          </IconButton>
          {
            editSectionName && (
              <button 
              type='button'
              className='text-sm text-richblack-400 underline'
              onClick={cancelEdit}>
                Cancel Edit
              </button>
            )
          }
        </div>
      </form>
      {
        course.courseContent.length > 0 && (
          <NestedView
            handleChangeEditSectionName={handleChangeEditSectionName}
          />
        )
      }

      {/* next prev button  */}
      <div className='flex justify-end gap-x-3 mt-10'>
          <button onClick={goBack}
          className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900`}>
            Back
          </button>
          <IconButton text={"Next"} 
          onclick={goToNext}
          >
            <BiRightArrow/>
          </IconButton>
      </div>

    </div>
  )
}
