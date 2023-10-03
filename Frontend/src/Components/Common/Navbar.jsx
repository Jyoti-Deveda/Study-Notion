import React, { useEffect, useState } from 'react'
import {NavbarLinks} from '../../data/navbar-links'
import { Link, matchPath, useLocation } from 'react-router-dom'
import logo from '../../assets/Logo/Logo-Full-Light.png'
import { useSelector } from 'react-redux'
import { BsFillCartFill } from 'react-icons/bs'
import ProfileDropdown  from '../Core/Auth/ProfileDropdown'
import { apiConnector } from '../../Services/apiconnector'
import { categories } from '../../Services/apis'
import { AiOutlineDown } from 'react-icons/ai'
import { ACCOUNT_TYPE } from '../../utils/constants'
import { AiOutlineMenu } from "react-icons/ai"

// const subLinks = [
//     {
//         title: "python",
//         link: "/catalog/python"
//     },
//     {
//         title: "web development",
//         link: "/catalog/web-development"
//     }
// ]

export const Navbar = () => {
    const {token} = useSelector((state) => state.auth);
    const {user} = useSelector((state) => state.profile);
    const {totalItems} = useSelector((state) => state.cart);

    const location = useLocation();


    // const fetchSubLinks = async() => {
    //         try{
    //             const result = await apiConnector("GET", categories.CATEGORIES_API);
    //             console.log("Printing sub links: ", result);
    //             const categorie = result.data.categories;
    //             console.log("Categorie ", categorie);
    //             const categoryName = [];

    //             await categorie.forEach((category) => {
    //                 categoryName.push(category["name"]);
    //                 console.log(categoryName);
    //             })
    //             setSubLinks(categoryName);
    //             console.log("sublinks ", subLinks);
    //         }catch(err){
    //             console.log("Cannot fetch the catalog list: ",err);

    //         }
    // }
    // useEffect(() => {
    //     fetchSubLinks();
    // }, []);

    
  const [subLinks, setSubLinks] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    ;(async () => {
        // console.log("HELOO FUNCTION STARTED")
      setLoading(true)
    //   try {
        console.log("Categories url ", categories.CATEGORIES_API);
        const res = await apiConnector("GET", categories.CATEGORIES_API)
        // console.log("FETCHED CATEGORIES ", res);
        // console.log("res.data.data ", res.data.data);
        const categorieNames = res.data.data; 
        // console.log("categorieNames ", categorieNames);
        setSubLinks([...categorieNames]);
        // console.log("SUBLINKS ", subLinks);

    //   } catch (error) {
    //     console.log("Could not fetch Categories.", error)
    //   }
      setLoading(false)
    })()
  }, [])
    
    const matchRoute = (route) => {
        return matchPath({path: route}, location.pathname);
    }

    const [menu, setMenu] = useState(false)
 
  return (
    <div className={`flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700 ${
        location.pathname !== "/" ? "bg-richblack-800" : ""
      } transition-all duration-200`}>
      <div className='relative flex w-11/12  max-w-maxContent items-center justify-between'>
            <Link to={"/"}>
                <img
                    src={logo} width={160} height={42} loading='lazy'
                />
            </Link>

            {/* nav links  */}
            <nav className={`custom-sm:${menu ? "absolute block right-0 top-10 bg-richblack-700 z-10" : "hidden"}`}>
                <ul className={`flex gap-x-6 text-richblack-25 custom-sm:flex-col custom-sm: custom-sm:w-full
                `}>
                    {
                        NavbarLinks.map((link, index) => {
                            return <li key={index} className='text-richblack-100'>
                                {
                                    link.title === 'Catalog' ? 
                                    (
                                        <div className={`group relative flex cursor-pointer items-center gap-1 ${
                                            matchRoute("/catalog/:catalogName")
                                            ? "text-yellow-25"
                                            : "text-richblack-25"
                                        }`}>
                                        <p>{link.title}</p>
                                            <AiOutlineDown/>

                                            <div className="invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 custom-lg:w-[300px]">
                                                <div className='absolute left-[50%] top-0 -z-10 h-7 w-7 translate-x-[80%] translate-y-[-40%] rotate-45 bg-richblack-5 rounded-sm'></div>
                                                {loading ? (
                                                    <p className="spinner"></p>
                                                    ) : subLinks.length ? (
                                                    <>
                                                        {subLinks
                                                        ?.filter(
                                                            (subLink) => subLink?.courses?.length > 0
                                                        )
                                                        ?.map((subLink, i) => (
                                                            <Link
                                                            to={`/catalog/${subLink.name
                                                                .split(" ")
                                                                .join("-")
                                                                .toLowerCase()}`}
                                                            className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50"
                                                            key={i}
                                                            >
                                                            <p>{subLink.name}</p>
                                                            </Link>
                                                        ))}
                                                    </>
                                                    ) : (
                                                    <p className="text-center">No Courses Found</p>
                                                    )}
                                            </div>
                                        </div>
                                    ): 
                                    (
                                        <Link to={link?.path}>
                                            <p className={`${matchRoute(link?.path) ? ("text-yellow-25") : ("text-richblack"-25)}`}>
                                                {link.title}
                                            </p>
                                        </Link>
                                    )
                                }
                            </li>
                        })
                    }
                </ul>
            </nav>

            {/* login | signup | dashboard  */}
            <div className='flex gap-x-4 items-center'>
                {
                    user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
                        <Link to={"/dashboard/cart"} className='relative text-richblack-5'>
                            <BsFillCartFill className="text-2xl text-richblack-100 custom-sm:hidden"/>
                            {/* number on the cart  */}
                            {
                                totalItems > 0 && (
                                    <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100">
                                        {totalItems}
                                    </span>
                                )
                            }
                        </Link>
                    ) 
                }
                {/* if token is null login button will be shown  */}
                {
                    token === null && (
                        <Link to={"/login"}>
                            <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                                Log in
                            </button>
                        </Link>
                    )
                }
                {
                    token === null && (
                        <Link to={"/signup"}>
                            <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                                Sign up
                            </button>
                        </Link>
                    )
                }

                {
                    token !== null && <ProfileDropdown/>
                }

                <button className="mr-4 custom-sm:block hidden"
                onClick={() => (setMenu(!menu))}>
                <AiOutlineMenu fontSize={24} fill="#AFB2BF" />
                </button>
            </div>
            
        </div>
    </div>
  )
}
