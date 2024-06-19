import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

const authenticateRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(401).json({ error: "Not Authorized - No Token" });
        }

        const verified = jwt.verify(token, process.env.JWT_SECRET);
        if(!verified) {
            return res.status(401).json({error: "Not Authorized - Invalid Token"});
        }

        const user = await User.findById(verified.id).select("-password");  // Return the user object without the password field.
        if(!user) {
            return res.status(401).json({error: "Not Authorized - No User Found"});
        }

        req.user = user;

        next();
    }
    catch(error) {
        console.log("Error in authenticateRoute middleware", error);
        res.status(401).json({ error: "Not Authorized" });
    }
};

export default authenticateRoute;