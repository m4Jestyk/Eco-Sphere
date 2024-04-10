import express from "express";
import {
  createUser,
  login,
  logout,
  followUnfollow,
  updateProfile,
  getProfile,
} from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/new", createUser);

router.post("/login", login);

router.get("/logout", logout);

router.get("/:username", getProfile);

router.put("/update/:id", isAuthenticated, updateProfile)

router.post("/follow/:id", isAuthenticated, followUnfollow); //toggle state for flw/unflw

export default router;
