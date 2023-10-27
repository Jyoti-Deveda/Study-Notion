import React from 'react'
import { IconButton } from '../../../Common/IconButton';
import { useDispatch, useSelector } from 'react-redux';
import { buyCourse } from '../../../../Services/operations/studentFeaturesAPI';
import { useNavigate } from 'react-router-dom';

export const RenderTotalAmount = () => {

    const {total, cart} = useSelector((state) => state.cart);
    const {token} = useSelector((state) => state.auth);
    const {user} = useSelector((state) => state.profile);
    const navigate = useNavigate();
    const dispatch =  useDispatch();

    const handleBuyCourse = async () => {
        console.log("handleBuyCourse called");
        const courses = cart.map((course) => course._id);
        console.log("Buy these courses ", courses);
        //TODO: API Integrate
        buyCourse(token, courses, user, navigate, dispatch)
    }

  return (
    <div className="min-w-[280px] custom-sm:min-w-[90%] rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6">
        <p className="mb-1 text-sm font-medium text-richblack-300">
            Total
        </p>
        <p className="mb-6 text-3xl font-medium text-yellow-100">
            ₹ {total}
        </p>
        <IconButton
            text={"Buy Now"}
            // onclick={handleBuyCourse}
            onclick={handleBuyCourse}
            customClasses={"w-full justify-center"}
        />
    </div>
  )
}
