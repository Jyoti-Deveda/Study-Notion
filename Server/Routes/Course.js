const express = require('express');
const Router = express.Router();

const { createCourse, 
        getAllCourses, 
        getCourseDetails,
        getFullCourseDetails,
        editCourse,
        getInstructorCourses,
        deleteCourse,
    } = require('../Controllers/Course');

const { 
    createSection, 
    updateSection,
    deleteSection
 } = require('../Controllers/Section');

const { 
    createSubsection,
    updateSubsection,
    deleteSubSection,
 } = require('../Controllers/SubSection');

const { 
    createCategory, 
    categoryPageDetails,
    showAllCategories,

 } = require('../Controllers/Category');

 const { 
    createRatingAndReview, 
    getAverageRating, 
    getAllRating 
 } = require('../Controllers/RatingAndReview');

//middlewares
const { 
    auth,
    isStudent,
    isAdmin,
    isInstructor,
 } = require('../Middlewares/auth');

 //course progress
 const {
    updateCourseProgress
 } = require('../Controllers/CourseProgress')
 
Router.post('/createCourse', auth, isInstructor, createCourse);
Router.put("/editCourse", auth, isInstructor, editCourse)
Router.get('/getAllCourses', getAllCourses);
Router.post('/getCourseDetails', getCourseDetails);
Router.post("/getFullCourseDetails", auth, getFullCourseDetails)
Router.get("/getInstructorCourses", auth, isInstructor, getInstructorCourses)
Router.delete("/deleteCourse", deleteCourse)

Router.post('/addSection', auth, isInstructor,  createSection);
Router.put('/updateSection', auth, isInstructor,  updateSection);
Router.delete('/deleteSection', auth, isInstructor,  deleteSection);


Router.post('/addSubsection', auth, isInstructor,  createSubsection);
Router.put('/updateSubsection', auth, isInstructor,  updateSubsection);
Router.delete('/deleteSubsection', auth, isInstructor,  deleteSubSection);

Router.post('/createCategory', auth, isAdmin, createCategory);
Router.get('/showAllCategories', showAllCategories);
Router.post('/getCategoryPageDetails', categoryPageDetails);

Router.post('/createRating', auth, isStudent, createRatingAndReview);
Router.get('/getAverageRating', getAverageRating);
Router.get('/getReviews', getAllRating);

Router.post("/updateCourseProgress", auth, isStudent, updateCourseProgress);

module.exports = Router;


