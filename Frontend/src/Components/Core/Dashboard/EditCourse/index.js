import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import { RenderSteps } from '../AddCourse/RenderSteps';
import { getFullDetailsOfCourse } from '../../../../Services/operations/courseDetailsAPI';
import { setCourse, setEditCourse } from '../../../../Slices/courseSlice';

export const EditCourse = () => {

    const dispatch = useDispatch();
    const {courseId} = useParams();
    const {course} = useSelector((state) => state.course);
    const {token} = useSelector((state) => state.auth);
    const [loading, setLoading] = useState();

    useEffect(() => {
        const populateCourseDetails = async() => {
            console.log("COURSE ID IN EDIT COURSE frontend", courseId);
            setLoading(true);
            const result = await getFullDetailsOfCourse({courseId:courseId}, token);
            if(result?.courseDetails){
                dispatch(setEditCourse(true));
                dispatch(setCourse(result?.courseDetails));
                console.log("COURSE IN EDIT COURSE ", course);
            }
            setLoading(false);
        }
        populateCourseDetails();
    }, [])

    if(loading){
        return (
            <div className="grid flex-1 place-items-center">
                <div className='spinner'></div> 
            </div>
        )
    }

  return (
    <div className='text-white'>
        <h1 className="mb-14 text-3xl font-medium text-richblack-5">
        Edit Course
        </h1>
        <div className="mx-auto max-w-[600px]">
            {course ? (
            <RenderSteps />
            ) : (
            <p className="mt-14 text-center text-3xl font-semibold text-richblack-100">
                Course not found
            </p>
            )}
        </div>
    </div>
  )
}
