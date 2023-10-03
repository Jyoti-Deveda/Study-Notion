import React, { useEffect, useState } from 'react'
import { buyCourse } from '../Services/operations/studentFeaturesAPI'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { fetchCourseDetails } from '../Services/operations/courseDetailsAPI'
import GetAvgRating from '../utils/avgRating'
import { Error } from './Error'
import {ConfirmationModal} from "../Components/Common/ConfirmationModal"
import { RatingStars } from "../Components/Common/RatingStars"
import {formatDate} from '../Services/formatDate'
import { CourseDetailsCard } from '../Components/Core/Course/CourseDetailsCard'
import { HiOutlineInformationCircle } from 'react-icons/hi'
import { BsGlobe, BsDot } from 'react-icons/bs'
import CourseAccordionBar from '../Components/Core/Course/CourseAccordionBar'

export const CourseDetails = () => {

    const {user} = useSelector((state) => state.profile)
    const {token} = useSelector((state) => state.auth)
    const {loading} = useSelector((state) => state.profile);
    const {paymentLoading} = useSelector((state) => state.course);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {courseId} = useParams();

    const [courseData, setCourseData] = useState(null);
    const [confimationModal, setConfirmationModal] = useState(null);

    useEffect(() => {
        const getCourseFullDetails = async() => {
            try{
                const result = await fetchCourseDetails(courseId);
                console.log("RESULT ", result);
                setCourseData(result);
            }catch(err){
                console.log("Could not fetch course details");
            }
        }
        getCourseFullDetails();
    }, [courseId]);

    useEffect(() => {
        console.log("COURSE DATA ", courseData);
    }, [courseData]);

    const [avgReviewCount, setAvgReviewCount] = useState(0);

    useEffect(() => {
        const  count = GetAvgRating(courseData?.courseDetails?.ratingAndReviews);
        setAvgReviewCount(parseFloat(count));
    }, [courseData]);

    const [totalNoOfLectures, setTotalNoOfLectures] = useState(0);

    useEffect(() => {
        let lectures = 0;
        courseData?.courseDetails?.courseContent?.forEach((sec) => {
            lectures += sec.subSection.length || 0;
        })
    }, [courseData]);

    const [isActive, setIsActive] = useState(Array(0));

    const handleActive = (id) => {
        setIsActive(
            !isActive.includes(id) 
            ? isActive.concat(id)
            : isActive.filter((e) => e != id)
        )
    }

    const handleBuyCourse = () => {
        if(token){
            buyCourse(token, [courseId], user, navigate, dispatch)
            return;
        }else{
            setConfirmationModal({
                text1: "You are not logged in",
                text2: "Please login to purchase the course",
                btn1Text: "Login",
                btn2Text: "Cancel",
                btn1Handler: () => navigate("/login"),
                btn2Handler: () => setConfirmationModal(null),
            })
        }
    }

    if(loading || !courseData) {
        return (
            <div>
                Loading...
            </div>
        )
    }

    if(!courseData.success){
        <div>
            <Error/>
        </div>
    }

    const {
        _id: course_id,
        courseName,
        courseDescription,
        thumbnail,
        price,
        whatYouWillLearn,
        courseContent,
        ratingAndReviews,
        instructor,
        studentsEnrolled,
        createdAt,
    } = courseData?.courseDetails

  return (
    <div className='flex flex-col text-white h-[1000px] min-h-screen bg-richblack-900'>
        
        <div className='w-full relative bg-richblack-800 custom-lg:h-[15rem] min-h-max'>
            <div className='lg:w-8/10 custom-md:w-[50%]  flex flex-col gap-2 pl-[100px] pt-5'>
                <p className='text-2xl custom-md:text-lg font-semibold capitalize'>
                    {courseName}
                </p>
                <p className='custom-lg:text-sm text-xs text-richblack-400'>
                    {courseDescription}
                </p>
                <div className='flex custom-lg:flex-row flex-col gap-2 custom-lg:items-center '>
                    <span className='text-lg text-yellow-50 flex flex-row gap-2'>{avgReviewCount}
                    <RatingStars Review_Count={avgReviewCount} Star_Size={24}/></span>
                    
                    <span className='text-richblack-25 custom-lg:text-lg text-xs'>{`(${ratingAndReviews.length} Reviews)`}</span>
                    <span className='text-richblack-25 custom-lg:text-lg text-xs'>{`${studentsEnrolled.length} Students`}</span>
                </div>

                <div>
                    <p className='text-richblack-25 text-lg'>Created By {`${instructor.firstName}`}</p>
                </div>

                <div className='flex gap-x-3 flex-col custom-lg:flex-row custom-lg:text-lg text-xs gap-2 pb-4'>
                    <p className='flex flex-row items-center gap-2'> 
                    <HiOutlineInformationCircle className=''/>
                    Created At {formatDate(createdAt)} </p>
                    <p className='flex flex-row items-center gap-2'>
                        <BsGlobe/>
                        English
                    </p>
                </div>
            </div>

            <div className='absolute right-[100px] top-[50px] custom-lg:w-[350px] custom-md:w-[40%]
             custom-md:right-[7%] bg-richblack-700 rounded-md
             custom-sm:w-[300px] custom-sm:top-[110%] custom-sm:float mx-auto'>
                <CourseDetailsCard 
                    course={courseData?.courseDetails}
                    setConfirmationModal={setConfirmationModal}
                    handleBuyCourse={handleBuyCourse}
                />
            </div>
        </div>

        <div className='w-8/10 custom-sm:mt-[20rem] flex flex-col gap-2 pl-[100px] pt-5'>
            <p className='text-2xl '> What you will learn</p>
            <p>
                {whatYouWillLearn}
            </p>
        </div>

        <div className='custom-lg:w-7/12 custom-md:w-[50%] flex flex-col gap-2 pl-[100px] pt-5'>
            <div  className="flex flex-col gap-2">
                <p className='text-2xl'>Course content</p>

                <div className='flex custom-lg:flex-row flex-col gap-3 lg:justify-between'>
                    <div className='flex custom-lg:flex-row flex-col gap-x-2 custom-lg:items-center text-md text-richblack-400'>
                        <span>
                            {courseContent.length} sections 
                        </span>
                        <BsDot />
                        <span>
                            {totalNoOfLectures} lectures
                        </span>
                        <BsDot/>
                        <span>
                            {courseData?.totalDuration} total length
                        </span>
                    </div>

                    <div className='custom-md:self-end'>
                        <button onClick={() => setIsActive([])}
                        className='w-full text-yellow-50 text-md tracking-wide font-semibold'>
                            Collapse all sections
                        </button>
                    </div>

                    
                </div>

                {/* Course Details Accordion */}
                <div className="py-4 mt-0">
                    {courseContent?.map((course, index) => (
                        <CourseAccordionBar
                        course={course}
                        key={index}
                        isActive={isActive}
                        handleActive={handleActive}
                        />
                    ))}
                    </div>

                    {/* Author Details */}
                    <div className="mb-12 py-4">
                    <p className="text-[28px] font-semibold">Author</p>
                    <div className="flex items-center gap-4 py-4">
                        <img
                        src={
                            instructor.image
                            ? instructor.image
                            : `https://api.dicebear.com/5.x/initials/svg?seed=${instructor.firstName} ${instructor.lastName}`
                        }
                        alt="Author"
                        className="h-14 w-14 rounded-full object-cover"
                        />
                        <p className="text-lg">{`${instructor.firstName} ${instructor.lastName}`}</p>
                    </div>
                    <p className="text-richblack-50">
                        {instructor?.additionalDetails?.about}
                    </p>
                    </div>
            </div>          
        </div>
        

        {confimationModal && <ConfirmationModal modalData={confimationModal}/> }
    </div>
  )
}
