const express = require('express')
const app = express();

const userRoutes = require('./Routes/User');
const courseRoutes = require('./Routes/Course');
const profileRoutes = require('./Routes/Profile');
const paymentRoutes = require('./Routes/Payments');

const cookieParser = require('cookie-parser');
const cors = require('cors');
const {cloudinaryConnect} = require('./Config/Cloudinary');
const fileUpload = require('express-fileupload');
const dbConnect = require('./Config/database');

require('dotenv').config();
const PORT = process.env.PORT || 4000

//database connect
dbConnect();

//middlewares
app.use(express.json());
app.use(cookieParser());

app.use(
    cors({
        origin: "https://study-notion-frontend-two.vercel.app/",
        methods: "*",
        credentials: true,
    })
)

app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir:'/tmp',
    })
)

//connection with cloudinary
cloudinaryConnect();

//mounting the routes
app.use('/api/v1/auth', userRoutes);
app.use('/api/v1/profile', profileRoutes);
app.use('/api/v1/course', courseRoutes);
app.use('/api/v1/payment', paymentRoutes);

//default dummy route
app.get('/', (req, res) => {
    return res.status(200).json({
        success: true,
        message: "Your server is up and running..."
    })
})

app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`)
})

