import mongoose from "mongoose";

export const connectDB = () => {
    mongoose.connect("mongodb://127.0.0.1:27017",{
        dbName: "twitterapi"
    })
.then(()=>{
    console.log("DB connected")
})
.catch((err)=>{
    console.log(err)
})
}