import React from "react"

import Footer from "../Components/Common/Footer"
import ContactDetails from "../Components/Core/ContactPage/ContactDetails"
import ContactForm from "../Components/Core/ContactPage/ContactForm"
import { ReviewSlider } from "../Components/Common/ReviewSlider"
// import ContactDetails from "../components/ContactPage/ContactDetails"
// import ContactForm from "../components/ContactPage/ContactForm"

const Contact = () => {
  return (
    <div>
      <div className="mx-auto mt-20 flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-white custom-lg:flex-row">
        {/* Contact Details */}
        <div className="custom-lg:w-[40%]">
          <ContactDetails />
        </div>

        {/* Contact Form */}
        <div className="custom-lg:w-[60%]">
          <ContactForm />
        </div>
      </div>
      <div className="flex flex-col text-richblack-5">
        {/* Reviws from Other Learner */}
            <h1 className='text-center text-2xl custom-lg:text-4xl font-semibold mt-8'>
                Reviews from other Learners
            </h1>            

            <ReviewSlider/>
      </div>
      <Footer />
    </div>
  )
}

export default Contact