import React from 'react'
import { Link } from 'react-router-dom'

export const CTAButton = ({children, active, linkto}) => {
  return (
    <Link to={linkto}>
        <div className={`text-center font-bold text-[13px] px-6 py-3 rounded-md ${active ? ("bg-yellow-50 text-black") : ("bg-richblack-800 border-b-2 border-r-2 border-richblack-600")} hover:scale-95 transition-all duration-200`}>
            {children}
        </div>
    </Link>
  )
}
