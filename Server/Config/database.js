const mongoose = require('mongoose');
require('dotenv').config();

const dbConnect = () => {
    mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("DB cconnectioned successfully"))
    .catch((err) => {
        console.log("Issue in DB connection");
        console.error(err);
        process.exit();
    })
}

module.exports = dbConnect;