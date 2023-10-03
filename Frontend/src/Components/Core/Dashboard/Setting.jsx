// import React, { useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { useNavigate } from 'react-router-dom';
// import { IconButton } from '../../Common/IconButton';
// import { HiOutlineUpload } from "react-icons/hi"
// import { toast } from 'react-hot-toast';
// import { apiConnector } from '../../../Services/apiconnector';
// import { settingsEndpoints } from '../../../Services/apis';

// export const Setting = () => {
//     const {user} = useSelector((state) => state.profile);
//     const {token} = useSelector((state) => state.auth);
//     const dispatch = useDispatch();
//     const navigate = useNavigate();

//     const [profileDetails, setProfileDetails] = useState({
//         firstName:"",
//         lastName:"",
//         dateOfBirth:"",
//         gender:"",
//         contactNumber:"",
//         about:"",
//     })

//     const [profilePicture, setProfilePicture] = useState(null);

//     const changeHandler = (event) => {
//         setProfileDetails((prev) => {
//             return {
//                 ...prev, 
//                 [event.target.name]:event.target.value,
//             }
//         })
//     }

//     const headers = {
//         Authorization: `Bearer ${token}`,
//       }

//     const uploadImage = async (profilePicture) => {
//         const toastId = toast.loading("Loading")
//         try{
//             console.log("Profile image ", profilePicture);
//             const url = settingsEndpoints.UPDATE_DISPLAY_PICTURE_API;
//             console.log("url ", url);
//             const response = await apiConnector("PUT", url, {profilePicture}, {headers});

//             if(!response){
//                 throw new Error("Error ", response.data.message);
//             }
//             console.log("Response: ", response);
//             toast.success("Image Uploaded");
//             navigate("/dashboard/setting")
//         }catch(err){
//             console.log(err);
//             toast.error("Couldn't upload the image")
//         }
//         toast.dismiss(toastId);   
//     }

//     const handleSubmit = async () => {

//     }

//   return (
//     <div className='text-white flex flex-col gap-10'>
//         <h1 className='text-2xl text-richblack-25 font-bold'>
//             Edit Profile
//         </h1>

//         {/* section 1 */}
//         <div className='flex flex-row gap-5 p-5 bg-richblack-800 w-[70%] rounded-md '>
//             <img
//                 src={user.image}
//                 alt={`profile-${user.firstName}`}
//                 className='aspect-square w-[78px] h-[78px] rounded-full'
//             />
//             <div className='flex flex-col gap-2'>
//                 <p>
//                     Change Profile picture
//                 </p>
//                 <div className='flex flex-row gap-1'>
//                     <div>
//                         {/* <label htmlFor='profile'>Select</label> */}
//                             <input 
//                                 type='file'
//                                 name='profile'
//                                 onChange={(event) => {
//                                     console.log("Event", event.target.files[0]);
//                                     setProfilePicture(event.target.files[0]);   
//                                 }}
//                                 // value={profilePicture}
//                                 // className='invisible cursor-pointer'
//                             />
//                     </div>

//                     <IconButton
//                         text={"Upload"}
//                         onclick={() => uploadImage(profilePicture)}
//                         >
//                         <HiOutlineUpload/>
//                     </IconButton>
//                 </div>
//             </div>
//         </div>

//         {/* section 2 */}
//         <div className='flex flex-col gap-2 w-[70%] rounded-md bg-richblack-800 p-5'>
//             <h1 className='text-2xl text-richblack-25 font-bold mb-2' >
//                 Profile Information
//             </h1>
//             <form className='flex flex-col gap-5'>
//             <div className='flex flex-row justify-between'>
//                 <div className='flex flex-col gap-1'>
//                     <label htmlFor='firstName' className='text-richblack-100 font-medium'>First Name</label>
//                     <input
//                         type='text'
//                         name='firstName'
//                         placeholder='First Name'
//                         onChange={changeHandler}
//                         value={profileDetails.firstName}
//                         className='text-sm bg-richblack-700 p-1 w-full rounded-md border-b border-b-richblack-500'
//                     />
//                 </div>

//                 <div className='flex flex-col gap-1'>
//                     <label htmlFor='lastName' className='text-richblack-100 font-medium'>Last Name</label>
//                     <input
//                         type='text'
//                         name='lastName'
//                         placeholder='Last Name'
//                         onChange={changeHandler}
//                         value={profileDetails.lastName}
//                         className='bg-richblack-700 p-1 rounded-md border-b border-b-richblack-500'
//                     />    
//                 </div>
//             </div>

//             <div className='flex flex-row justify-between'>
//                 <div className='flex flex-col gap-1'>
//                     <label htmlFor='dateOfBirth' className='text-richblack-100 font-medium'>Date of Birth</label>
//                         <input
//                             type='date'
//                             name='dateOfBirth'
//                             placeholder='Date of Birth'
//                             onChange={changeHandler}
//                             value={profileDetails.dateOfBirth}
//                             className='bg-richblack-700 p-1 rounded-md border-b border-b-richblack-500'
//                         /> 
//                 </div>

//                 <div className='flex flex-col gap-1'>
//                     <label htmlFor='gender'>Gender</label>
//                     <input
//                         type='text'
//                         name='gender'
//                         placeholder='Gender'
//                         onChange={changeHandler}
//                         value={profileDetails.gender}
//                         className='bg-richblack-700 p-1 rounded-md border-b border-b-richblack-500'
//                     />
//                 </div>
//             </div>

//             <div className='flex flex-row justify-between'>
//                 <div className='flex flex-col gap-1'>
//                     <label htmlFor='contactNumber' className='text-richblack-100 font-medium'>Contact Number</label>
//                         <input
//                             type='number'
//                             name='contactNumber'
//                             placeholder='Contact'
//                             onChange={changeHandler}
//                             value={profileDetails.contactNumber}
//                             className='bg-richblack-700 p-1 rounded-md border-b border-b-richblack-500'
//                         /> 
//                 </div>

//                 <div className='flex flex-col gap-1'>
//                     <label htmlFor='about' className='text-richblack-100 font-medium'>About</label>
//                     <input
//                         type='text'
//                         name='about'
//                         placeholder='About you'
//                         onChange={changeHandler}
//                         value={profileDetails.about}
//                         className='bg-richblack-700 p-1 rounded-md border-b border-b-richblack-500 '
//                     />
//                 </div>
//             </div>

           
//             </form>
//         </div>

//          {/* for buttons  */}
//          <div>
//                 <button onClick={() => navigate("/dashboard/my-profile")}>
//                     Cancel
//                 </button>

//                 <button onClick={() => handleSubmit()} type='submit'>
//                     submit
//                 </button>
//             </div>
//     </div>
//   )
// }
