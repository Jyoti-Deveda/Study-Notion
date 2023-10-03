import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table"
import { COURSE_STATUS } from '../../../../utils/constants';
import { ConfirmationModal } from '../../../Common/ConfirmationModal';
import { deleteCourse, fetchInstructorCourses } from '../../../../Services/operations/courseDetailsAPI';
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css"
import { useNavigate } from 'react-router-dom';
import { FiEdit } from "react-icons/fi";
import { AiTwotoneDelete } from "react-icons/ai";


export const CoursesTable = ({courses, setCourses}) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {token} = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState(null);

  const handleCourseDelete = async (courseId) => {
    setLoading(true);

    await deleteCourse({courseId:courseId}, token);
    console.log("COURSE ID IN DELETECOURSE COURSETABLE ", courseId);
    const result = await fetchInstructorCourses(token);
    if(result){
      setCourses(result);
    }
    setConfirmationModal(null);
    setLoading(false);
  }

  return (
    <div className='text-white'>
      <Table>
        <Thead>
          <Tr className="flex flex-row gap-x-10 border-richblack-800 p-8">
            <Th>
              Courses
            </Th>
            <Th>
              Duration
            </Th>
            <Th>
              Price
            </Th>
            <Th>
              Actions
            </Th>
          </Tr>
        </Thead>

        <Tbody className="text-white">
          {
            courses.length === 0 ? (
              <Tr>
                <Td>
                  No data Found
                </Td>
              </Tr>
            )
            : (
              courses?.map((course) => (
                <Tr key={course._id} className="flex flex-row gap-x-10 border-richblack-800 p-8">
                  <Td className="flex flex-row gap-x-4">
                    <img
                      src={course.thumbnail}
                      className='h-[150px] w-[220px] rounded-lg object-cover'
                    />
                    <div className='flex flex-col'>
                      <p>
                        {course.courseName}
                      </p>
                      <p>
                        {course.courseDescription}
                      </p>
                      <p>
                        Created: 
                      </p>
                      <p>
                        {
                          course.status === COURSE_STATUS.DRAFT ? (
                            <p className='text-pink-200'>
                              Drafted
                            </p>
                          ) 
                          :(
                            <p className='text-yellow-50'>
                              Published
                            </p>
                          )
                        }
                      </p>
                    </div>
                  </Td>

                  <Td>
                    2hr 30min
                  </Td>

                  <Td>
                    ${course.price}
                  </Td>

                  <Td className="flex gap-x-3 items-start">
                    <button
                    disabled={loading}
                    onClick={() => navigate(`/dashboard/edit-course/${course._id}`)}
                      className=''
                    >
                      <FiEdit/>
                    </button>

                    <button
                      disabled={loading}
                      onClick={()=>{
                        setConfirmationModal({
                          text1: "Do you want to delete this course?",
                          text2: "All the data related to this course will be deleted",
                          btn1Text: "Delete",
                          btn2Text: "Cancel",
                          btn1Handler: !loading ? (() => handleCourseDelete(course._id)) : () => {},
                          btn2Handler: !loading ? () => setConfirmationModal(null): () => {},
                        })
                      }}  
                    >
                      <AiTwotoneDelete/>
                    </button>

                  </Td>
                </Tr>
              ))
            )
          }
        </Tbody>
      </Table>

      {
        confirmationModal && <ConfirmationModal modalData={confirmationModal}/>
      }
    </div>
  )
}
