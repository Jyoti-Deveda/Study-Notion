import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { IconButton } from '../../Common/IconButton'
import { VideoDetails } from './VideoDetails';
import { CourseReviewModal } from './CourseReviewModal';

export const VideoDetailsSidebar = ({setReviewModal}) => {

    const [activeStatus, setActiveStatus] = useState("");
    const [videobarActive, setVideoBarActive] = useState("");
    const {sectionId, subSectionId} = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    const {
        courseSectionData,
        courseEntireData,
        totalNoOfLectures,
        completedLectures
    } = useSelector((state) => state.viewCourse)

    useEffect(() => {
      const setActiveFlags = () => {
          if(!courseSectionData.length)
            return;

            const currentSectionIndex = courseSectionData.findIndex(
              (data) => data._id === sectionId
            )

            const currentSubSectionIndex = courseSectionData?.[currentSectionIndex]?.subSection.findIndex(
              (data) => data._id === subSectionId
            )

            const activeSubSectionId = courseSectionData?.[currentSectionIndex]?.subSection?.[currentSubSectionIndex]?._id;
            //set current section
            setActiveStatus(courseSectionData?.[currentSectionIndex]?._id);

            //set current subsection
            setVideoBarActive(activeSubSectionId)
      }
      setActiveFlags();
  }, [courseSectionData, courseEntireData, location.pathname])

  useEffect(() => {
    console.log("Course section data ", courseSectionData)
  }, [courseSectionData])

  return (
    <>
      <div className='text-white'>
      {/* for buttons and headings  */}
        <div>

          {/* for buttons  */}
          <div>
            <div onClick={() => navigate('/dashboard/enrolled-courses')}>
              Back
            </div>

            <div className=''>
              <IconButton
                text={"Add Review"}
                onclick={() => setReviewModal(true)}
              />
            </div>
          </div>

          {/* for heading  */}
          <div>
              <p>
                {courseEntireData?.courseName}
              </p>
              <p>
                {completedLectures.length} / {totalNoOfLectures}
              </p>
          </div>

          {/* for sections and subsections  */}
          <div>
            {
              courseSectionData.map((section, index) => (
                <div
                  onClick={() => setActiveStatus(section?._id)}
                  key={index}
                >

                  {/* section  */}
                  <div>
                    <div>
                      {section?.sectionName}
                    </div>
                    {/* hw- arrow icon and rotate logic  */}

                  </div>

                  {/* subSections  */}
                  <div>
                    {
                      activeStatus === section?._id && (
                        <div>
                          {
                            section?.subSection.map((topic, index) => (
                              <div
                              key={index}
                                className={`flex gap-4 p-4 ${videobarActive === topic?._id 
                                ? "bg-yellow-200 text-richblack-900"
                                : "bg-richblack-900 text-richblack-5" }`}
                                onClick={() => {
                                  navigate(`/view-course/${courseEntireData?._id}/section/${section?._id}/sub-section/${topic?._id}`);
                                  setVideoBarActive(topic?._id);
                                }}
                              >
                                <input
                                  type='checkbox'
                                  checked={completedLectures.includes(topic?._id)}
                                />
                                <span>
                                  {topic.title}
                                </span>
                              </div>
                            ))
                          }
                        </div>
                      )
                    }
                  </div>

                </div>
              ))
            }
          </div>
        </div>
      </div>
    </>
  )
}
