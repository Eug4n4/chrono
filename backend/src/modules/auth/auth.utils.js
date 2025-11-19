import jwt from "jsonwebtoken";
import Token from "../../db/models/Token.js";
import bcrypt from "bcrypt";

const generateAccessToken = (user) => {
    const expires = Date.now() + 10 * 60 * 1000;

    return {
        token: jwt.sign({ ...user }, process.env.JWT_SECRET, {
            expiresIn: expires,
        }),
        expires: expires,
    };
};

const generateRefreshToken = (user) => {
    const expires = Date.now() + 2 * 60 * 60 * 1000;
    return {
        token: jwt.sign({ id: user["id"] }, process.env.JWT_SECRET, {
            expiresIn: expires,
        }),
        expires: expires,
    };
};

const createTokenPair = async (user) => {
    const access = generateAccessToken(user);
    const refresh = generateRefreshToken(user);
    await new Token({ userId: user["id"], refresh: refresh["token"] }).save();
    return { access, refresh };
};



async function hashPassword(plainText) {
    return bcrypt.hash(plainText, 10);
}

export default hashPassword;

export { generateAccessToken, generateRefreshToken, createTokenPair, hashPassword };