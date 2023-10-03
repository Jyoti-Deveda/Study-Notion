import React from 'react'

export const StatsComponent = () => {
    const Stats = [
        {count: "5K", label: "Active Students"},
        {count: "10+", label: "Mentors"},
        {count: "200+", label: "Courses"},
        {count: "50+", label: "Awards"}
    ]

  return (
    <section className='w-[70%] mx-auto m-5'>
        <div>
            <div className='flex flex-row justify-around gap-8'>
                {
                    Stats.map((data, index) => {
                        return (
                            <div key={index} className='flex items-center flex-col'>
                                <h1 className='text-2xl custom-sm:text-lg text-richblack-5 font-bold'>
                                    {data.count}
                                </h1>
                                <p className='text-sm custom-sm:text-xs text-richblack-300'>
                                    {data.label}
                                </p>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    </section>
  )
}
