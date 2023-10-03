import React from 'react'
import { ContactUsForm } from '../ContactPage/ContactUsForm'

export const ContactFormSection = () => {
  return (
    <div className='flex flex-col items-center gap-3'>
        <div className='flex flex-col items-center gap-2'>
          <h1 className='text-2xl font-bold text-richblack-5'>    
              Get in Touch
          </h1>
          <p className='text-richblack-300 text-sm tracking-wide'>
              We’d love to here for you, Please fill out this form.
          </p>
        </div>
        <div>
            <ContactUsForm/>
        </div>
    </div>
  )
}
