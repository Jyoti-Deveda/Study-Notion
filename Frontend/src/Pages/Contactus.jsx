import React from 'react'
import { HiMiniChatBubbleLeftRight } from "react-icons/hi"
import { FaEarthAfrica } from "react-icons/fa"
import { IoCall } from "react-icons/io"



export const Contactus = () => {

    const contactData = [
        {
            icon : "<HiMiniChatBubbleLeftRight/>",
            heading: "Chat on us",
            desc: "Our friendly team is here to help.",
            reach: "@mail address"
        }
    ]

  return (
    <div className='flex flex-col gap-10 w-11/12 text-white'>
        {/* section 1 */}
        <div className='flex flex-row'>
        {/* left div  */}
            <div>
                {
                    contactData.map((data, index) => {
                        <div className='flex' key={index}>
                            {data.icon}
                        </div>
                    })
                }
            </div>
        </div>
    </div>
  )
}
