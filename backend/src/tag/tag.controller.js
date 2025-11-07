import Tag from "../models/Tag.js";
import User from "../models/User.js";
import TagDto from "../dto/TagDto.js";
import mongoose from "mongoose";

async function createTag(req, res) {
    const {user_id, name} = req.body;
    try {
        const tag = await Tag.create({name});
        const dto = new TagDto(tag);
        await User.updateOne(
            {_id: user_id},
            {$addToSet: {tagsCreatedId: dto.id}},
        );
        return res.status(200).send({message: "Success", tag: dto});
    } catch (e) {
        if (e instanceof mongoose.Error.ValidationError) {
            return res.status(400).json({ message: e.message })
        }
        return res.status(500).json({ message: e?.message })
    }
}

export {createTag};