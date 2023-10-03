import React from 'react'
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import copy from 'copy-to-clipboard'
import { ACCOUNT_TYPE } from '../../../utils/constants'
import { addToCart } from '../../../Slices/cartSlice';

export const CourseDetailsCard = ({course, setConfirmationModal, handleBuyCourse}) => {

    const {user} = useSelector((state) => state.profile);
    const {token} = useSelector((state) => state.auth);
    const navigate   = useNavigate();
    const dispatch = useDispatch();
    console.log("Course in course Details card ", course);

    const {
        thumbnail: thumbnailImage,
        price:currentPrice,
    } = course;

    const handleAddToCart = () => {
        if(user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
            toast.error("You are an instructor, you can't buy a course");
            return;
        }
        if(token){
            dispatch(addToCart(course));
            return;
        }

        setConfirmationModal({
            text1: "You are not logged in",
            text2: "PLease Login to add to Cart",
            btn1Text: "Login",
            btn2Text: "Cancel",
            btn1Handler: () => navigate("/login"),
            btn2Handler: () => setConfirmationModal(null),
        })
    }

    const handleShare = () => {
        copy(window.location.href);
        toast.success("Link copied to clipboard")
    }
  return (
    <div className='flex flex-col gap-4 rounded-md bg-richblack-700 p-4 text-richblack-5'>
        <img
            src={thumbnailImage}
            alt='Thubnail Image'
            className='max-h-[300px] min-h-[180px] w-[400p] rounded-t-md custom-sm:hidden'
        />
        
        <div className='p-3 flex flex-col gap-y-2'>
            <div className='text-2xl font-semibold'>
                Rs. {currentPrice}
            </div>

            <div className='flex flex-col gap-y-6 items-stretch'>
                {
                    (!course?.studentsEnrolled.includes(user?._id)) && (
                        <button onClick={handleAddToCart}
                        className='bg-yellow-50 text-richblack-900 font-semibold px-3 py-2 rounded-md self-stretch'>
                            Add to Cart
                        </button>
                    )
                }
                <button
                className='bg-richblack-900 text-richblack-100 font-semibold px-3 py-2 rounded-md shadow-lg'
                    onClick={user && course?.studentsEnrolled.includes(user?._id)
                    ? () => navigate('/dashboard/enrolled-courses') 
                    : () => handleBuyCourse() }
                >
                    {
                        user && course?.studentsEnrolled.includes(user?._id) ? "Go to course " :
                        "Buy Now"
                    }
                </button>

                
            </div>

            <div className='flex flex-col gap-3'>
                <p className='text-md text-richblack-200 text-center'>
                    30 Days Money-back Guarantee
                </p>
                <p className='text-md text-richblack-5 font-semibold custom-sm:hidden'>
                    This Course includes:
                </p>
                <div className='flex flex-col gap-y-3 custom-sm:hidden'>
                    {
                        course?.instructions?.map((item, index) => (
                            <p key={index} className='flex gap-2'>
                                <span>{item}</span>
                            </p>
                        ))
                    }
                </div>
            </div>

            <div>
                <button
                className='mx-auto flex items-center gap-2 p-6 text-yellow-50'
                onClick={() => handleShare()}>
                    Share
                </button>
            </div>
        </div>
    </div>
  )
}
