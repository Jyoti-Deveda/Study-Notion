const Category = require('../Models/Category')
function getRandomInt(max) {
    return Math.floor(Math.random() * max)
  }

exports.createCategory = async (req, res) => {
    try{
        //fetch data
        const {name, description} = req.body;

        //validation
        if(!name || !description){
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            })
        }

        //create category
        const CategoryDetails = await Category.create({name, description});
        console.log(CategoryDetails);

        //successful response
        return res.status(200).json({
            success: true,
            message: "Category created successfully",
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            message: err.message,
        })
    }
}

//get all tags
exports.showAllCategories = async (req, res) => {
    try{
      // console.log("Before fetching categories")
        const allCategories = await Category.find({});
        // console.log("Categories fetched ");

        return res.status(200).json({
            success: true,
            data: allCategories,
            message: "Categories fetched successfully",
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            message: err.message
        })
    }
}


exports.categoryPageDetails = async (req, res) => {
    try {
      const { categoryId } = req.body
      console.log("PRINTING CATEGORY ID: ", categoryId);
      // Get courses for the specified category
      const selectedCategory = await Category.findById(categoryId)
      .populate({
        path: 'courses',
        match: { status: "Published"},
        populate: "ratingAndReviews",
      })
      .exec();
      
      // console.log("SELECTED CATEGORY", selectedCategory)
      // Handle the case when the category is not found
      if (!selectedCategory) {
        console.log("Category not found.")
        return res
          .status(404)
          .json({ success: false, message: "Category not found" })
      }

      // Handle the case when there are no courses
      if (selectedCategory.courses.length === 0) {
        console.log("No courses found for the selected category.")
        return res.status(404).json({
          success: false,
          message: "No courses found for the selected category.",
        })
      }
  
      // Get courses for other categories
      const categoriesExceptSelected = await Category.find({
        _id: { $ne: categoryId },
      })
      let differentCategory = await Category.findOne(
        {_id: categoriesExceptSelected[getRandomInt(categoriesExceptSelected.length)]
          ._id}
      )
        .populate({
          path: "courses",
          match: { status: "Published" },
        })
        .exec()
        // console.log("Different COURSE", differentCategory)
      // Get top-selling courses across all categories
      const allCategories = await Category.find({})
        .populate({
          path: "courses",
        //   match: { status: "Published" },
          populate: {
            path: "instructor",
        },
        })
        .exec()
      const allCourses = allCategories.flatMap((category) => category.courses)
      const mostSellingCourses = allCourses
        .sort((a, b) => b.sold - a.sold)
        .slice(0, 10)
       // console.log("mostSellingCourses COURSE", mostSellingCourses)
      res.status(200).json({
        success: true,
        data: {
          // msg:"CALLED",
          selectedCategory,
          differentCategory,
          mostSellingCourses,
        },
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      })
    }
  }

// exports.categoryPageDetails = async (req, res) => {
// 	try{
// 		//category id
// 		const {categoryId} = req.body;

// 		//get courses for specified category id
// 		const selectedCategory = await Category.findById(categoryId)
// 										.populate('courses')
// 										.exec();

// 		//validation
// 		if(!selectedCategory){
// 			return res.status(400).json({
// 				success: false,
// 				message: "Data not found"
// 			});
// 		}

// 		//getcourses for different categories
// 		const differentCategories = await Category.find({
// 											_id: {$ne: categoryId},
// 										})
// 										.populate('courses')
// 										.exec();

// 		//get top selling courses

// 		//return response
// 		return res.status(200).json({
// 			success: true,
// 			data:{
// 				selectedCategory,
// 				differentCategories
// 			}
// 		})

// 	}catch(err){
// 		console.log(err);
// 		return res.status(500).json({
			
// 		})
// 	}
// }