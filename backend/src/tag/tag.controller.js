import Tag from "../models/Tag.js";
import User from "../models/User.js";
import TagDto from "../dto/TagDto.js";

async function createTag(req, res) {
    const {user_id, name} = req.body;
    const tag = await Tag.create({name});
    const dto = new TagDto(tag);
    const result = await User.updateOne(
        {_id: user_id},
        {$push: {tagsCreatedId: dto._id}},
    );
    return res.status(200).send({message: "Success", tag: dto});
}

export {createTag};