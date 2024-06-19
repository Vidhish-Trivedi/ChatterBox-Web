import User from "../models/user.model.js";

export const getSidebarUsers = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        const users = await User.find({ _id: { $ne: loggedInUserId } }).select("-password"); // users, except the logged in user.
        
        return res.status(200).json({ users });
    }
    catch (error) {
        console.log("Error in getSidebarUsers controller", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export default getSidebarUsers;