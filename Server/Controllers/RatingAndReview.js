const RatingAndReview = require('../Models/RatingAndReview');
const Course = require('../Models/Course');
const { default: mongoose } = require('mongoose');

//create a RatingAndReview
exports.createRatingAndReview = async (req, res) => {
    try{
        //get user id
        const userId = req.user.id;

        //fetch data from req body
        const {rating, review, courseId} = req.body;

        //check if user is enrolled
        const courseDetails = await Course.findById(
                                                    courseId,
                                                    //check if this query works with either of one operators
                                                    {studentsEnrolled: {$elemMatch: {$eq: userId}}}
                                                );

        if(!courseDetails){
            return res.status(400).json({
                success: false,
                message: "User is not enrolled in this course",
            })
        }

        console.log("FETCHED DATA IN RATING AND REVIEWS")
        //check if user has already reviewed
        const alreadyReviewed = await RatingAndReview.findOne({
                                                    user: userId,
                                                    course: courseId,
                                                });

        if(alreadyReviewed){
            return res.status(400).json({
                success: false,
                message: "Student has already reviewed the course"
            })
        }

        //create rating and review
        const ratingReview = await RatingAndReview.create({
            rating, review, 
            course: courseId, 
            user: userId,
        })

        //add this add rating to the corresponding course
        const updatedCourseDetails = await Course.findByIdAndUpdate(courseId,
                                {$push: {ratingAndReviews: ratingReview._id}},
                                {new: true});

        console.log("Updated course details", updatedCourseDetails);
        //return response
        return res.status(200).json({
            success: true,
            message: "Rating and review created successfully",
            ratingReview,
        })
    }catch(err){
        return res.status(500).json({
            success: true,
            message: "Failed to rate the course",
            error: err.message,
        })
    }
}

//getAverageRating
exports.getAverageRating = async (req, res) => {
    try{
        //get courseId
        const courseId = req.body.courseId;
        
        //calculate average rating
        const result = await RatingAndReview.aggregate([
            {
                $match: {
                    //fetched all the ratings of a particular course
                    course: new mongoose.Types.ObjectId(courseId)
                },
            },
            {
                $group: {
                    _id: null,
                    averageRating: {$avg: "$rating"}
                }
            }
        ]);

        //return rating
        //when average rating exists
        if(result.length > 0){
            return res.status(200).json({
                success: true,
                //returning first rating whose rating is 
                //eqaul to average rating from the result 
                averageRating: result[0].averageRating,
            })
        }

        //if no rating review 
        return res.status(200).json({
            success: true,
            message: 'Average Rating is 0, No rating is given untill now',
            averageRating: 0,
        })
    }catch(err){

    }
}


//getAllRatingAndReviews
exports.getAllRating = async (req, res) => {
    try{
        const allReviews = await RatingAndReview.find({})
                                .sort({rating: "desc"})
                                .populate({
                                    path: 'user',
                                    select: "firstName lastName email image"
                                })
                                .populate({
                                    path: 'course',
                                    select: "courseName"
                                })
                                .exec();
        console.log("FETCHED RATINGS ");
        return res.status(200).json({
            success: true,
            message: "All reviews fetched successfully",
            data: allReviews,
        })
    }catch(err){
        console.log(err);
        return res.status(500).json({
            success: false,
            message: err.message,
        })
    }
}

//getAllRatingsAndReviews for a single course