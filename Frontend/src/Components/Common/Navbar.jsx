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
import { RxCross2 } from 'react-icons/rx'

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

      
  const [subLinks, setSubLinks] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    ;(async () => {
      setLoading(true)
    //   try {
        // console.log("Categories url ", categories.CATEGORIES_API);
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

    useEffect(() => {
        window.addEventListener('resize', () => setMenu(false))
        // console.log("Menu ", menu)
    }, [])
 
  return (
    <div className={`flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700 ${
        location.pathname !== "/" ? "bg-richblack-800" : ""
      } transition-all duration-200`}>
      <div className='flex w-11/12  max-w-maxContent items-center justify-between'>
            <Link to={"/"} className='custom-sm:flex-shrink-0'>
                <img
                    src={logo} width={160} height={42} loading='lazy' className=''
                />
            </Link>

            {/* nav links  */}
            <nav className={`custom-lg:visible ${menu ? "custom-sm-md:visible custom-sm-md:absolute custom-sm-md:right-4 custom-sm-md:top-14 custom-sm-md:bg-richblack-700 custom-sm-md:shadow-lg custom-sm-md:rounded-md custom-sm-md:z-20 custom-sm-md:min-w-fit custom-sm-md:w-[10rem] custom-sm-md:min-h-min p-6" : "custom-sm-md:hidden"} custom-sm:h-[13rem] transition-opacity duration-300`}>
                <ul className={`flex gap-x-6 custom-lg:flex-row text-richblack-25 flex-col gap-y-2 custom-sm:pt-[2.5rem]
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
                                        } z-20`}>
                                        <div className='flex flex-row gap-x-1 items-center '>
                                            <p>{link.title}</p>
                                            <AiOutlineDown/>
                                        </div>

                                            <div className="invisible absolute left-[50%] top-[50%] flex w-[8rem] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em]
                                              group-hover:opacity-100 custom-lg:w-[300px] z-50">
                                                <div className='absolute left-[50%] top-0 h-7 w-7 custom-sm:h-4 custom-sm:w-4 translate-x-[80%] translate-y-[-40%] rotate-45 bg-richblack-5 rounded-sm -z-10'></div>
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
                                                            className="rounded-lg bg-transparent custom-lg:py-4 py-1 pl-2 custom-lg:pl-4  hover:bg-richblack-50"
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

            {/* login | signup | dashboard | cart | menu | profile dropdown*/}
            <div className={`flex gap-x-8 items-center justify-around custom-sm:gap-x-2`}>
                {
                    user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
                        <Link to={"/dashboard/cart"} className='relative text-richblack-5'>
                            <BsFillCartFill className="text-2xl text-richblack-100 "/>
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
                            <button className={`rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100
                            custom-sm:absolute custom-sm:text-xs custom-sm:p-2 top-[4.5rem] right-[7rem] z-30
                            custom-sm:${menu ? "visible" : "hidden"}`}>
                                Log in
                            </button>
                        </Link>
                    )
                }
                {
                    token === null && (
                        <Link to={"/signup"}>
                            <button className={`rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100
                            custom-sm:absolute custom-sm:text-xs custom-sm:p-2 top-[4.5rem] right-[2rem] z-30
                            custom-sm:${menu ? "visible" : "hidden"}`}>
                                Sign up
                            </button>
                        </Link>
                    )
                }

                {
                    token !== null && 
                    <div className={`flex justify-center items-center relative z-[21] text-white`}>
                        <ProfileDropdown menu={menu}/>
                    </div>
                }

                <button className="mr-4 custom-lg:hidden right-3 z-[22]"
                // onClick={() => {
                //     console.log("Before clicking ", menu)
                //     setMenu(!menu)
                //     console.log("After clicking ", menu)

                // }}
                >
                {
                    menu ? 
                    (
                        <RxCross2  fontSize={24} fill="#AFB2BF" className='text-richblack-5'
                            onClick={() => setMenu(false)}
                        />
                    )
                    : (
                        <AiOutlineMenu fontSize={24} fill="#AFB2BF"
                        onClick={() => setMenu(true)}
                         />
                    )
                }
                </button>
            </div>
            
        </div>
    </div>
  )
}
