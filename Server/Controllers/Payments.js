const { default: mongoose } = require('mongoose');
const { instance } = require('../Config/razorpay')
const Course = require('../Models/Course');
const User = require('../Models/User');
const mailSender = require('../Utils/mailSender')
const { courseEnrollmentEmail } = require('../mail/templates/courseEnrollmentEmail');
const { paymentSuccessEmail } = require('../mail/templates/paymentSuccessEmail');
const crypto = require('crypto');
const CourseProgress = require('../Models/CourseProgress');

//for multiple payments without using  webhook

exports.capturePayment = async(req, res) => {

    const {courses} = req.body;
    const userId = req.user.id;

    console.log("Type of user id in capturePayment ",  userId);
    if(courses.length === 0){
        return res.json({success: false, message: "Please provide course id"});
    }

    let totalAmount = 0;

    for(const course_id of courses){
        let course;
        try{
            course = await Course.findById(course_id);
            if(!course){
                return res.status(200).json({success: false, message: "Course not found"});
            }

            const uid = new mongoose.Types.ObjectId(userId);
            console.log("UID IN CAPTUREPAYMENT ", uid);
            if(course.studentsEnrolled.includes(uid)){
                return res.status(200).json({
                    success: false,
                    message: "Student is already enrolled",
                })
            }

            totalAmount += course.price;
        }
        catch(err){
            console.log("CAPTURE PAYMENT ERROR ",err);
            return res.status(500).json({
                success: false,
                message: err.message,
            })
        }

        
    }

    const options = {
        amount: totalAmount,
        currency: "INR",
        receipt: Math.random(Date.now()).toString(),
    }

    try{
        const paymentResponse = await instance.orders.create(options);
        res.json({
            success: true,
            message: paymentResponse,
        })
    }
    catch(err){
        console.log("Error in creating payment response object ", err);
        return res.json({
            success: false,
            error: err.message,
            message: "Could not initiate order",
        })
    }
}

exports.verifyPayment = async(req, res) => {

    const razorpay_order_id = req.body?.razorpay_order_id
    const razorpay_payment_id = req.body?.razorpay_payment_id
    const razorpay_signature = req.body?.razorpay_signature
    const courses = req.body?.courses
    const userId = req.user.id

    if(!razorpay_order_id ||
        !razorpay_payment_id ||
        !razorpay_signature ||
        !courses ||
        !userId){
            return res.status(200).json({
                success: false,
                message: "Payment Failed",
            })
    }

    let body = razorpay_order_id + "|" + razorpay_payment_id

    const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_SECRET)
        .update(body.toString())
        .digest("hex");

    if(expectedSignature == razorpay_signature) {
        //enroll students
        await enrollStudents(courses, userId, res);
        
        return res.status(200).json({
            success: true,
            message: "Payment Verified",
        })

    }
    return res.status(200).json({
        success: false,
        message: "Payment failed",
    })
}

const enrollStudents = async(courses, userId, res) => {

    console.log("Type of user id while enrolling ", typeof(userId));

    if(!courses || !userId){
        return res.status(400).json({
            success: false,
            message: "Please provide data for courses or userId"
        })
    }

    for(const courseId of courses){
        try{
            //find the course and enroll student
        const enrolledCourse = await Course.findByIdAndUpdate(
            {_id: courseId},
            {
                $push: {
                    studentsEnrolled: userId,
                }
            },
            {new: true},
        )

        if(!enrolledCourse){
            return res.status(200).json({
                success: false,
                message: "Course not found",
            })
        }

        //create an instance of courseProgress
        const courseProgress = await CourseProgress({
            courseId: courseId,
            userId: userId,
            completedVideos: [],
        })

        courseProgress.save();

        //find the student and add the course to their courses
        const enrolledStudent = await User.findByIdAndUpdate(
            {_id: userId},
            {
                $push: {
                    courses: courseId,
                    courseProgress: courseProgress._id,
                }
            },
            {new: true}
        )

        //send mail
        // const emailResponse = await mailSender(
        //     enrollStudents.email,
        //     `Successfully Enrolled into ${enrolledCourse.courseName}`,
        //     courseEnrollmentEmail(enrolledCourse.courseName, `${enrolledStudent.firstName}`)
        // )

        // console.log("Email sent successfully ", emailResponse);
        }
        catch(err){
            console.log(err);
            return res.status(500).json({
                success: false,
                message: err.message,
            })
        }
    }
}

