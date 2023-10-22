import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import "swiper/css/navigation"
import "swiper/css/free-mode"

import { Autoplay, FreeMode, Navigation, Pagination } from 'swiper/modules'

import { Course_Card } from './Course_Card'
import { Link } from 'react-router-dom'

export const CourseSlider = ({Courses}) => {

    // console.log("COURSES IN COURSESLIDER ", Courses);
  return (
    <>
      {Courses?.length ? (
        <Swiper
          slidesPerView={1}
          spaceBetween={25}
          loop={true}
          modules={[FreeMode, Pagination]}
          breakpoints={{
            250:{
                slidesPerView: 1,
            },
            650: {
                // width: 576,
                slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          className="max-h-[30rem]"
        >
          {Courses?.map((course, i) => (
            <SwiperSlide key={i}>
              <Course_Card course={course} Height={"h-[250px]"} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p className="text-xl text-richblack-5">No Course Found</p>
      )}
    </>
  )
}

// <>
//         {
//             Courses?.length ? (
//                 <Swiper 
//                 // slidesPerView={1}
//                 preventClicks={false}
//                 preventClicksPropagation={false}
//                 modules={[Pagination, Navigation]}
//                 loop={true}
//                 spaceBetween={25}
//                 pagination={{ clickable: true }}
//                 scrollbar={{ draggable: true }}
//                 // autoplay={{
//                 //     delay:2000,
//                 //     disableOnInteraction: false,
//                 // }}
//                 // navigation={true}
//                 // className='mySwiper'
//                 breakpoints={{
//                     250:{
//                     slidesPerView: 1,
//                     },
//                     650: {
//                     // width: 576,
//                     slidesPerView: 2,
//                     },
                    
//                 }}
//                 className={`${Courses.length === 2 ? "custom-lg:h-[20rem]" : "h-[25rem]"} custom-sm:h-[25rem]`}
//                 >
//                     {
//                         Courses?.map((course, index) => (
//                             <SwiperSlide key={index} onClick={() => console.log("Swiper slide clicked")}>
//                                 {/* <Course_Card course={course} Height={"200px"}/> */}
//                                 <Link to={`/courses/${course._id}`} className='text-4xl'>
//                                     Slide {index}
//                                 </Link>
//                             </SwiperSlide>
//                         ))
//                     }
//                 </Swiper>
//             ) : (
//                 <p className="text-xl text-richblack-5">No course found</p>
//             )
//         }
//     </>