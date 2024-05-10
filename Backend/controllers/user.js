import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import tokenHelper from "../utils/helpers/tokenHelper.js";
import {v2 as cloudinary} from "cloudinary"
import mongoose from "mongoose";

export const createUser = async (req, res, next) => {
  try {
    const { name, email, password, username } = req.body;

    let user = await User.findOne({ $or: [{ email }, { username }] });

    if (user) {
      return res.json({
        error: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user = await User.create({
      name,
      email,
      username,
      password: hashedPassword,
    });

    await user.save();

    if (user) {
      tokenHelper(user, res);

      res.json({
        success: true,
        _id: user._id,
        name: user.name,
        email: user.email,
        username: user.username,
        bio: user.bio,
        profilePic: user.profilePic,
      });
    } else {
      res.status(400).json({ error: "Invalid user details" });
    }
  } catch (error) {
    console.log(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    const isPwCorrect = await bcrypt.compare(password, user.password || "");

    if (!user) {
      return res.json({
        error: "User doesnt exist",
      });
    }

    if (!isPwCorrect) {
      return res.json({
        error: "Invalid credentials",
      });
    }

    tokenHelper(user._id, res);

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      username: user.username,
      bio: user.bio,
      profilePic: user.profilePic,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log("Error in loginUser: ", error.message);
  }
};

export const logout = async (req, res, next) => {
  try {
    await res.cookie("jwt", "", { expires: new Date(Date.now()) });

    await res.json({
      success: true,
      message: "Logged out",
    });
  } catch (error) {
    console.log(error);
  }
};

export const getProfile = async (req, res, next) => {
  //WE WILL FETCH USER USING EITHER USERID OR USERNAME
  //  query CAN BE EITHER USERID OR USERNAME
  const { query } = req.params;
  try {
    
     let user;

     //query is userId
     if(mongoose.Types.ObjectId.isValid(query)){
      user = await User.findOne({_id: query}).select("-password").select("-updatedAt")
     } else {
      //query is a username
      user = await User.findOne({username: query}).select("-password").select("-updatedAt")
     }

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.log(error);
  }
};

export const followUnfollow = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userToModify = await User.findById(id);
    const currentUser = await User.findById(req.user._id);

    if (id == req.user._id.toString()) {
      return res
        .status(400)
        .json({ error: "You can't follow or unfollow yourself" });
    }

    if (!userToModify || !currentUser)
      return res.status(400).json({ error: "User not found" });

    const isFollowing = currentUser.following.includes(id);

    if (isFollowing) {
      //Unfollow User
      await User.findByIdAndUpdate(id, { $pull: { followers: req.user._id } });
      await User.findByIdAndUpdate(req.user._id, { $pull: { following: id } });
      res.status(200).json({ message: "User unfollowed successfully" });
    } else {
      // Follow user
      await User.findByIdAndUpdate(id, { $push: { followers: req.user._id } });
      await User.findByIdAndUpdate(req.user._id, { $push: { following: id } });
      res.status(200).json({ message: "User followed successfully" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.log("Error in followUnFollowUser: ", err.message);
  }
};

export const updateProfile = async (req, res, next) => {
  const { name, email, username, password, bio } = req.body;
  let {profilePic} = req.body;
  const userId = req.user._id;

  try {
    let user = await User.findById(userId);

    if (!user) return res.status(400).json({ error: "User not found" });

    if (req.params.id != userId.toString())
      return res
        .status(400)
        .json({ error: "You cant update others' profile" });

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }

    if(profilePic){
      if(user.profilePic){
         await cloudinary.uploader.destroy(user.profilePic.split("/").pop().split(".")[0])
      }
      const uploadedResponse = await cloudinary.uploader.upload(profilePic);
      profilePic = uploadedResponse.secure_url;
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.username = username || user.username;
    user.profilePic = profilePic || user.profilePic;
    user.bio = bio || user.bio;


    user = await user.save();

    user.password = null;        //Password should be null in response

    res.status(200).json({ message: "Profile updated succesfully", user });
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.log("Error in updateUser: ", err.message);
  }
};
