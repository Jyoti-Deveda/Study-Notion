const Profile = require('../Models/Profile');
const User = require('../Models/User');
const Course = require('../Models/Course');
const CourseProgress = require('../Models/CourseProgress')
const { uploadImageToCloudinary } = require('../Utils/ImageUploader');
const { convertSecondsToDuration } = require('../Utils/secToDuration');
const { default: mongoose } = require('mongoose');

exports.updateProfileDetail = async (req, res) => {
    try{
        //fetch data and 
        const {dateOfBirth, about, contactNumber, gender} = req.body;

        //fetch userId
        const userId = req.user.id;
        console.log("UserId ", userId);
        console.log("fetched data");
        //validation on compulsory data i.e. which is not optional
        // if(!userId || !gender || !contactNumber){
        //     return res.status(400).json({
        //         success: false,
        //         message: "Required fields are not filled",
        //     })
        // }

        //find profile through user
        const userDetails = await User.findById(userId);

        console.log("userDetails ", userDetails);

        const profileId = userDetails.additionalDetails;
        console.log("Fetched profile id", profileId);

        //fetch profile and update profile
        const profileDetails = await Profile.findById(profileId);
        console.log("profiledetails ", profileDetails);

        profileDetails.dateOfBirth = dateOfBirth;
        profileDetails.about = about;
        profileDetails.gender = gender;
        profileDetails.contactNumber = contactNumber;
        
        await profileDetails.save();
        console.log("Updated profile details")
        //return response
        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            profileDetails,
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Unable to create the proile..Please try again later",
            error: err.message
        })
    }
}

//delete account
exports.deleteAccount = async (req, res) => {
    try{
        // TODO: Find More on Job Schedule
		// const job = schedule.scheduleJob("10 * * * * *", function () {
		// 	console.log("The answer to life, the universe, and everything!");
		// });
        //get id
        const userId = req.user.id;
        console.log("userId ", userId);
        //validation
        const userDetails = await  User.findById(userId);
        console.log("fetched userDetails", userDetails)
        if(!userDetails){
            return res.status(400).json({
                success: false,
                message: "User not found"
            })
        }

        //delete profile
        const profileId = userDetails.additionalDetails;
        await Profile.findByIdAndDelete(profileId);
        console.log("Deleted profile")
        //todo:unenroll student from all enrolled courses
        // userDetails.courses.forEach(async (courseId) => {
        //     const courseDetails = await Course.findByIdAndUpdate({courseId});

        //     //checking if the user to be deleted is astudent
        //     const index1 = courseDetails.studentsEnrolled.indexOf(userId);
        //     //if the user is student
        //     if(index1 > -1){
        //         //deleted that user and saved the updated course obj to db
        //         courseDetails.studentsEnrolled.splice(index1, 1);
        //         courseDetails.save();
        //     }

        //     // await Course.findByIdAndUpdate({courseId}, 
        //     //     {$pull: {studentsEnrolled: userId}},
        //     //     {new: true});

        //     //if the user is instructor
        //     if(courseDetails.instructor === userId){
        //         courseDetails.instructor = "";
        //     }

        //     // await Course.findByIdAndUpdate({courseId}, 
        //     //     {$pull: {instructor: userId}},
        //     //     {new: true});
        // })

        //delete user 
        await User.findByIdAndDelete(userId);
        console.log("Deleted user")
        return res.status(200).json({
            success: true,
            message: "Account deleted successfully"
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            error: err.message,
            message: "Could not delete the account"
        })
    }
}

exports.getAllUserDetails = async (req, res) => {
    try{
        const userId = req.user.id;

        if(!userId){
            return res.status(400).json({
                success: false,
                message: "User Id is not present",
            }) 
        }

        const allUserDetails = await User.findById(userId).populate('additionalDetails').exec();

        return res.status(200).json({
            success: true,
            message: "User details fetched successfully",
            allUserDetails,
        }) 

    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Could not fetch the data",
            error: err.message,
        })    
    }
}


