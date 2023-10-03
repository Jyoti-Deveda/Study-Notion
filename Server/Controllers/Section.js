const Section = require('../Models/Section');
const Course = require('../Models/Course')
const SubSection = require('../Models/SubSection');

exports.createSection = async (req, res) => {
    try{
        //fetch data
        const {sectionName, courseId} = req.body;

        //data validation
        if(!sectionName  || !courseId){
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            })
        }

        //create section
        const section = await Section.create({sectionName});
        
        //update course with section object id
        const updatedCourse = await Course.findByIdAndUpdate(courseId, 
            {$push: {courseContent: section._id}},
            {new: true})
            .populate({
                path: 'courseContent',
                populate: {
                    path: 'subSection'
                }
            })
            .exec()

        console.log(updatedCourse)

        //return successfull response
        return res.status(200).json({
            success: true,
            message: "Section created successfully",
            data: updatedCourse,
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Section could not be created ",
            error: err.message,
        })
    }
}

exports.updateSection = async (req, res) => {
    try{
        //fetch data
        const {sectionName, sectionId, courseId} = req.body;

        // console.log("IN UPDATESECTION AT BACKEND");
        // console.log("SECTIONNAME ", sectionName);
        // console.log("SECTIONID ", sectionId);
        // console.log("COURSEID ", courseId);

        //validation
        if(!sectionName || !sectionId || !courseId){
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            })
        }

        
        //update name
        console.log("BEFORE UPDATING SECTION")
        const section = await Section.findByIdAndUpdate(sectionId, 
            {sectionName: sectionName},
            {new: true});
            
        console.log("AFTER UPDATING SECTION")

        //fetch the course
        const course = await Course.findById(courseId)
        .populate({
            path: "courseContent",
            populate: {
                path: "subSection",
            },
        })
        .exec();

        console.log("Course in update section ", course);
        //return response
        return res.status(200).json({
            success: true,
            section,
            message: "Section updated successfully",
            data: course,
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Unable to update the section...please try again",
            error: err.message,
        })
    }
}


exports.deleteSection = async (req, res) => {
    try{
        //fetch data - assuming to fetch it from the params obj
        const {sectionId, courseId} = req.body;

        //validation
        if(!sectionId || !courseId){
            return res.status(400).json({
                success: false,
                message: "Could not get section id",
            })
        }

        console.log("Fetched ids");
        //delete name
        await Course.findByIdAndUpdate(courseId, 
                                    {
                                        $pull: {courseContent: sectionId}
                                    }, 
                                    {new: true});

        console.log("Updated course");

		const section = await Section.findById(sectionId);
		console.log(sectionId, courseId);
		if(!section) {
			return res.status(404).json({
				success:false,
				message:"Section not Found",
			})
		}

		//delete sub section
		await SubSection.deleteMany({_id: {$in: section.subSection}});

		await Section.findByIdAndDelete(sectionId);

		//find the updated course and return 
		const course = await Course.findById(courseId).populate({
			path:"courseContent",
			populate: {
				path: "subSection"
			}
		})
		.exec();

		res.status(200).json({
			success:true,
			message:"Section deleted",
			data:course
		});

    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Unable to delete the section...please try again",
            error: err.message,
        })
    }
}