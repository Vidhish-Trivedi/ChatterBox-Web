import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import generateToken from "../utils/generateToken.js";

export const signup = async (req, res) => {
    try {
        const {fullName, username, password, confirmPassword, gender} = req.body;
        if(password !== confirmPassword) {
            return res.status(400).json({message: "Passwords do not match"});
        }
        
        const user = await User.findOne({username});
        if(user) {
            return res.status(400).json({message: "User already exists"});
        }
        
        // Hash password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);
        
        // Random profile picture API - https://avatar-placeholder.iran.liara.run/public/{girl || boy}
        const profilePictureMale = "https://avatar-placeholder.iran/public/boy?username=" + username;
        const profilePictureFemale = "https://avatar-placeholder.iran/public/girl?username=" + username;
        
        const newUser = new User({
            fullName: fullName,
            username: username,
            password: hashedPassword,
            gender: gender,
            profilePicture: gender === "male" ? profilePictureMale : profilePictureFemale
        });
        if(newUser) {
            // Generate JWT and set cookie here
            generateToken(newUser._id, res);
            await newUser.save();
            res.status(201).json({message: `User ${newUser.username} with id: ${newUser._id} created successfully`});
        }
        else {
            res.status(400).json({message: "Invalid user data"});
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal Server Error"});
    }
};

export const login = async (req, res) => {
    try {
        const {username, password} = req.body;
        const user = await User.findOne({username});
        if(user && (await bcryptjs.compare(password, user.password))) {
            // Generate JWT and set cookie here
            generateToken(user._id, res);
            res.status(200).json({message: `User ${user.username} logged in successfully`});
        }
        else {
            res.status(400).json({message: "Invalid credentials"});
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal Server Error"});
    }
};

export const logout = (req, res) => {
    try {
        res.cookie("jwt", "", {maxAge: 0});
        res.clearCookie("jwt");
        res.status(200).json({message: "User logged out successfully"});
    }
    catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal Server Error"});
    }
};
