import jwt from "jsonwebtoken";

// Generate token and set cookie
const generateToken = (user_id, res) => {
    const token = jwt.sign({id: user_id}, process.env.JWT_SECRET, {
        expiresIn: "10d"
    });

    res.cookie("jwt", token, {
        maxAge: 10 * 24 * 60 * 60 * 1000,  // 10 days in milliseconds.
        httpOnly: true,  // Prevent cross side scripting attacks (XXS attacks).
        sameSite: "strict", // Prevent cross site request forgery attacks (CSRF attacks).
        secure: process.env.NODE_ENV === "production" ? true : false
    });
    return token;
}

export default generateToken;