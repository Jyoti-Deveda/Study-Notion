const User = require('../Models/User')
const mailSender = require('../Utils/mailSender')
const bcrypt = require('bcrypt');
const crypto = require('crypto');

//resetPasswordToken
//part 1 : Generate the link and send the mail
exports.resetPasswordToken = async (req, res) => {
    try{
        //get email
        const {email} = req.body;

        //validations
        if(!email){
            return res.status(400).json({
                success: false,
                message: "Email is required",
            })
        }

        //check the existance
        const user = await User.findOne({email});

        if(!user){
            return res.status(400).json({
                success: false,
                message: "Your email is not registered",
            })
        }

        //generate token with expiry
		const token = crypto.randomBytes(20).toString("hex");

        //update user with token and expiry
        const updatedDetails = await User.findOneAndUpdate({email},
        {
            token: token, 
            resetPasswordExpires: Date.now() + 5*60*1000
        },
        {new: true});
        console.log("DETAILS", updatedDetails);

        //generate url
        const url = `http://localhost:3000/update-password/${token}`

        //send mail
        await mailSender(email, 
                        "Password reset link", 
                        `Your Link for email verification is ${url}. Please click this url to reset your password.`
        );
        //return response
        return res.status(200).json({
            success: true,
            message: "Email sent successfully...check email to update password",
            url
        })
    }catch(err){
        console.log(err);
        return res.status(500).json({
            success: false,
            error: err.message,
            message: "Something went wrong while reset"
        })
    }
}

//resetPassword
//part 2: update the password in db
exports.resetPassword = async (req, res) => {
    try{
        //fetch data
        const {token, password, confirmPassword} = req.body;

        //validation
        if(password !== confirmPassword){
            return res.status(401).json({
                success: false,
                message: "Password does not match",
            })
        }

        //get user details
        const userDetails = await User.findOne({token});

        //if no entry - invalid token || time expired
        if(!userDetails){
            return res.status(403).json({
                success: false,
                message: "The token is invalid",
            });
        }

        //checking if token is expired
        if(userDetails.resetPassword < Date.now()){
            return res.json({
                success: false,
                message: "Token is expired..regenerate the token"
            })
        }
        
        //hash the new password
        const hashedPassword = await bcrypt.hash(password, 10);

        //update the password
        const updatedDetails = await User.findOneAndUpdate({token}, 
            {password: hashedPassword},
            {new: true});


        //return resonse
        return res.status(200).json({
            success: true,
            updatedDetails,
            message: "Password reset successfull",
        })

    }catch(err){
        return res.status(500).json({
            error: err.message,
            success: false,
            message: "Could not reset the password",
        })
    }
}