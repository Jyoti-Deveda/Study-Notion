const User = require('../Models/User');
const OTP = require('../Models/OTP');
const Profile = require('../Models/Profile')
const otpGenerator = require('otp-generator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mailSender = require('../Utils/mailSender');

//sendOTP
exports.sendOTP = async (req, res) => {
    try{
        //fetch email from req.body
        const {email} = req.body;

        //check if user already exists
        const checkUserPresent = await User.findOne({email});
        if(checkUserPresent){
            return res.status(401).json({
                success:false,
                message: "User is already registered"
            })
        }

        //generate otp
        var otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
        })
        // console.log("OTP generated: ", otp);

        //check if otp is unique 
        let result = await OTP.findOne({otp});
        // console.log("Result is Generate OTP Func");
		// console.log("OTP", otp);
		// console.log("Result", result);

        //keep generating the otp until we get a unique otp
        while(result){
            otp = otpGenerator.generate(6, {
                upperCaseAlphabets: false,
                // lowerCaseAlphabets: false,
                // specialChars: false,
            })
            //again checking
            result = await OTP.findOne({otp});
        }

        //create a db entry
        const otpPayload = {email, otp};

        const otpBody = await OTP.create(otpPayload);
        // console.log("otpBody ", otpBody);
        res.status(200).json({
            success: true,
            otp: otpBody,
            message: "OTP sent successfully"
        })

    }catch(err){
        console.log(err);
        res.status(500).json({
            success: false,
            message: err.message,
        })
    }
}

//signup
// exports.signUp = async (req, res) => {
//     try{
//         //fetch data
//         const {firstName, 
//                 lastName, 
//                 email,
//                 password, 
//                 confirmPassword,
//                 accountType,
//                 // contactNumber,
//                 otp,
//         } =  req.body;

//         //validate
//         if(!firstName || !lastName || !email || !password  || !confirmPassword || !otp){
//                 return res.status(403).json({
//                     success: false,
//                     message: "All field are required"
//                 })
//         }

//         //match passwords
//         if(password !== confirmPassword){
//             return res.status(400).json({
//                 success: false,
//                 message: "Password and confirm password value does not match..please try again"
//             })
//         }
        
//         //check if user exists
//         const existingUser = await User.findOne({email});
//         if(existingUser){
//             return res.status(400).json({
//                 success: false,
//                 message: "User is already registered",
//             })
//         }

//         //fetch the most recent otp
//         //-1 is used to sort in descending order
//         const recentOtp = await OTP.find({email}).sort({createdAt: -1}).limit(1);
//         console.log("RecentOtp: ", recentOtp);

//         if(recentOtp.length === 0){
//             return res.status(400).json({
//                 success: false,
//                 message: "Otp not found",
//             })
//         }

//         //match the otps
//         if(otp !== recentOtp[0].otp){
//             return res.status(400).json({
//                 success: false,
//                 message: "Invalid otp",
//             })
//         }

//         //hash the password
//         const hashedPassword = await bcrypt.hash(password, 10);

//         //create the user
//         let approved = "";
//         approved === "Instructor" ? (approved = false) : (approved = true);

//         //db entry
//         const profileDetails = await Profile.create({
//             gender: null,
//             dateOfBirth: null,
//             about: null,
//             // contactNumber: null,
//         })
//         const user = await User.create({
//             firstName,
//             lastName,
//             email,
//             // contactNumber,
//             password: hashedPassword,
//             accountType,
//             approved: approved,
//             additionalDetails: profileDetails._id,
//             //an api from dice bearer to create an avatar
//             image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`
//         })

//         //return res
//         return res.status(200).json({
//             success: true,
//             message: "User is registered successfully",
//             user,
//         })

//     }catch(err){
//         console.log(err);
//         return res.status(500).json({
//             success: false,
//             messgae: "User cannot be registered ..Please try again"
//         })
//     }
// }

