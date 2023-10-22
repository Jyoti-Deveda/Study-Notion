import React, { useState } from 'react'
import {Chart, registerables} from 'chart.js'
import { Pie } from 'react-chartjs-2'

Chart.register(...registerables)
export const InstructorChart = ({courses}) => {
    // console.log("COURSES IN INSTRUCTOR CHART ", courses);

    const [currentChart, setCurrentChart] = useState("students");

    //function to generate random colours
    const getRandomColors = (numColors) => {
        const colors = [];
        for(let i=0; i<numColors; i++) {
            const color = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random()*256)},
            ${Math.floor(Math.random()*256)})`
            colors.push(color);
        }
        return colors;
    }

    // create data for chart displaying student info 
    const chartDataForStudents = {
        labels: courses.map((course) => course.courseName),
        datasets: [
            {
                data: courses.map((course) => course.totalStudentsEnrolled),
                backgroundColor: getRandomColors(courses.length),
            }
        ]
    }

    //create data for displaying income info
    const chartDataForIncome = {
        labels: courses.map((course) => course.courseName),
        datasets: [
            {
                data: courses.map((course) => course.totalAmountGenerated),
                backgroundColor: getRandomColors(courses.length),
            }
        ]
    }

    //create options
    const options = {
        maintainAspectRatio: false,
        layout: {
            gap: 20
        }
    }

  return (
    <div className="flex flex-1 flex-col gap-y-4 rounded-md bg-richblack-800 p-6">
        <p className="text-lg font-bold text-richblack-5">Visualise</p>
        <div  className="space-x-4 font-semibold">
            <button onClick={() => setCurrentChart('students')}
            className={`rounded-sm p-1 px-3 transition-all duration-200 ${
                currentChart === "students"
              ? "bg-richblack-700 text-yellow-50"
              : "text-yellow-400"
          }`}
            >
                Student 
            </button>

            <button onClick={() => setCurrentChart('income')}
            className={`rounded-sm p-1 px-3 transition-all duration-200 ${
                currentChart === "income"
              ? "bg-richblack-700 text-yellow-50"
              : "text-yellow-400"
          }`}
            >
                Income 
            </button>

        </div>

        <div  className="relative mx-auto aspect-square h-full w-full space-4">
            <Pie
                data={currentChart === "students" ? chartDataForStudents: chartDataForIncome}
                // width={''}
                options={options}
            />
        </div>
    </div>
  )
}
