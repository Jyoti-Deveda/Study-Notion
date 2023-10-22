import React from 'react'

export const IconButton = ({
    text,
    onclick,
    children,
    outline,
    disabled=false,
    customClasses,
    type
}) => {
  return (
    <button
        disabled={disabled}
        onClick={onclick}
        className={`flex items-center ${
          outline ? "border border-yellow-50 bg-transparent" : "bg-yellow-50"
        } cursor-pointer gap-x-2 custom-sm:gap-x-1 custom-sm:text-xs rounded-md py-2 custom-lg:px-5 px-3 font-semibold text-richblack-900 ${customClasses}`}
        type={type}
      >
            {
                children ? (
                    <>
                        <span className='custom-sm:text-xs'>
                            {text}
                        </span>
                        {children}
                    </>
                ) : (text)
            }
    </button>
  )
}
