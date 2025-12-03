import User from "../../db/models/User.js";
import UserDto from "../../db/dto/UserDto.js";
import { matchedData } from "express-validator";
import { generateAccessToken } from "../auth/auth.utils.js";

async function uploadAvatar(req, res) {
    if (!req.file) {
        return res.status(400).json({ message: "No image uploaded!" });
    }
    const fileName = req.file.filename;
    const user = await User.findOneAndUpdate(
        { _id: req.user.id },
        { avatar: `storage/${fileName}` },
        { new: true },
    );
    if (!user) {
        return res.status(400).json({ message: "Cannot find user" });
    }
    const dto = new UserDto(user);
    return res.json(dto);
}

async function updateUser(req, res) {
    const { login, countryCode } = matchedData(req);
    const file = req.file;
    const withLogin = await User.findOne({ login: login });
    if (withLogin) {
        return res
            .status(400)
            .json({ message: `User with login ${login} already exists` });
    }
    const user = await User.findByIdAndUpdate(
        req.user.id,
        {
            login: login,
            countryCode: countryCode,
            avatar: file ? `storage/${file.filename}` : undefined,
        },
        { new: true },
    );
    const dto = new UserDto(user);
    const access = generateAccessToken(dto);
    res.cookie("access", access["token"], {
        expires: new Date(access["expires"]),
    });
    return res.json(dto);
}

export { uploadAvatar, updateUser };
