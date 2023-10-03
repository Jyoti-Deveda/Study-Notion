import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { markLectureAsComplete } from '../../../Services/operations/courseDetailsAPI';
import { updateCompletedLectures } from '../../../Slices/viewCourseSlice';
import { Player } from 'video-react';
// import '~video-react/dist/video-react.css'; // import css
import { FaGooglePlay } from "react-icons/fa"
import { IconButton } from '../../Common/IconButton';

export const VideoDetails = () => {

    const {courseId, sectionId, subSectionId} = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const playerRef = useRef();
    const {token} = useSelector((state) => state.auth);
    const {courseSectionData, courseEntireData, completedLectures} = useSelector((state) => state.viewCourse);

    const [videoData, setVideoData]= useState([]);
    const [videoEnded, setVideoEnded]= useState(false);
    const [loading, setLoading]= useState(false);


    useEffect(() => {
        const setVideoSpecificDetails = async() => {
            if(!courseSectionData.length){
                return;
            }
            if(!courseId || !sectionId || !subSectionId){
                navigate("/dashboard/enrolled-courses")
            }
            else{

                //fetching the section
                const filteredData = courseSectionData.filter(
                    (section) => section._id === sectionId
                )

                const filteredVideoData = filteredData?.[0]?.subSection.filter(
                    (subSection) => subSection._id === subSectionId
                )
                
                console.log("FILTERED VIDEO DATA ", filteredVideoData);
                setVideoData(filteredVideoData[0]);
                console.log('VIDEO DATA ', videoData);
                setVideoEnded(false);
            }
        }
        setVideoSpecificDetails();
    }, [courseSectionData, courseEntireData, location.pathname])

    const isFirstVideo = () => {
        // a video is the first video if index of both section and subSection is 0
        const currentSectionIndex = courseSectionData.findIndex(
            (data) => data._id ===sectionId
        )

        const currentSubSectionIndex = courseSectionData?.[currentSectionIndex].subSection.findIndex(
            (data) => data._id === subSectionId
        )

        if(currentSectionIndex === 0 && currentSubSectionIndex === 0){
            return true;
        }
        return false;
    }

    const isLastVideo = () => {
        //a video is last video if it is the last video in the subsection of the last section
        const currentSectionIndex = courseSectionData.findIndex(
            (data) => data._id ===sectionId
        )

        const noOfSubSections = courseSectionData[currentSectionIndex].subSection.length;

        const currentSubSectionIndex = courseSectionData?.[currentSectionIndex].subSection.findIndex(
            (data) => data._id === subSectionId
        )

        if(currentSectionIndex === courseSectionData.length -1 &&
            currentSubSectionIndex === noOfSubSections-1){
                return true;
            }
            return false;
    }

    const goToNextVideo = () => {
        const currentSectionIndex = courseSectionData.findIndex(
            (data) => data._id ===sectionId
        )

        const noOfSubSections = courseSectionData[currentSectionIndex].subSection.length;

        const currentSubSectionIndex = courseSectionData?.[currentSectionIndex].subSection.findIndex(
            (data) => data._id === subSectionId
        )

        if(currentSubSectionIndex !== noOfSubSections-1){
            //same section ki next video
            const nextSubSectionId = courseSectionData[currentSectionIndex].subSection[currentSubSectionIndex + 1]._id;
            //navigate to this video
            navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`) 
        }else{
            //first video of next section
            const nextSectionId = courseSectionData[currentSectionIndex+1];
            const nextSubSectionId = courseSectionData[nextSectionId].subSection[0]._id;
            navigate(`/view-course/${courseId}/section/${nextSectionId}/subSection/${nextSubSectionId}`)
        }
    }

    const goToPrevVideo = () => {
        const currentSectionIndex = courseSectionData.findIndex(
            (data) => data._id ===sectionId
        )

        const noOfSubSections = courseSectionData[currentSectionIndex].subSection.length;

        const currentSubSectionIndex = courseSectionData?.[currentSectionIndex].subSection.findIndex(
            (data) => data._id === subSectionId
        )

        if(currentSubSectionIndex !== 0){
            //same section previous video
            const prevSubSectionId = courseSectionData[currentSectionIndex].subSection[currentSubSectionIndex-1]._id;
            navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubSectionId}`) 
        }
        else{
            //last video of prev section
            const prevSectionId = courseSectionData[currentSectionIndex -1]._id;
            const prevSubSectionLength = courseSectionData[currentSectionIndex].subSection.length;
            const prevSubSectionId = courseSectionData[prevSectionId].subSection[prevSubSectionLength-1]._id;
            navigate(`/view-course/${courseId}/section/${prevSectionId}/subSection/${prevSubSectionId}`)

        }
    }

    const handleLectureCompletition = async () => {

        //dummycode to be replaced with actual code
        setLoading(true);

        const result = await markLectureAsComplete({courseId: courseId, subSectionId: subSectionId}, token);
        //state update
        if(result){
            dispatch(updateCompletedLectures(subSectionId));
        }
        setLoading(false);

    }

  return (
    <div>
        {
            !videoData ? (
                <div>
                    No Data Found
                </div>
            ) : (
                <Player
                ref={playerRef}
                aspectRatio='16:9'
                playsInline
                onEnded={() => {setVideoEnded(true)}}
                src={videoData?.videoUrl}
                >
                    <FaGooglePlay/>

                    {/* buttons to be displayed when video ends  */}
                    {
                        videoEnded && (
                            <div>
                                {
                                    !completedLectures.includes(subSectionId) && 
                                    <IconButton
                                        disabled={loading}
                                        onclick={() => handleLectureCompletition()}
                                        text={!loading ? "Mark as Completed" : "Loading..."}
                                    />
                                    
                                }

                                <IconButton
                                    disabled={loading}
                                    onclick={() => {
                                        if(playerRef?.current) {
                                            playerRef.current?.seek(0);
                                            playerRef.current.play()
                                            setVideoEnded(false);
                                        }
                                    }}
                                    text={"Rewatch"}
                                    customClasses="text-xl "

                                />

                                <div>
                                    {
                                        !isFirstVideo() && (
                                            <button
                                            disabled={loading}
                                            onClick={goToPrevVideo}
                                            className='blackButton'
                                            >
                                            Prev
                                            </button>
                                        )
                                    }
                                    {
                                        !isLastVideo() && (
                                            <button
                                            disabled={loading}
                                            onClick={goToNextVideo}
                                            className='blackButton'
                                            >
                                            Next
                                            </button>
                                        )
                                    }
                                </div>
                            </div>
                        )
                    }

                </Player>
            )
        }

        <div>
            <h1>
                {videoData?.title}
            </h1>
            <p>
                {videoData?.description}
            </p>
        </div>
    </div>
  )
}
