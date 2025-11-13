import User from "../models/User.js";
import UserDto from "../dto/UserDto.js";

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

export { uploadAvatar };
