import "./App.css";
import { Route, Routes } from "react-router-dom";
import {Home} from "./Pages/Home"
import Login from "./Pages/Login"
import { Navbar } from "./Components/Common/Navbar";
import { ForgotPassword } from "./Pages/ForgotPassword";
import OpenRoute from "./Components/Core/Auth/OpenRoute";
import Signup from "./Pages/Signup";
import { UpdatePassword } from "./Pages/UpdatePassword";
import { VerifyEmail } from "./Pages/VerifyEmail";
import { About } from "./Pages/About";
import { Contactus } from "./Pages/Contactus";
import { Dashboard } from "./Pages/Dashboard";
import { MyProfile } from "./Components/Core/Dashboard/MyProfile";
import { PrivateRoute } from "./Components/Core/Auth/PrivateRoute";
import { Error } from "./Pages/Error";
import  Setting  from "./Components/Core/Dashboard/Settings/index.jsx";
import { EnrolledCourses } from "./Components/Core/Dashboard/EnrolledCourses";
import { Cart } from "./Components/Core/Dashboard/Cart/index.jsx";
import { ACCOUNT_TYPE } from "./utils/constants";
import { useSelector } from "react-redux";
import Contact from "./Pages/Contact";
import { AddCourse } from "./Components/Core/Dashboard/AddCourse";
import { MyCourses } from "./Components/Core/Dashboard/MyCourses";
import { EditCourse } from "./Components/Core/Dashboard/EditCourse";
import { Catalog } from "./Pages/Catalog";
import { ViewCourse } from "./Pages/ViewCourse";
import { VideoDetails } from "./Components/Core/ViewCourse/VideoDetails";
import { Instructor } from "./Components/Core/Dashboard/InstructorDashboard/Instructor";
import { CourseDetails } from "./Pages/CourseDetails"

function App() {

  const user = useSelector((state) => state.profile);
  // console.log("User ", user);
  // console.log("User ", user?.user?.accountType);
  // console.log(user?.user?.accountType === "Student" );

  return (
    <div className="w-screen relative min-h-screen bg-richblack-900 flex flex-col font-inter overflow-x-hidden overflow-y-hidden">
    <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/catalog/:catalogName" element={<Catalog/>}/>
        <Route path="courses/:courseId" element={<CourseDetails/>}/>

        <Route
            path="signup"
            element={
              <OpenRoute>
                <Signup />
              </OpenRoute>
            }
          />
      <Route
            path="login"
            element={
              <OpenRoute>
                <Login />
              </OpenRoute>
            }
          />
        <Route
          path="/forgot-password"
          element={
            <OpenRoute>
              <ForgotPassword/>
            </OpenRoute>
          }
        />
        <Route
          path="/update-password/:id"
          element={
            <OpenRoute>
              <UpdatePassword/>
            </OpenRoute>
          }
        />

        <Route
          path="/verify-email"
          element={
            <OpenRoute>
              <VerifyEmail/>
            </OpenRoute>
          }
        />
        <Route
          path="/about"
          element={
              <About/>
          }
        />
        
        <Route path="/contact" element={<Contact />} />

        <Route
          // path="dashboard"
          element={
            <PrivateRoute>
              <Dashboard/>
            </PrivateRoute>
          }
        >
            <Route path="/dashboard/my-profile" element={<MyProfile/>}/>
            <Route path="/dashboard/settings" element={<Setting/>}/>

            {
              user?.user?.accountType === ACCOUNT_TYPE.STUDENT && (
                <>
                  <Route path="/dashboard/enrolled-courses" element={<EnrolledCourses/>}/>
                  <Route path="/dashboard/cart" element={<Cart/>}/>
                </>
              )
            }

            {
              user?.user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
                <>
                  <Route path="dashboard/add-course" element={<AddCourse/>}/>
                  <Route path="dashboard/my-courses" element={<MyCourses/>}/>
                  <Route path="dashboard/instructor" element={<Instructor/>}/>
                  <Route path="dashboard/edit-course/:courseId" element={<EditCourse/>}/>
                </>
              )
            }

       </Route>

       <Route element={
        <PrivateRoute>
          <ViewCourse/>
        </PrivateRoute>
      }>

      {
        user?.user?.accountType === ACCOUNT_TYPE.STUDENT && (
          <>
          <Route 
            path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId"
            element={<VideoDetails />}
          />
          </>
        )
      }

      </Route>

        

        <Route
          path="*"
          element={<Error/>}
        />

      </Routes>
    </div>
  );
}

export default App;
