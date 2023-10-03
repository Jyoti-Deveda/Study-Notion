const CourseProgress = require("../Models/CourseProgress");
const SubSection = require("../Models/SubSection");

exports.updateCourseProgress = async(req, res) => {
  const {courseId, subSectionId} = req.body;
  const userId = req.user.id;

  try{
    //checking the validity of subSection
    const subSection = await SubSection.findById(subSectionId);
    
    if(!subSection){
      return res.status(404).json({
        success: false,
        error: "Invalid subSection",
      })
    }
    
    console.log("Found subsection")
    //the instance of CourseProgress with given courseId and subSectionId should already exist
    let courseProgress = await CourseProgress.findOne({
      courseId: courseId,
      userId: userId,
    })


    if(!courseProgress) {
      return res.status(404).json({
        success: false,
        message: "Course progress does not exist"
      })

    }
    else{
      console.log("Found course progress")
      //check if the video is being marked completed again
      if(courseProgress.completedVideos.includes(subSection)) {
        return res.status(400).json({
          error: "Subsection already completed",
        })
      }

      //push into completed video
      courseProgress.completedVideos.push(subSectionId);
      console.log("added subsection to completed lectures")
    }

    await courseProgress.save();
    console.log("Saved courseProgress")
    return res.status(200).json({
      success: true,
      message: "Course Progress updated successfully"
    })
  }
  catch(err){
    return res.status(500).json({
      error: err.message,
      message: "Internal server error",
    })
  }
}