import React from 'react'
import { useSelector } from 'react-redux'
import { RenderCartCourses } from './RenderCartCourses'
import { RenderTotalAmount } from './RenderTotalAmount'
export const Cart = () => {

    const {totalItems} = useSelector((state) => state.cart)
    const {total} = useSelector((state) => state.cart)
    
  return (
    <div>
        <h1 className="mb-14 text-3xl font-medium text-richblack-5">Your cart</h1>
        <p className="border-b border-b-richblack-400 pb-2 font-semibold text-richblack-400">
            {totalItems} Courses in Cart
        </p>

        {
            total > 0 
            ? (
                <div className="mt-8 flex flex-col items-start gap-x-10 gap-y-6 custom-lg:flex-row">
                    <RenderCartCourses/>
                    <RenderTotalAmount/>
                </div>
            )
            : (
                <p className="mt-14 text-center text-3xl text-richblack-100">
                    Your cart is empty
                </p>
            )
        }
    </div>
  )
}
