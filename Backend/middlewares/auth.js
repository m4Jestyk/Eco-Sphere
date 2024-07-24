import { User } from "../models/user.js";
import jwt from "jsonwebtoken";
 
export const isAuthenticated = async (req, res, next) => { 

    try {
        const token = req.cookies.jwt;

        if(!token){
            return res.status(401).json({message: "Unauthorised User"})
        }

        const decoded = jwt.verify(token, "atharvKey");

        const user = await User.findById(decoded.userId).select("-password");

        req.user = user;

        next();
    } catch (error) {
        res.status(500).json({ message: err.message });
		console.log("Error in signupUser: ", err.message);
    }

}