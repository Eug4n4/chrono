import { matchedData } from "express-validator"
import bcrypt from "bcrypt"

import hashPassword from "../utils/hash.password.js";
import User from "../models/User.js";
import UserDto from "../dto/UserDto.js"
import mongoose from "mongoose";
import Token from "../models/Token.js";
import { createTokenPair } from "../utils/generate.tokens.js";

async function register(req, res) {
    const { login, email, password } = matchedData(req);
    const hashed = await hashPassword(password);
    try {
        const user = await User.create({ login, email, password: hashed })
        const dto = new UserDto(user)
        return res.json(dto)
    } catch (e) {
        if (e instanceof mongoose.Error.ValidationError) {
            return res.status(400).json({ message: e.message })
        }
        return res.status(500).json({ message: e?.message })
    }


}

async function login(req, res) {
    const { login, password } = matchedData(req);
    if (req.cookies['access'] && req.cookies['refresh']) {
        return res.status(400).json({ message: `Already logged in as ${login}` })
    }
    try {
        const user = await User.findOne({ $or: [{ login: login }, { email: login }] })
        if (user && bcrypt.compareSync(password, user.password)) {
            const dto = new UserDto(user)
            const oldToken = await Token.findOneAndDelete({ userId: user.id })
            const { access, refresh } = await createTokenPair(dto);
            res.cookie("access", access['token'], { expires: new Date(access['expires']) })
            res.cookie("refresh", refresh['token'], { httpOnly: true, expires: new Date(refresh['expires']) })
            return res.json(dto)
        }
        return res.status(400).json({ message: `Can't find user with credentials: ${login}` })


    } catch (e) {
        return res.status(500).json({ message: e?.message })
    }
}


export { register, login }