const mongoose =require('mongoose');
const mailSender = require('../Utils/mailSender');
const emailTemplate = require('../mail/templates/emailVerificationTemplate');

const OTPSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
    },
    otp: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        expires: Date.now()+5*60*1000,
    }
})

//function to send mails
async function sendVerificationEmail(email, otp){
    try{
        const mailResponse = await mailSender(email, "Verification Email", emailTemplate(otp));
        console.log("Email sent successfully: ", mailResponse)
    }catch(err){
        console.log(err);
        console.log("Error while sending mail")
        throw err;
    }
}

OTPSchema.pre('save', async function(next) {
    console.log("New document saved to database");

    //only send an email when a new doc is created
    if(this.isNew){
        await sendVerificationEmail(this.email, this.otp);
    }
    next();
})

module.exports = mongoose.model("OTP", OTPSchema);