import express from "express";
import { likeUnlike, newTweet, getTweet, deleteTweet, replyToTweet, getFeedTweets, getUserTweet } from "../controllers/tweet.js";
import { isAuthenticated } from "../middlewares/auth.js"; 

const router = express.Router(); 
 
router.get("/feed", isAuthenticated, getFeedTweets)

router.post("/new", isAuthenticated, newTweet);

router.get("/:id", getTweet);

router.get("/users/:username", getUserTweet);

router.delete("/:id", isAuthenticated, deleteTweet);

router.put("/like/:id", isAuthenticated, likeUnlike)

router.put("/reply/:id", isAuthenticated, replyToTweet);


export default router;