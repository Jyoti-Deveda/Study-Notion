import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { IconButton } from '../../../../Common/IconButton';
import { resetCourseState, setStep } from '../../../../../Slices/courseSlice';
import { COURSE_STATUS } from '../../../../../utils/constants';
import { editCourseDetails } from '../../../../../Services/operations/courseDetailsAPI';
import { useNavigate } from 'react-router-dom';

export const PublishCourse = () => {

    const { register, handleSubmit, setValue, getValues} = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {token} = useSelector((state) => state.auth);
    const {course} = useSelector(state => state.course);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if(course?.status === COURSE_STATUS.PUBLISHED){
            setValue("public", true);
        }
    }, []);

    const onSubmit = (data) => {
        handleCoursePublish(); 
    }

    const goToCourses = () => {
        dispatch(resetCourseState());
        navigate("/dashboard/my-courses");
    }

    const handleCoursePublish = async () => {
        if(course?.status === COURSE_STATUS.PUBLISHED && getValues("public") === true || 
        (course.status === COURSE_STATUS.DRAFT && getValues("public") === false)){
            //no updation in form 
            //no need to call api
            goToCourses();
            return;
        }

        // if form is updated 
        const formData = new FormData();
        formData.append("courseId", course._id);
        const courseStatus = getValues("public") ? COURSE_STATUS.PUBLISHED : COURSE_STATUS.DRAFT;
        formData.append("status", courseStatus);

        setLoading(true);
        const result = await editCourseDetails(formData, token);

        if(result){
            goToCourses();
        }
        setLoading(false);
    }

    const goBack = () => {
        dispatch(setStep(2));
    }

  return (
    <div className='rounded-md border-[1px] bg-richblack-800 p-6 border-richblack-700'>

        <p>
            Publish Course
        </p>

        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
            <label htmlFor='public'>
                <input
                    type='checkbox'
                    id='public'
                    {...register('public')}
                    className='rounded h-4 w-4'
                />
                <span className='ml-3'>
                    Make this course as public
                </span>
                </label>
            </div>

            <div className='flex items-center justify-end gap-x-3 '>
                <button
                    disabled={loading}
                    type='button'
                    onClick={goBack}
                    className='flex items-center rounded-md bg-richblack-300 px-4 py-2'
                >
                    Back
                </button>
                <IconButton
                    disabled={loading}
                    text="Save changes"
                />
            </div>
        </form>
    </div>
  )
}
