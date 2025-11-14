import { matchedData } from "express-validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import hashPassword from "../utils/hash.password.js";
import User from "../models/User.js";
import UserDto from "../dto/UserDto.js";
import mongoose from "mongoose";
import Token from "../models/Token.js";
import {
    generateAccessToken,
    generateRefreshToken,
} from "../utils/generate.tokens.js";
import EmailManager from "../mail/EmailManager.js";
import { createCalendarFunction } from "../calendar/create.calendar.js";

async function register(req, res) {
    const { login, email, password, countryCode } = matchedData(req);
    const hashed = await hashPassword(password);
    try {
        const user = await User.create({
            login,
            email,
            password: hashed,
            countryCode,
        });
        const dto = new UserDto(user);
        EmailManager.getInstance().sendVerificationMail(email);
        await createCalendarFunction(user.id, "My Calendar", "");
        return res.json(dto);
    } catch (e) {
        if (e instanceof mongoose.Error.ValidationError) {
            return res.status(400).json({ message: e.message });
        }
        return res.status(500).json({ message: e?.message });
    }
}

async function login(req, res) {
    const { login, password } = matchedData(req);
    if (req.cookies["access"] && req.cookies["refresh"]) {
        return res
            .status(400)
            .json({ message: `Already logged in as ${login}` });
    }
    try {
        const user = await User.findOne({
            $or: [{ login: login }, { email: login }],
        });
        if (user && bcrypt.compareSync(password, user.password)) {
            if (!user.emailVerified) {
                return res.status(403).json({
                    code: "EMAIL_NOT_VERIFIED",
                    message: "Please verify your email before logging in",
                    email: user.email,
                });
            }

            const dto = new UserDto(user);
            const oldToken = await Token.findOneAndDelete({ userId: user.id });
            const access = generateAccessToken(dto);
            const refresh = generateRefreshToken(dto);
            res.cookie("access", access["token"], {
                expires: new Date(access["expires"]),
            });
            res.cookie("refresh", refresh["token"], {
                httpOnly: true,
                expires: new Date(refresh["expires"]),
            });
            return res.json(dto);
        }
        return res
            .status(400)
            .json({ message: `Can't find user with credentials: ${login}` });
    } catch (e) {
        return res.status(500).json({ message: e?.message });
    }
}

async function verifyEmail(req, res) {
    const user = await User.findOneAndUpdate(
        { email: req.tokenPayload.email },
        { emailVerified: true },
    );
    if (user) {
        return res.json({ message: "Email verified successfully" });
    }
    return res
        .status(400)
        .json({ message: "There is no user with provided credentials" });
}

async function sendPasswordReset(req, res) {
    const email = matchedData(req)["email"];
    EmailManager.getInstance().sendPasswordResetMail(email);
    return res.json({ message: `Email was sent to ${email}` });
}

async function resetPassword(req, res) {
    const newPassword = matchedData(req)["password"];
    const hashed = await hashPassword(newPassword);
    const user = await User.findOneAndUpdate(
        { email: req.tokenPayload.email },
        { password: hashed },
    );
    if (user) {
        return res.json({ message: "Password reset successfully" });
    }
    return res
        .status(400)
        .json({ message: "There is no user with provided credentials" });
}

async function refresh(req, res) {
    const refreshToken = req.cookies["refresh"];
    if (!refreshToken) {
        return res.status(401).json({ message: "No refresh token" });
    }
    try {
        const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);
        const user = await User.findOne({ _id: decoded.id });
        if (!user) {
            throw new Error("User not found");
        }
        const dto = new UserDto(user);
        const access = generateAccessToken(dto);
        const newRefresh = generateRefreshToken(dto);
        res.cookie("access", access["token"], {
            expires: new Date(access["expires"]),
        });
        res.cookie("refresh", newRefresh["token"], {
            httpOnly: true,
            expires: new Date(newRefresh["expires"]),
        });
        return res.json({ accessToken: access["token"] });
    } catch (err) {
        return res.status(403).json({ message: "Invalid refresh token" });
    }
}

async function resendVerificationEmail(req, res) {
    const { email } = matchedData(req);
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res
                .status(404)
                .json({ message: "User with this email not found" });
        }
        if (user.emailVerified) {
            return res
                .status(400)
                .json({ message: "Email is already verified" });
        }
        EmailManager.getInstance().sendVerificationMail(email);
        return res.json({ message: `Verification email sent to ${email}` });
    } catch (e) {
        return res.status(500).json({ message: e?.message });
    }
}

export {
    register,
    login,
    verifyEmail,
    sendPasswordReset,
    resetPassword,
    refresh,
    resendVerificationEmail,
};
