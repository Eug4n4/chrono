import Tag from "../models/Tag.js";
import User from "../models/User.js";
import TagDto from "../dto/TagDto.js";
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
        const dtoList = tags[0].tags.map(t => new TagDto(t));
        const selectOptions = dtoList.map(dto => dto.toSelect());
        console.log(selectOptions);
        res.status(200).json({ tags: selectOptions || [] });
    } catch (e) {
        if (e instanceof mongoose.Error.ValidationError) {
            return res.status(400).json({ message: e.message });
        }
        return res.status(500).json({ message: e?.message });
    }
}

export { getTags };
