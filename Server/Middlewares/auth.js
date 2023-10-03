const jwt = require('jsonwebtoken');
const User = require('../Models/User');
require('dotenv').config();

//auth
exports.auth = async (req, res, next) => {
    try{
        //extract token
        console.log("Before token verification")
        // console.log("req ", req);
        const token = req.cookies.token || 
                        req.body.token  || 
                        req.header("Authorization").replace("Bearer ", "");

        // console.log("After token verification")
        // console.log("TOKEN ", token);

        // if(!token){
        //     const authHeader = req.headers['Authorization'];
        //     token = authHeader && authHeader.split(' ')[1];          
        // }
        //if token is missing
        if(!token){
            return res.status(401).json({
                success: false,
                error: err.message,
                message: "Token is missing",
            })
        }
        // console.log("Fetched token")
        //verify the token
        try{
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            console.log("decode ", decode);
            req.user = decode;
            // console.log("Verified token")

        }catch(err){
            return res.status(401).json({
                success: false,
                message: 'Token is invalid',
                error: err.message,
            })
        }
        next();
    }catch(err){
        console.log("err.msg in auth middleware ", err.message);
        return res.status(500).json({
            success: false,
            error: err.message,
            message: "could not verify token"
        })
    }
}

//isStudent
exports.isStudent = async (req, res, next) => {
    try{
        if(req.user.accountType !== "Student"){
            return res.status(401).json({
                success: false,
                message: "This is a protected route for student only",
            })
        }
        next();
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "User role can not be verified...this is student's route"
        })
    }
}

//isInstructor
exports.isInstructor = async (req, res, next) => {
    try{
        if(req.user.accountType !== "Instructor"){
            return res.status(401).json({
                success: false,
                message: "This is a protected route for Instructor only",
            })
        }
        next();
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "User role can not be verified...this is instructor's route"
        })
    }
}

//isAdmin
exports.isAdmin = async (req, res, next) => {
    try{
        console.log("Account type", req.user.accountType)
        if(req.user.accountType !== "Admin"){
            return res.status(401).json({
                success: false,
                error: err.message,
                message: "This is a protected route for Admin only",
            })
        }
        next();
    }catch(err){
        return res.status(500).json({
            success: false,
            error: err.message,
            message: "User role can not be verified...this is Admin's route"
        })
    }
}