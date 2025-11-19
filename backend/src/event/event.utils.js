import Tag from "../models/Tag.js";
import TagDto from "../dto/TagDto.js";
import User from "../models/User.js";

async function createTag(user_id, name) {
    try {
        const tag = await Tag.create({ name });
        const dto = new TagDto(tag);
        await User.updateOne(
            { _id: user_id },
            { $addToSet: { tagsCreatedId: dto.id } },
        );
        return dto;
    } catch (e) {
        console.error(e.message);
    }
}