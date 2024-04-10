import express from "express";
import userRouter from "./routes/user.js"
import tweetRouter from "./routes/tweet.js"
import dotenv from "dotenv"
import { connectDB } from "./data/database.js";
import cookieParser from "cookie-parser";
import {v2 as cloudinary} from "cloudinary";


dotenv.config();


const app = express();
connectDB();

const PORT = process.env.PORT || 3000;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

//Middlewares
app.use(express.json({limit: "50mb"}));        //limit to pass upto 50mb data through json req.body
app.use(express.urlencoded({ extended: true})) //To parse data in req.body
app.use(cookieParser());



//Routes

app.use("/api/v1/users", userRouter);
app.use("/api/v1/tweets", tweetRouter);


app.listen(PORT, ()=>{
    console.log(`Server started on ${PORT}`)
})