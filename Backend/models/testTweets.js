import mongoose from "mongoose";

const schema = new mongoose.Schema({
    user:{
        type:String,
        required: true,
        default: "Random_Guy69",
    },
    content:{
        type: String,
        required: true,
    },
    isUserLiked:{
        type: Boolean,
        default: false,
    },
    likes:{
        type: Number,
        default: 0,
    },
    createdAt:{
        type: Date,
        default: Date.now,
    }
})

export const TestTweets = mongoose.model("TestTweets", schema);