import mongoose from "mongoose";


async function loginUnique(value) {
    const user = await User.findOne({ login: value }).exec()
    return user ? false : true;
}

async function emailUnique(value) {
    const user = await User.findOne({ email: value }).exec()
    return user ? false : true;
}

const UserSchema = new mongoose.Schema({
    login: {
        type: String, required: true, unique: true,
        validate: {
            validator: loginUnique,
            message: "Login must be unique"
        }
    },
    email: {
        type: String, required: true, unique: true,
        validate: {
            validator: emailUnique,
            message: "Email must be unique"
        }
    },
    emailVerified: { type: Boolean, default: false },
    password: { type: String, required: true },
    avatar: { type: String, required: true, default: "storage/avatar.png" },
    createdAt: { type: Date, default: Date.now },
    calendarsId: [{ type: mongoose.Schema.Types.ObjectId, ref: "Calendar" }],
    tagsCreatedId: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tag" }],
    countryCode: { type: String, required: true }
})

const User = mongoose.model("User", UserSchema)

export default User;