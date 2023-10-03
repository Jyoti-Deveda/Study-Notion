import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getFullDetailsOfCourse } from '../Services/operations/courseDetailsAPI';
import { setCompletedLectures, setCourseSectionData, setEntireCourseData, setTotalNoOfLectures } from '../Slices/viewCourseSlice';
import { VideoDetailsSidebar } from '../Components/Core/ViewCourse/VideoDetailsSidebar';
import { Outlet } from 'react-router-dom';
import { CourseReviewModal } from '../Components/Core/ViewCourse/CourseReviewModal';

export const ViewCourse = () => {
    const { courseSectionData } = useSelector((state) => state.viewCourse);

    const [reviewModal, setReviewModal] = useState(false);
    const {token} = useSelector((state) => state.auth);
    const {courseId} = useParams();
    const dispatch = useDispatch();

    useEffect(()=> {
        const setCourseSpecificDetails = async() => {
              const courseData = await getFullDetailsOfCourse({courseId: courseId}, token);
              dispatch(setCourseSectionData(courseData.courseDetails.courseContent));
              dispatch(setEntireCourseData(courseData.courseDetails));
              dispatch(setCompletedLectures(courseData.completedVideos));
              let lectures = 0;
              courseData?.courseDetails?.courseContent?.forEach((sec) => {
                lectures += sec.subSection.length
              })  
              dispatch(setTotalNoOfLectures(lectures));
        }
        setCourseSpecificDetails();
    },[]);

    useEffect(() => {
        console.log("COURSE SECTION DATA CHANGED", courseSectionData);
      }, [courseSectionData]);

    useEffect(() => {
        console.log("ReviewModal ", reviewModal);
    }, [reviewModal]);
    
  return (
    <>
        <div className='w-full relative flex flex-row gap-10 min-h-[calc(100vh-3.5rem)]'>
            <VideoDetailsSidebar setReviewModal={setReviewModal}/>

            <div className='h-[calc(100vh-3.5rem)] overflow-auto w-[90%] ml-[8rem]'>
                <div className='mx-auto w-11/12 max-w-[1000px] py-10'>
                    <Outlet/>
                </div>
            </div>

            {reviewModal && <CourseReviewModal setReviewModal={setReviewModal}/>}
            {/* <CourseReviewModal setReviewModal={setReviewModal}/> */}
        </div>
    </>
  )
}
