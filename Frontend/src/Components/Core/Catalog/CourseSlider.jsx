import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import "swiper/css/navigation"
import "swiper/css/scrollbar"
import { Autoplay, Freemode, Navigation, Pagination, Scrollbar } from 'swiper/modules'

import { Course_Card } from './Course_Card'

export const CourseSlider = ({Courses}) => {

    // console.log("COURSES IN COURSESLIDER ", Courses);
  return (
    <>
        {
            Courses?.length ? (
                <Swiper 
                // slidesPerView={1}
                modules={[Pagination, Navigation, Autoplay, Scrollbar]}
                loop={true}
                spaceBetween={25}
                pagination={{ clickable: true }}
                scrollbar={{ draggable: true }}
                autoplay={{
                    delay:1000,
                    disableOnInteraction: false,
                }}
                // navigation={true}
                // className='mySwiper'
                breakpoints={{
                    250:{
                    slidesPerView: 1,
                    },
                    650: {
                    // width: 576,
                    slidesPerView: 2,
                    },
                    
                }}
                className={`${Courses.length === 2 ? "custom-lg:h-[20rem]" : "h-[25rem]"} custom-sm:h-[25rem]`}
                >
                    {
                        Courses?.map((course, index) => (
                            <SwiperSlide key={index}>
                                <Course_Card course={course} Height={"200px"}/>
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            ) : (
                <p className="text-xl text-richblack-5">No course found</p>
            )
        }
    </>
  )
}
