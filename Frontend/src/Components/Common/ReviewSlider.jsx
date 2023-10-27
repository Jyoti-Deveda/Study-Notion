import React, { useEffect, useState } from 'react'

import { Swiper, SwiperSlide } from 'swiper/react';
import { FaStar} from 'react-icons/fa'

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { Autoplay, FreeMode, Navigation, Pagination } from 'swiper/modules'

import ReactStars from 'react-rating-stars-component'
import { apiConnector } from '../../Services/apiconnector';
import { ratingsEndpoints } from '../../Services/apis';

export const ReviewSlider = () => {

  const [reviews, setReviews] = useState([]);
  const truncateWords = 15;

  useEffect(() => {
    const fetchAllRatings = async() => {
      const {data} = await apiConnector("GET", ratingsEndpoints.REVIEWS_DETAILS_API);
      // console.log("RESPONSE ", data);

      if(data?.success){
        setReviews(data?.data);
      }
    }
    fetchAllRatings();
  }, []);

  // useEffect(() => {
  //   console.log("Reviews ", reviews);
  // }, [reviews]);

  return (
    <div className='text-white '>
        {/* Idhar review slider hai */}
        <div className='h-[190px] max-w-maxContent ease-linear mb-[30px]'>
          <Swiper
          // slidesPerView={4}
          spaceBetween={24}
          centeredSlides={true}
          breakpoints={{
            250:{
              slidesPerView: 1,
            },
            576: {
              // width: 576,
              slidesPerView: 2,
            },
            768: {
              // width: 768,
              slidesPerView: 3,
            },
            1000: {
              slidesPerView: 4
            }
          }}
          modules={[FreeMode, Autoplay, Pagination]}          
          freeMode={true}
          pagination={{
            clickable: true
          }}
          autoplay={{
              delay: 1000,
              disableOnInteraction: false,
          }}
          loop={true}  
          // pagination={true}
          // modules={[FreeMode, Pagination, Autoplay]}
          // autoplay={{
          //   delay: 2500,
          // }}
          className='w-full p-5 ease-linear h-[13rem]'
          >
            {
              reviews.map((review, index) => (
                <SwiperSlide key={index} 
                className='flex flex-col gap-1 bg-richblack-800 rounded-sm px-3 py-2 h-[10rem] min-h-max'>
                  <div className='flex flex-row gap-x-4'>
                    <img
                      src={review?.user?.image 
                      ? review?.user?.image 
                      : `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName} ${review?.user?.lastName}`}
                      alt='Profile picture'
                      className="h-9 w-9 aspect-square rounded-full "
                    />
                    
                    <div className='flex flex-col'>
                      <p className='capitalize text-md font-semibold'>{review?.user?.firstName} {review?.user?.lastName}</p>
                      <p className='capitalize text-sm text-richblack-500'>{review?.course?.courseName}</p>
                    </div>
                  </div>
                  <p className='text-sm text-richblack-100'>
                    {
                      review?.review.split(' ').splice(0, 10).join(" ") 
                    }...
                  </p>
                  <div className='flex gap-x-3 items-center'>
                    <p className='text-yellow-50 font-semibold text-md'>{review?.rating}</p>
                    <ReactStars
                      count={5}
                      value={review.rating}
                      size={24}
                      edit={false}
                      activeColor="#ffd700"
                      emptyIcon={<FaStar/>}
                      fullIcon={<FaStar/>}
                    />
                  </div>
                </SwiperSlide>
              ))
            }
          </Swiper>
        </div>
    </div>
  )
}