// exports.capturePayment = async(req, res) => {
//     const {courses} = req.body;
//     const userId = req.user.id;
//     // const userId = new mongoose.Types.ObjectId(req.user.id);
//     console.log("TYPEOF USERID IN CAPTURE PAYMENT ", typeof(userId))
//     console.log("COURSES ", courses);

//     if(courses.length === 0){
//         return res.json({success: false, message: "Please provide course id"});
//     }

//     let totalAmount = 0;

//     for(const course_id of courses){
//         let course;
//         try{
//             console.log("Course id ", course_id);
//             course = await Course.findById(course_id);
//             if(!course){
//                 return res.status(200).json({success: false, message: "Could not find the course"});
//             }
//             const uid = new mongoose.Types.ObjectId(userId);
//             if(course.studentsEnrolled.includes(uid)){
//                 return res.status(200).json({success: false, message: "Student is already enrolled"});
//             }

//             totalAmount += course.price;
//         }
//         catch(err){
//             console.log(err);
//             return res.status(200).json({
//                 success: false,
//                 message: err.message,
//             })
//         }

//         const currency = "INR";
//         const options = {
//             amount: totalAmount *100,
//             currency,
//             receipt: Math.random(Date.now().toString()),
//         }

//         try{
//             console.log("Before Creating payment order")
//             const paymentResponse = instance.orders.create(options);
//             console.log("PAYMENT RESPONSE ", paymentResponse);
//             console.log("After Creating payment order")

//             res.json({
//                 success: true,
//                 message: paymentResponse
//             })
//         }catch(err){
//             console.log(err);
//             return res.status(500).json({
//                 success: false,
//                 message: "Could not Initiate order",
//                 error: err.message,
//             })
//         }
//     }
// }

// exports.verifyPayment = async (req, res) => {
//     const razorpay_order_id = req.body?.razorpay_order_id;
//     const razorpay_payment_id = req.body?.razorpay_payment_id;
//     const razorpay_signature = req.body?.razorpay_signature;
//     const courses = req.body?.courses;
//     const userId = req.body.id;

//     if(!razorpay_order_id || 
//         !razorpay_payment_id ||
//         !razorpay_signature  ||
//         !courses || !userId){
//             return res.status(200).json({
//                 success: false,
//                 message: "Payment failed",
//             })
//         }

//     let body = razorpay_order_id + "|" + razorpay_payment_id;
//     const expectedSignature = crypto
//                         .createHmac("sha256", process.env.RAZORPAY_SECRET)
//                         .update(body.toString())
//                         .digest("hex");

//     if(expectedSignature === razorpay_signature){
//         //enroll student
//         await enrollStudents(courses, userId, res);

//         //return response
//         return res.status(200).json({
//             success: true,
//             message: "Payment Verified",
//         })
//     }

//     return res.status(400).json({
//         success: false,
//         message: "Payment failed",
//     })
// }

// const enrollStudents = async (courses, userId, res) => {

//     if(!courses || !userId){
//         return res.status(400).json({success: false, message: "Please provide data for Courses or UserId"})
//     }

//     for(const courseId of courses) {
//         try{
//             const enrolledCourse = await Course.findOneAndUpdate(
//                 {_id: courseId},
//                 {
//                     $push:{
//                         studentsEnrolled: userId
//                     }
//                 },
//                 {new: true},
//             )
    
//             if(!enrolledCourse){
//                 return res.status(500).json({
//                     success: false,
//                     message: "Course not found",
//                 })
//             }
    
//             //find the student and add the course to their list of enrolledCourses
//             const enrolledStudent = await User.findByIdAndUpdate(
//                 userId,
//                 {
//                     $push: {
//                         courses: courseId,
//                     }
//                 },
//                 {new: true},
//             )
    
//             //send mail
//             const emailResponse = await mailSender(
//                 enrolledStudent.email,
//                 `Successfully enrolled into ${enrolledCourse.courseName}`,
//                 courseEnrollmentEmail(enrolledCourse.courseName, `${enrolledStudent.firstName}`)
//             )
//             console.log("email sent successfully ", emailResponse.response)
//         }
//         catch(err){
//             console.log(err.message);
//             return res.status(500).json({
//                 success: false,
//                 message: err.message,
//             })
//         }
//     }
// }


