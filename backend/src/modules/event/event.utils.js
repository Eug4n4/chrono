import Tag from "../../db/models/Tag.js";
import TagDto from "../../db/dto/TagDto.js";
import User from "../../db/models/User.js";
import jwt from "jsonwebtoken";

function generateInviteLink(eventId) {
    const token = jwt.sign({ eventId: eventId }, process.env.JWT_SECRET);
    return `${process.env.FRONTEND_HOST}:${process.env.FRONTEND_PORT}/calendar?token=${token}`;
}

export async function createTag(user_id, name) {
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

export { generateInviteLink };
