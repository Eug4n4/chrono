import jwt from "jsonwebtoken";
import User from "../models/User.js";
import UserDto from "../dto/UserDto.js";

async function verifyToken(token) {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({ _id: decoded.id });
        if (!user) {
            throw new Error("User not found");
        }
        return new UserDto(user);
    } catch (err) {
        throw new Error("Token not found");
    }
}

async function authenticate(req, res, next) {
    const accessToken = req.cookies["access"];
    const refreshToken = req.cookies["refresh"];
    if (accessToken && refreshToken) {
        try {
            const user = await verifyToken(accessToken);
            await verifyToken(refreshToken);
            req.user = user;
            return next();
        } catch (e) {
            return res.status(401).json({ message: "Unauthorized" });
        }
    }
    return res.status(401).json({ message: "Unauthorized" });
}

export { authenticate };