exports.sendPaymentSuccessEmail = async(req, res) => {
    const {orderId, paymentId, amount} = req.body;

    const userId = req.user.id;

    if(!orderId || !paymentId || !amount || !userId){
        return res.status(400).json({success: false, message: "Please provide all the details"});
    }

    try{
        const enrolledStudent = await User.findById(userId);
        await mailSender(
            enrolledStudent.email,
            `Payment received`,
            paymentSuccessEmail(
                `${enrolledStudent.firstName} ${enrolledStudent.lastName}`,
                amount/100, orderId, paymentId)
        )
    }catch(err){
        console.log("Error while sending mail ", err);
        return res.status(500).json({
            success: false, 
            message: "Could not send mail"
        })
    }
}

//for single payment
//capture the payment and initiate razorpay order
// exports.capturePayment = async (req, res) => {
//     //get userid and courseid
//     const {course_id} = req.body;
//     const userId = req.user.id;

//     //validation
//     if(!course_id){
//         return res.status(400).json({
//             success: false,
//             message: 'Please provide valid course id',
//         })
//     }

//     //valid course id
//     let course;
//     try{
//         course = await Course.findById({course_id});
//         if(!course){
//             return res.status(400).json({
//                 success: false,
//                 message: "Could not find the course",
//             })
//         }

//         //checking if user already paid
//         //the userId from req.user obj is in string form so
//         //to check if it is present in the studentsEnrolled 
//         //field of courses, convert it to object id
//         const uId = new mongoose.Types.ObjectId(userId);
//         if(course.studentsEnrolled.includes(uId)){
//             return res.status(400).json({
//                 success: false,
//                 message: 'Student is already enrolled',
//             })
//         };
//     }catch(err){
//         console.log(err);
//         return res.status(500).json({
//             success: false,
//             message: err.message,
//         });
//     }
    
    

//     //create order
//     const amount = course.price;
//     const currency = "INR";
//     options = {
//         amount: amount*100,
//         currency,
//         receipt: Math.random(Date.now()).toString(),
//         notes: {
//             courseId: course_id,
//             userId,
//         }
//     };

//     try{
//         const paymentResponse = await instance.orders.create(options);
//         console.log(paymentResponse);
//         return res.status(200).json({
//             success: true,
//             courseName: course.courseName,
//             courseDescription: course.courseDescription,
//             thumbnail: course.thumbnail,
//             orderId: paymentResponse.id,
//             currency: paymentResponse.currency,
//             amount: paymentResponse.amount,
//         })
//     }catch(err){
//         console.log(err);
//         res.json({
//             success: false,
//             message: "Could not initiate the order",
//         });
//     }

// }

// //verify signature
// exports.verifySignature = async (req, res) => {
//     const webhookSecret = "12345678"; //present on server
    
//     const signature = req.headers("x-razorpay-signature") //from razorpay

//     //the signature from razorpay is encrypted, to compare it with the secret stored in server
//     //the secret stored at server needs to be encrypted
//     //getting a crypto object
//     const shasum = crypto.createHmac("sha256", webhookSecret);
//     //converting the object to string
//     shasum.update(JSON.stringify(req.body))
//     const digest = shasum.digest("hex");

//     if(digest == signature){
//         console.log("Payment is authorized");

//         const {courseId, userId} = req.body.payload.payment.entity.notes;

//         try{
//             //fulfill the action

//             //find the course and enroll the student
//             const enrolledCourses = await Course.findByIdAndUpdate({courseId}, 
//                 {$push: {studentsEnrolled: userId}},
//                 {new: true});

//             if(!enrolledCourses){
//                 return res.status(400).json({
//                     success: false,
//                     message: "Course not found",
//                 });
//             }

//             console.log(enrolledCourses);

//             //find user and add course 
//             const enrolledStudent = await User.findByIdAndUpdate({userId},
//                 {$push: {course: courseId}},
//                 {new: true});

//             console.log(enrolledStudent);

//             //send mail
//             const emailResponse = await mailSender(enrolledStudent.email, 
//                                                     "Congratulation you are onboarded on new course",
//                                                     courseEnrollmentEmail(enrolledCourses.courseName, enrolledStudent.firstName));
//             console.log(emailResponse);
//             return res.status(200).json({
//                 sucess: true,
//                 message: "Signature verified student got the course"
//             })
//         }catch(err){
//             console.log(err);
//             return res.status(500).json({
//                 sucess: false,
//                 message: "student coudn't get the course"
//             })
//         }     
//     }
//     else{
//         return res.status(500).json({
//             sucess: false,
//             message: "Invalid request",
//         })
//     }
// }