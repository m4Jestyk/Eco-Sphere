import jwt from "jsonwebtoken"
 
const tokenHelper = (userId, res) => {
    const token = jwt.sign({userId}, "atharvKey", {
        expiresIn: "15d",
    });

    res.cookie("jwt", token, {
        httpOnly: true, //for more security
        maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
		sameSite: "strict", // CSRF
    });

    return token;
}

export default tokenHelper;