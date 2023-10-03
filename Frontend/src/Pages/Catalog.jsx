import React, { useEffect, useState } from 'react'
import Footer from '../Components/Common/Footer'
import { useParams } from 'react-router-dom'
import { categories } from '../Services/apis';
import { getCatalogPageData } from '../Services/operations/pageAndComponentsData';
import { apiConnector } from '../Services/apiconnector';
import { CourseSlider } from '../Components/Core/Catalog/CourseSlider';
import { Course_Card } from '../Components/Core/Catalog/Course_Card';

export const Catalog = () => {

    const {catalogName} = useParams();
    const [catalogPageData, setCatalogPageData] = useState();
    const [categoryId, setCategoryId] = useState(null);
    const [active, setActive] = useState(1)

    //fetch all categories
    useEffect(() => {
        const getCategories = async() => {
            const res = await apiConnector("GET", categories.CATEGORIES_API);
            // console.log("res ", res);
            const category_id = res?.data?.data?.filter((ct) => ct.name.split(" ").join("-").toLowerCase() === catalogName)[0]._id;
            // console.log("category_id ", category_id);
            setCategoryId(category_id);
        }
        getCategories();
    }, [catalogName]);

    useEffect(() => {
        const getCategoryDetails = async () => {
            try{
                const res = await getCatalogPageData(categoryId);
                console.log("CATEGORIES IN CATALOGPAGEDATA ", res)
                setCatalogPageData(res);
            }catch(err){
                console.log(err);
            }
        }
        if(categoryId){
            getCategoryDetails();
        }
    }, [categoryId]);

  return (
    <div className='text-white'>
        
        <div className="box-content bg-richblack-800 px-4 ">
            <div className="w-[90%] mx-auto flex min-h-[260px] max-w-maxContentTab flex-col justify-center gap-4 custom-lg:max-w-maxContent " >
                <p className="text-sm text-richblack-300">
                    {`Home / Catalog / `} 
                    <span className="text-yellow-25">
                        { catalogPageData?.data?.selectedCategory?.name}
                    </span>
                </p>
                <p className="text-3xl text-richblack-5">
                    { catalogPageData?.data?.selectedCategory?.name}
                </p>
                <p className="max-w-[870px] text-richblack-200">
                    { catalogPageData?.data?.selectedCategory?.description}
                </p>
            </div>
        </div>

        <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 custom-lg:max-w-maxContent">
            {/* section 1 */}
            <div className="w-[90%] section_heading mx-auto">
                <div className="my-4 flex border-b border-b-richblack-600 text-lg">
                    Courses to get you started
                </div>
                <div className='flex gap-x-2 text-xl'>
                    <p
                    className={`px-4 py-2 ${
                    active === 1
                        ? "border-b border-b-yellow-25 text-yellow-25"
                        : "text-richblack-50"
                    } cursor-pointer`}
                    onClick={() => setActive(1)}
                    >
                        Most Popular
                    </p>
                    <p
                    className={`px-4 py-2 ${
                    active === 2
                        ? "border-b border-b-yellow-25 text-yellow-25"
                        : "text-richblack-50"
                    } cursor-pointer`}
                    onClick={() => setActive(2)}
                    >
                        New
                    </p>
                </div>

                <div className='my-4 h-[25rem]  min-h-fit'>
                    <CourseSlider Courses={catalogPageData?.data?.selectedCategory?.courses}/>
                </div>
            </div>

            {/* section 2 */}
            <div className="box-content w-[90%] max-w-maxContentTab  py-12 custom-lg:max-w-maxContent mx-auto">
                <div className='section_heading'>
                    Top Courses in {catalogPageData?.data?.selectedCategory?.name}
                </div>
                <div className='my-4 min-h-fit'>
                    <CourseSlider Courses={catalogPageData?.data?.differentCategory?.courses}/>
                </div>
            </div>

            {/* section 3  */}
            <div className="box-content w-[90%] max-w-maxContentTab py-12 custom-lg:max-w-maxContent mx-auto ">
                <div className="section_heading">Frequently Bought</div>
                <div className='py-8'>

                    <div className='grid custom-sm:grid-cols-1 grid-cols-2 gap-x-6  p-4'>

                        {
                            catalogPageData?.data?.mostSellingCourses?.slice(0, 4).map((course, index) => (
                                <Course_Card course={course} key={index} Height={"h-[400px]"}/>
                            ))
                        }

                    </div>
                </div>
            </div>
        </div>

        <Footer/>
    </div>
  )
}