exports.signUp = async (req, res) => {
	try {
		// Destructure fields from the request body
		const {
			firstName,
			lastName,
			email,
			password,
			confirmPassword,
			accountType,
			contactNumber,
			otp,
		} = req.body;
		// Check if All Details are there or not
		if (
			!firstName ||
			!lastName ||
			!email ||
			!password ||
			!confirmPassword ||
			!otp
		) {
			return res.status(403).send({
				success: false,
				message: "All Fields are required",
			});
		}

		console.log("Data fetched")
		// Check if password and confirm password match
		if (password !== confirmPassword) {
			return res.status(400).json({
				success: false,
				message:
					"Password and Confirm Password do not match. Please try again.",
			});
		}

		// Check if user already exists
		const existingUser = await User.findOne({ email });
		if(existingUser) {
			return res.status(400).json({
				success: false,
				message: "User already exists. Please sign in to continue.",
			});
		}

		// Find the most recent OTP for the email
		const response = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
		console.log(response);
		if (response.length === 0) {
			// OTP not found for the email
			console.log("NO otp found")
			return res.status(400).json({
				success: false,
				message: "The OTP is not valid",
			});
		} else if (otp !== response[0].otp) {
			console.log("OTPis not equal ")
			console.log("OTP from user ", otp)
			console.log("OTP from db: ", response[0].otp)
			// Invalid OTP
			return res.status(400).json({
				success: false,
				message: "The OTP is not valid",
			});
		}

		// Hash the password
		const hashedPassword = await bcrypt.hash(password, 10);

		// Create the user
		let approved = "";
		approved === "Instructor" ? (approved = false) : (approved = true);

		// Create the Additional Profile For User
		const profileDetails = await Profile.create({
			gender: null,
			dateOfBirth: null,
			about: null,
			contactNumber: null,
		});
		const user = await User.create({
			firstName,
			lastName,
			email,
			contactNumber,
			password: hashedPassword,
			accountType: accountType,
			approved: approved,
			additionalDetails: profileDetails._id,
			image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
		});

		return res.status(200).json({
			success: true,
			user,
			message: "User registered successfully",
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			success: false,
			message: "User cannot be registered. Please try again.",
		});
	}
};

//login
exports.login = async (req, res) => {
    try{
        //fetch data
        const {email, password} = req.body;

        //validation
        if(!email || !password){
            return res.status(400).json({
                success: false,
                message:"All fileds are required, please try again",
            });
        }

        //existance of user
        const user = await User.findOne({email}).populate("additionalDetails");
        if(!user){
            return res.status(401).json({
                success: false,
                message: "User is not registered..sign up to continue",
            })
        }
        
        //match password
        //generate token
        if(await bcrypt.compare(password, user.password)){
            const payload = {
                email: user.email,
                id: user._id,
                accountType: user.accountType,
                }

            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn:"5h",
            });
            
            user.token = token;
            user.password = undefined;

            //create cookie
            const options = {
                expiresIn: new Date(Date.now()) + 3*24*60*60*1000,
                httpOnly: true,
            }
            //send response
            res.cookie("token", token, options).status(200).json({
                success: true,
                token,
                user,
                message: `User Login successfull`,
            })
        }else{
            return res.status(401).json({
                success: false,
                message: 'Password is incorrect',
            })
        }

    }catch(err){
        console.log(err);
        return res.status(500).json({
            success: false,
			error: err.message,
            message: "Login failure..Please try again"
        })
    }
}

//change password
exports.changePassword = async (req, res) => {
	try {
		// Get user data from req.user
		const userDetails = await User.findById(req.user.id);

		// Get old password, new password, and confirm new password from req.body
		const { oldPassword, newPassword, confirmNewPassword } = req.body;

        if(!oldPassword || !newPassword || !confirmNewPassword){
            return res.status(400).json({
                success: false,
                message: "All the fields are required",
            })
        }

		// Validate old password
		const isPasswordMatch = await bcrypt.compare(
			oldPassword,
			userDetails.password
		);
		if (!isPasswordMatch) {
			// If old password does not match, return a 401 (Unauthorized) error
			return res
				.status(401)
				.json({ success: false, message: "The password is incorrect" });
		}

		// Match new password and confirm new password
		if (newPassword !== confirmNewPassword) {
			// If new password and confirm new password do not match, return a 400 (Bad Request) error
			return res.status(400).json({
				success: false,
				message: "The password and confirm password does not match",
			});
		}

		// Update password
		const encryptedPassword = await bcrypt.hash(newPassword, 10);
		const updatedUserDetails = await User.findByIdAndUpdate(
			req.user.id,
			{ password: encryptedPassword },
			{ new: true }
		);

		// Send notification email
		try {
			const emailResponse = await mailSender(
				updatedUserDetails.email,
				passwordUpdated(
					updatedUserDetails.email,
					`Password updated successfully for ${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`
				)
			);
			console.log("Email sent successfully:", emailResponse.response);
		} catch (error) {
			// If there's an error sending the email, log the error and return a 500 (Internal Server Error) error
			console.error("Error occurred while sending email:", error);
			return res.status(500).json({
				success: false,
				message: "Error occurred while sending email",
				error: error.message,
			});
		}

		// Return success response
		return res.status(200).json({
            success: true,
            message: "Password updated successfully" 
        });
	} catch (error) {
		// If there's an error updating the password, log the error and return a 500 (Internal Server Error) error
		console.error("Error occurred while updating password:", error);
		return res.status(500).json({
			success: false,
			message: "Error occurred while updating password",
			error: error.message,
		});
	}
};
