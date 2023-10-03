import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import GetAvgRating from '../../../utils/avgRating';
import { RatingStars } from '../../Common/RatingStars';
import '../../../App.css'

export const Course_Card = ({course, Height}) => {
    
    const [avgReviewCount, setAvgReviewCount] = useState(0);
    
    useEffect(() => {
        // console.log("COURSE IN COURSE CARD ", course)
        const count = GetAvgRating(course.ratingAndReviews);
        setAvgReviewCount(count);
    }, [course]);

  return (

    <div className='custom-sm:w-[90%] w-full '>

        <Link to={`/courses/${course._id}`}>
            <div>
                <div className='rounded-lg w-fit overflow-h-hidden flex items-center justify-center'>
                    <img 
                        src={course?.thumbnail}
                        alt='Course thumnail'
                        className={`h-[200px] custom-lg:${Height} object-contain rounded-xl`}
                    />

                </div>
                <div className="flex flex-col gap-2 px-1 py-3">
                    <p className="text-xl text-richblack-5 capitalize">
                        {course?.courseName}
                    </p>
                    <p  className="text-sm text-richblack-50 capitalize">
                        {course?.instructor?.firstName} {course?.instructor?.lastName}
                    </p>
                    <div  className="flex items-center gap-2 custom-sm:text-sm text-xl">
                        <span className='text-yellow-5'> {avgReviewCount || 0} </span>
                        <RatingStars Review_Count={avgReviewCount}/>
                        <span className="text-richblack-400"> {course?.ratingAndReviews?.length} Ratings</span>
                    </div>
                    <p className="text-xl text-richblack-5">₹ {course?.price}</p>
                </div>
            </div>
        </Link>
    </div>
  )
}
