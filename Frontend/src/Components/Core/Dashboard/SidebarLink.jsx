import React from 'react'
import * as Icons from "react-icons/vsc"
import { useDispatch } from 'react-redux';
import { NavLink, useLocation, matchPath } from 'react-router-dom';

export const SidebarLink = ({link, iconName}) => {

    const Icon = Icons[iconName];
    // console.log("Icon name: ", link.name);
    // console.log("Icon ", Icon);

    // console.log("Icons['VscSettingsGear'] ", Icons["VscSettingsGear"])
    const location = useLocation();
    const dispatch = useDispatch();

    const matchRoute = (route) => {
        return matchPath({path: route}, location.pathname)
    }

  return (
    <NavLink to={link.path}
    className={`text-richblack-300 relative px-8 py-2 text-sm font-medium ${matchRoute(link.path) ? "bg-yellow-800 text-yellow-50" : "bg-opactity-0 text-richblack-500"}`}
    // onClick={}
    >
        {
            matchRoute(link.path)  && 
            <span className='absolute left-0 top-0 h-full w-[0.2rem] bg-yellow-50'></span>
        }

        <div className='flex flex-row items-center gap-x-2'>
            <Icon/>
            <span>{link.name}</span>
        </div>
    </NavLink>
  )
}
