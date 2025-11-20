import Tag from "../../db/models/Tag.js";
import User from "../../db/models/User.js";
import TagDto from "../../db/dto/TagDto.js";
import mongoose from "mongoose";
import { ObjectId } from "mongodb";

async function getTags(req, res) {
    const user = req.user;
    try {
        const tags = await User.aggregate([
            { $match: { _id: new ObjectId(user.id) } },
            {
                $lookup: {
                    from: "tags",
                    localField: "tagsCreatedId",
                    foreignField: "_id",
                    as: "tags",
                },
            },
            { $project: { _id: 0, tags: 1 } },
        ]);
        res.status(200).json({ tags: tags[0]?.tags || [] });
    } catch (e) {
        if (e instanceof mongoose.Error.ValidationError) {
            return res.status(400).json({ message: e.message });
        }
        return res.status(500).json({ message: e?.message });
    }
}

async function createTag(req, res) {
    const user = req.user;
    const { name } = req.body;
    try {
        const tag = await Tag.create({ name });
        const dto = new TagDto(tag);
        await User.updateOne(
            { _id: user.id },
            { $addToSet: { tagsCreatedId: dto.id } },
        );
        return res.status(200).send({ message: "Success", tag: dto });
    } catch (e) {
        if (e instanceof mongoose.Error.ValidationError) {
            return res.status(400).json({ message: e.message });
        }
        return res.status(500).json({ message: e?.message });
    }
}

export { createTag, getTags };
