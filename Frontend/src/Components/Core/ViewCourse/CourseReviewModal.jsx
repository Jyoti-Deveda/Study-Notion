import React, { useEffect } from 'react'
import { AiOutlineClose }  from 'react-icons/ai'
import { useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import ReactStars from "react-rating-stars-component";
import { IconButton } from '../../Common/IconButton';
import { createRating } from '../../../Services/operations/courseDetailsAPI';

export const CourseReviewModal = ({setReviewModal}) => {
    
    const {user} = useSelector((state) => state.profile);
    const {token} = useSelector((state) => state.auth);
    const {courseEntireData} = useSelector((state) => state.viewCourse);

    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState: {errors},
    } = useForm()

    useEffect(() => {
        setValue("courseExperience", "");
        setValue("courseRating", "");
    })

    const ratingChanged = (newRating) => {
        console.log("newRating ", newRating);
        setValue("courseRating", newRating);
      };

    const onSubmit = async (data) => {
        await createRating({
            courseId: courseEntireData._id,
            rating: data.courseRating,
            review: data.courseExperience,
        },
        token
        )
        setReviewModal(false);
    }
    
  return (
    <div>

        <div className='text-white'>
            {/* modal header */}
            <div>
                <p>Add review</p>
                <button 
                onClick={() => setReviewModal(false)}>
                    <AiOutlineClose/>
                </button>
            </div>

            {/* modal body  */}
            <div>

                <div>
                    <img
                        src={user?.image}
                        alt='user Image'
                        className='aspect-square w-[50px] rounded-full object-cover'
                    />

                    <div>
                        <p>{user?.firstName} {user?.lastName}</p>
                        <p>Posting publicly</p>
                    </div>
                </div>

                

                <form onSubmit={handleSubmit(onSubmit)}
                className='mt-6 flex flex-col items-center'>
                    <ReactStars
                        count={5}
                        onChange={ratingChanged}
                        size={24}
                        activeColor="#ffd700"
                    />

                    <div>
                        <label htmlFor='courseExperience'>
                            Add your experience
                        </label>
                        <textarea
                            id='courseExperience'
                            placeholder='Add your experience here'
                            {...register("courseExperience", {required: true})}
                            className='form-style min-h-[130px] w-full'
                        />
                        {
                            errors.courseExperience && (
                                <span>
                                    Please add your experience
                                </span>
                            )
                        }
                    </div>

                    <div>
                        {/* save and cancel buttons  */}
                        <button onClick={() => setReviewModal(false)}>
                            Cancel
                        </button>

                        <IconButton 
                            text="Save"
                        />
                    </div>

                </form>
            </div>
        </div>

    </div>
  )
}
