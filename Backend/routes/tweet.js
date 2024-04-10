import express from "express";
import { likeUnlike, newTweet, getTweet, deleteTweet, replyToTweet, getFeedTweets } from "../controllers/tweet.js";
import { isAuthenticated } from "../middlewares/auth.js"; 

const router = express.Router(); 

router.get("/feed", isAuthenticated, getFeedTweets)

router.post("/new", isAuthenticated, newTweet);

router.get("/:id", getTweet);

router.delete("/:id", isAuthenticated, deleteTweet);

router.post("/like/:id", isAuthenticated, likeUnlike)

router.post("/reply/:id", isAuthenticated, replyToTweet);


export default router;