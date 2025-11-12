import jwt from "jsonwebtoken";
import User from "../models/User.js";
import {
    generateAccessToken,
    generateRefreshToken,
} from "../utils/generate.tokens.js";

async function verifyToken(token) {
    try {
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({ _id: decoded.id });
        if (!user) {
            throw new Error("User not found");
        }
        return user;
    } catch (err) {
        throw new Error("Token not found");
    }
}

async function authenticate(req, res, next) {
    const accessToken = req.cookies["access"];
    const refreshToken = req.cookies["refresh"];

    try {
        if (accessToken) {
            const user = await verifyToken(accessToken);
            const newAccess = generateAccessToken(user);
            res.cookie("access", newAccess, {
                httpOnly: true,
                secure: true,
                sameSite: "strict",
            });
            req.user = user;
            return next();
        }
        throw new Error("No access token");
    } catch {
        if (!refreshToken) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        try {
            const user = await verifyToken(refreshToken);
            const newAccess = generateAccessToken(user);
            const newRefresh = generateRefreshToken(user);
            res.cookie("access", newAccess);
            res.cookie("refresh", newRefresh, { httpOnly: true });
            req.user = user;
            return next();
        } catch {
            return res.status(401).json({ message: "Unauthorized" });
        }
    }
}

export { authenticate };
