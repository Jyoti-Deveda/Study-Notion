const SubSection = require('../Models/SubSection');
const Section = require('../Models/Section');
const cloudinary = require('cloudinary');
const { uploadImageToCloudinary } = require('../Utils/ImageUploader');

exports.createSubsection = async (req, res) => {
    try{
        //fetch data
        const {title, description, sectionId} = req.body;

        //extract video file
        const video = req.files.video;
        
        //validation
        if(!title || !description || !video || !sectionId){
            return res.status(404).json({
                success: false,
                message: "All the fields are required",
            })
        }
        console.log(video);

        //upload to cloudinary
        const uploadDetails = await uploadImageToCloudinary(video, process.env.FOLDER_NAME);
        console.log(uploadDetails);

        //create subsection
        const subsection = await SubSection.create({
            title: title, 
            timeDuration: `${uploadDetails.duration}`, 
            description: description,
            videoUrl:uploadDetails.secure_url,
        })

        //add subsection to section
        const updatedSection = await Section.findByIdAndUpdate(
            {_id:sectionId}, 
            {$push: {subSection: subsection._id}},
            {new: true})
            .populate('subSection');

        console.log(updatedSection);

        //return response
        return res.status(200).json({
            success: true,
            message: "Subsection created successfully",
            updatedSection,
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Failed to create a subsection.. please try again later",
            error: err.message,
        })
    }
}

//hw: update and delete subsection

exports.updateSubsection = async (req, res) => {
    try {
      const {sectionId, subSectionId, title, description } = req.body;
      const subSection = await SubSection.findById(subSectionId);
  
      if (!subSection) {
        return res.status(404).json({
          success: false,
          message: "SubSection not found",
        })
      }
  
      if (title !== undefined) {
        subSection.title = title
      }
  
      if (description !== undefined) {
        subSection.description = description
      }

      if (req.files && req.files.video !== undefined) {
        const video = req.files.video
        const uploadDetails = await uploadImageToCloudinary(
          video,
          process.env.FOLDER_NAME
        )

        subSection.videoUrl = uploadDetails.secure_url
        subSection.timeDuration = `${uploadDetails.duration}`
      }
  
      await subSection.save()

      const updatedSection = await Section.findById(sectionId).populate('subSection');
  
      return res.json({
        success: true,
        message: "Section updated successfully",
        data: updatedSection,
      })

    } catch (error) {
      console.error(error)
      return res.status(500).json({
        success: false,
        message: "An error occurred while updating the Subsection",
        error: error.message,
      })
    }
  }

// exports.deleteSubsection = async (req, res) => {
//     try{
//         //fetch data - assuming to fetch it from the params obj
//         const {subsectionId} = req.params;

//         //validation
//         if(!subsectionId){
//             return res.status(400).json({
//                 success: false,
//                 message: "Could not get subsection id",
//             })
//         }

//         //delete name
//         const subsection = await SubSectionSection.findByIdAndDelete({subsectionId});

//         //todo: do we need to delete the entry from course schema
        
//         //return response
//         return res.status(200).json({
//             success: true,
//             message: "Subsection deleted successfully",
//             subsection,
//         })     
//     }catch(err){
//         return res.status(500).json({
//             success: false,
//             message: "Failed to delete the subsection.. please try again later",
//             error: err.message,
//         })
//     }
// }


// exports.updateSubSection = async (req, res) => {
//     try {
//       const { sectionId, title, description } = req.body
//       const subSection = await SubSection.findById(sectionId)
  
//       if (!subSection) {
//         return res.status(404).json({
//           success: false,
//           message: "SubSection not found",
//         })
//       }
  
//       if (title !== undefined) {
//         subSection.title = title
//       }
  
//       if (description !== undefined) {
//         subSection.description = description
//       }
//       if (req.files && req.files.video !== undefined) {
//         const video = req.files.video
//         const uploadDetails = await uploadImageToCloudinary(
//           video,
//           process.env.FOLDER_NAME
//         )
//         subSection.videoUrl = uploadDetails.secure_url
//         subSection.timeDuration = `${uploadDetails.duration}`
//       }
  
//       await subSection.save()
  
//       return res.json({
//         success: true,
//         message: "Section updated successfully",
//       })
//     } catch (error) {
//       console.error(error)
//       return res.status(500).json({
//         success: false,
//         message: "An error occurred while updating the section",
//       })
//     }
//   }
  
  exports.deleteSubSection = async (req, res) => {
    try {
      const { subSectionId, sectionId } = req.body
      await Section.findByIdAndUpdate(
        { _id: sectionId },
        {
          $pull: {
            subSection: subSectionId,
          },
        }
      );

      const subSection = await SubSection.findByIdAndDelete({ _id: subSectionId })
  
      if (!subSection) {
        return res
          .status(404)
          .json({ success: false, message: "SubSection not found" })
      }

      const updatedSection = await Section.findById(sectionId).populate('subSection');
      
      console.log("Updated Section when deleting subsection ", updatedSection)
      // const updatedSection = await findById(sectionId).populate('subSection');
  
      return res.json({
        success: true,
        message: "SubSection deleted successfully",
        data: updatedSection,
      })
    } catch (error) {
      console.error(error)
      return res.status(500).json({
        error: error.message,
        success: false,
        message: "An error occurred while deleting the SubSection",
      })
    }
  }