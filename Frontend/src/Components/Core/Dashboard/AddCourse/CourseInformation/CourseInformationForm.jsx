import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { addCourseDetails, editCourseDetails, fetchCourseCategories } from '../../../../../Services/operations/courseDetailsAPI';
import { HiOutlineCurrencyRupee } from "react-icons/hi"
import { BiLabel } from 'react-icons/bi';
import { setStep, setCourse } from '../../../../../Slices/courseSlice';
import { RequirementField } from './RequirementField';
import {IconButton} from "../../../../Common/IconButton"
import { toast } from 'react-hot-toast';
import { COURSE_STATUS } from '../../../../../utils/constants';
import { ChipInput } from './ChipInput';
import { Upload } from '../../Upload';

export const CourseInformationForm = () => {

    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState:{errors},
    } = useForm();

    
    const dispatch = useDispatch();
    const {token} = useSelector((state) => state.auth);
    const {course, editCourse} = useSelector((state) => state.course);
    const [loading, setLoading] = useState(false);
    const [courseCategories, setCourseCategories] = useState([]);

    const COURSE = (useSelector((state) => state.course))
    const AUTH = (useSelector((state) => state.auth))

    useEffect(() => {
        console.log( "cOURSE ", COURSE);
        console.log( "AUTH ", AUTH);
        const getCategories = async() => {
            try{
                setLoading(true);
                const categories= await fetchCourseCategories();
                console.log("Categories ", categories);
                if(categories.length > 0){
                    setCourseCategories(categories);
                }
                console.log("Categories set ", courseCategories);
            }catch(err){
                console.log(err)
            }
            setLoading(false);
        }

        if(editCourse){
            setValue("courseTitle", course.courseName)
            setValue("courseShortDesc", course.courseDescription)
            setValue("coursePrice", course.price)
            setValue("courseTags", course.tag)
            setValue("courseBenefits", course.whatYouWillLearn)
            setValue("courseCategory", course.category)
            setValue("courseRequirements", course.instructions)
            setValue("courseImage", course.thumbnail)
        }
        getCategories();
    }, []);

    const isFormUpdated = () => {
        const currentValues = getValues();
        if(currentValues.courseTitle !== course.courseName ||
            currentValues.courseShortDesc !== course.courseShortDesc ||
            currentValues.coursePrice !== course.price ||
            currentValues.courseTags.toString() !== course.courseTags.toString() ||
            currentValues.courseBenefits !== course.whatYouWillLearn ||
            currentValues.courseCategory._id !== course.category._id ||
            currentValues.courseImage !== course.thumbnail ||
            currentValues.courseRequirements.toString() !== course.instructions.toString()){
            return true;
        }else{
            return false;
        }
    }

    //handles next button click
    const onSubmit = async(data) => {
        
        if(editCourse){
            if(isFormUpdated()){
                const currentValues = getValues();
                const formData = new FormData();

                formData.append("courseId", course._id);
                if(currentValues.courseTitle !== course.courseName){
                    formData.append("courseName", data.courseTitle);
                }

                if(currentValues.courseShortDesc !== course.courseDescription){
                    formData.append("courseDescription", data.courseShortDesc);
                }
                if(currentValues.coursePrice !== course.price){
                    formData.append("price", data.coursePrice);
                }
                if (currentValues.courseTags.toString() !== course.tag.toString()) {
                    formData.append("tag", JSON.stringify(data.courseTags))
                  }
                if(currentValues.courseBenefits !== course.whatYouWillLearn){
                    formData.append("whatYouWillLearn", data.courseBenefits);
                }
                if(currentValues.courseCategory._id !== course.category._id){
                    formData.append("category", data.courseCategory);
                }
                if(currentValues.courseRequirements.toString() !== course.instructions.toString()){
                    formData.append("instructions", JSON.stringify(data.courseRequirements));
                }
                if (currentValues.courseImage !== course.thumbnail) {
                    formData.append("thumbnailImage", data.courseImage)
                }

                setLoading(true);
                // console.log("BEFORE UPDATING COURSE")
                // console.log("TOKEN IN EDITCOURSE ", token);
                const result = await editCourseDetails(formData, token);
                console.log("AFTER UPDATING COURSE")
                console.log("result ", result);
                setLoading(false);
                if(result){
                    dispatch(setStep(2));
                    console.log("FormData ",formData);
                    dispatch(setCourse(result));
                }
            }else{
                toast.error("No changes made so far")
            }
            console.log("COURSE DATA AFTER COURSE UPDATION ", course);
            return;
        }

        //create  a new course
        const formData = new FormData();
        formData.append("courseName", data.courseTitle);
        formData.append("courseDescription", data.courseShortDesc);
        formData.append("price", data.coursePrice);
        formData.append("tag", JSON.stringify(data.courseTags));
        formData.append("whatYouWillLearn", data.courseBenefits);
        formData.append("category", data.courseCategory);
        formData.append("status", COURSE_STATUS.DRAFT) 
        formData.append("instructions", JSON.stringify(data.courseRequirements));
        formData.append("thumbnailImage", data.courseImage);

        setLoading(true);
        console.log("BEFORE ADDING COURSE")
        console.log("PRINTING FORM DATA ", formData);
        const result = await addCourseDetails(formData, token);
        console.log("AFTER ADDING COURSE")
        console.log("Result ", result);

        if(result){
            dispatch(setStep(2));
            dispatch(setCourse(result));
        }
        setLoading(false);
        console.log("COURSE DATA AFTER COURSE CREATION ", course);
    }

  return (
    <form
    onSubmit={handleSubmit(onSubmit)}
    className='rounded-md border-richblack-700 bg-richblack-800 p-6 space-y-8'>
        <div>
            <label htmlFor='courseTitle'
            className='lable-style'>Course Title<sup className="text-pink-200">*</sup></label> 
            <input
                id='courseTitle'
                placeholder='Enter Course Title'
                {...register("courseTitle", {required: true})}
                className='w-full form-style'
            />
            {
                errors.courseTitle && (
                    <span  className="ml-2 text-xs tracking-wide text-pink-200">Course Title is required</span>
                )
            }
        </div>

        <div>
            <label className='lable-style'
             htmlFor='courseShortDesc'>Course short Description<sup className="text-pink-200">*</sup></label>
            <textarea
                id='courseShortDesc'
                placeholder='Enter Description'
                {...register("courseShortDesc", {required: true})}
                className='min-h-[140px] w-full form-style'
            />
            {
                errors.courseShortDesc && (
                    <span className="ml-2 text-xs tracking-wide text-pink-200">Course Description is required</span>
                )
            }
        </div>

        <div className='relative'>
            <label htmlFor='coursePrice'
            className='lable-style'>Course Price<sup className="text-pink-200">*</sup></label>
            <input
                id='coursePrice'
                placeholder='Enter Course Price'
                {...register("coursePrice", {
                    required: true,
                    valueAsNumber: true,
                })}
                className='w-full form-style pl-5'
            />
            <HiOutlineCurrencyRupee className='absolute top-8 text-richblack-400'/>
            {
                errors.coursePrice && (
                    <span className="ml-2 text-xs tracking-wide text-pink-200">Course Price is required</span>
                )
            }
        </div>

        <div>
            <label htmlFor='courseCategory'
                className='lable-style'>
                Course Category<sup className="text-pink-200">*</sup></label>
            <select
                id='courseCategory'
                defaultValue=""
                {...register("courseCategory", {required: true})}
                className='w-full form-style'
            >
                <option value="" disabled>Choose a category</option>
                {
                    !loading && courseCategories.map((category, index) => (
                        <option key={index} value={category?._id}>
                            {category?.name}
                        </option>
                    ))
                }
            </select>
            {
                errors.courseCategory && (
                    <span className="ml-2 text-xs tracking-wide text-pink-200">Course category is required</span>
                )
            }
        </div>
        
        {/* creating a component to handle tags input  */}
            <ChipInput
                label="Tags"
                name="courseTags"
                placeholder="Enter tags and press enter"
                register={register}
                errors={errors}
                setValue={setValue}
                getValues={getValues}
            />

            {/* create a component for uploading and showing thumnail preview  */}
            <Upload
                name="courseImage"
                label="Course Thumbnail"
                register={register}
                errors={errors}
                setValue={setValue}
                editData={editCourse ? course?.thumbnail : null}
            />

            {/* benefits of the course  */}
            <div>
                <label htmlFor='courseBenefits'
                className='lable-style'>Benefits of the course</label>
                <textarea
                    id='courseBenefits'
                    placeholder='EnterBenefits of the course'
                    {...register("courseBenefits", {required:true})}
                    className='min-h-[140px] w-full form-style'
                />
                {
                    errors.courseBenefits && (
                        <span>Course Benefits are required</span>
                    )
                }
            </div>

            <RequirementField
                    name="courseRequirements"
                    label="Requirements/Instructions"
                    register={register}
                    errors={errors}
                    setValue={setValue}
                    getValues={getValues}
            />

            <div>
                {
                    editCourse && (
                        <button onClick={() => dispatch(setStep(2))}
                        className='flex items-center gap-x-2  bg-richblack-200'>
                            Continue without saving
                        </button>
                    )
                }

                <IconButton
                    type="submit"
                    text={!editCourse ? "Next" : "Save Changes"}
                />
            </div>

    </form>
  )
}
