const Razorpay = require('razorpay')

exports.instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY,
    key_secret: process.env.RAZORPAY_SECRET,
});

// console.log("process.env.RAZORPAY_KEY ",  typeof(process.env.RAZORPAY_KEY));
// console.log("process.env.RAZORPAY_SECRET ", process.env.RAZORPAY_SECRET);