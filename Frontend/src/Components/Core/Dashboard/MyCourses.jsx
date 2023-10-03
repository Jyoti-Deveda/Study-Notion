import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { IconButton } from '../../Common/IconButton';
import { fetchInstructorCourses } from '../../../Services/operations/courseDetailsAPI';
import { CoursesTable } from './InstructorCourses/CoursesTable';

export const MyCourses = () => {

    const {token} = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const fetchCourses = async() => {
            const result =  await fetchInstructorCourses(token);
            if(result){
                setCourses(result);
            }
        } 
        fetchCourses();
    }, []);
  return (
    <div className='text-white'>
        <div className='flex justify-between'>
            <h1>
                My Courses
            </h1>
            <IconButton
                text="Add Course"
                onclick={() => navigate("/dashboard/add-course")}

            >
                {/* add icon  */}

            </IconButton>

        </div>
        
        {courses && <CoursesTable courses={courses} setCourses={setCourses} />}
    </div>
  )
}