exports.updateDisplayPicture = async (req, res) => {
    try {
      const displayPicture = req.files.displayPicture;
      const userId = req.user.id
      console.log("Fetched profile image")
      const image = await uploadImageToCloudinary(
        displayPicture,
        process.env.FOLDER_NAME,
        1000,
        1000
      )
      console.log("Uploaded Image")
      console.log(image)
      const updatedProfile = await User.findByIdAndUpdate(
        { _id: userId },
        { image: image.secure_url },
        { new: true }
      )
      console.log("Updated profile with picture")
      res.send({
        success: true,
        message: `Image Updated successfully`,
        data: updatedProfile,
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: error.message,
        message: "Profile picture could not be updated"
      })
    }
};
  
exports.getEnrolledCourses = async (req, res) => {
  try {
	  const userId = req.user.id
	  let userDetails = await User.findOne({
		_id: userId,
	  })
		.populate({
		  path: "courses",
		  populate: {
			path: "courseContent",
			populate: {
			  path: "subSection",
			},
		  },
		})
		.exec()

	  userDetails = userDetails.toObject()
    // console.log("USER DETAILS IN PROFILE CONTROLLER ", userDetails);

	  var SubsectionLength = 0
	  for (var i = 0; i < userDetails.courses.length; i++) {
		let totalDurationInSeconds = 0
		SubsectionLength = 0
    console.log("COURSE ", userDetails.courses[i]);
		for (var j = 0; j < userDetails.courses[i].courseContent.length; j++) {
		  totalDurationInSeconds += userDetails.courses[i].courseContent[j]
		  .subSection.reduce((acc, curr) => acc + parseInt(curr.timeDuration), 0)
      // console.log("SUBSECTION ",userDetails.courses[i].courseContent[j].subSection);
      // console.log("TOTAL DURATION IN SEC;l ONDS ", totalDurationInSeconds)

		  userDetails.courses[i].totalDuration = convertSecondsToDuration(
			totalDurationInSeconds
		  )
		  SubsectionLength +=
			userDetails.courses[i].courseContent[j].subSection.length
		}

    // const uid = new mongoose.Types.ObjectId(userId);
    // const courseId = userDetails.courses[i]._id;
    // console.log("TYPE OF USERID ", typeof(userId));
    // console.log("TYPE OF courseId ", typeof(courseId));
    let courseProgressCount = await CourseProgress.findOne({
      courseId:userDetails.courses[i]._id,
      userId: userId
    })

    // console.log("COURSEID ", userDetails.courses[i]._id)
    // console.log("userId ", uid);
		courseProgressCount = courseProgressCount?.completedVideos.length
    // console.log("COURSE PROGRESS COUNT ", courseProgressCount);
    // console.log("SUBSECTION LENGTH ", SubsectionLength);
		if (SubsectionLength === 0) {
		  userDetails.courses[i].progressPercentage = 100
		} else {
		  // To make it up to 2 decimal point
		  const multiplier = Math.pow(10, 2)
      // console.log("MULTIPLIER ", multiplier);
		  userDetails.courses[i].progressPercentage =
			Math.round(
			  (courseProgressCount / SubsectionLength) * 100 * multiplier
			) / multiplier
		}
	  }
  
	  if (!userDetails) {
		return res.status(400).json({
		  success: false,
		  message: `Could not find user with id: ${userDetails}`,
		})
	  }
	  return res.status(200).json({
		success: true,
		data: userDetails.courses,
	  })
	} catch (error) {
	  return res.status(500).json({
		success: false,
		message: error.message,
	  })
	}
};

exports.instructorDashboard = async(req, res) => {
  try{
    const courseDetails = await Course.find({instructor: req.user.id});

    // console.log("COURSE DETAILS ", courseDetails);
    const courseData = courseDetails.map((course) => {
      // console.log("COURSE ", course);
      // console.log("LENGTH ", course.studentsEnrolled.length);
      const totalStudentsEnrolled =  course.studentsEnrolled.length;
      const totalAmountGenerated = totalStudentsEnrolled * course.price;

      // console.log("calculated income and students enrolled")
      //creating an object with additional fields
      const courseDataWithStats = {
        _id: course._id,
        courseName: course.courseName,
        courseDescription: course.courseDescription,
        totalStudentsEnrolled,
        totalAmountGenerated,
      }

      // console.log("Returned resposne")
      return courseDataWithStats;
    })

    return res.status(200).json({
      courses: courseData,
    })

  }catch(err){
    console.log(err);
    return res.status(500).json({
      success: false,
      error: err.message,
    })
  }
}