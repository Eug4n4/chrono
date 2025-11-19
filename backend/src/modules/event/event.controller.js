import Calendar from "../../db/models/Calendar.js";
import EventDto from "../../db/dto/EventDto.js";
import Event from "../../db/models/Event.js";
import mongoose from "mongoose";

async function createEvent(req, res) {
    const { name, start, end, type, tags, calendarId } = req.body;
    try {
        //const tagIds = (tags || []).map(tag => new mongoose.Types.ObjectId(tag._id));
        const event = await Event.create({
            name,
            start,
            end,
            type,
            //tags: tagIds,
        });
        const dto = new EventDto(event);
        await Calendar.updateOne(
            { _id: calendarId },
            { $addToSet: { events: dto.id } },
        );
        return res.status(200).send({ message: "Success", event: dto });
    } catch (e) {
        if (e instanceof mongoose.Error.ValidationError) {
            return res.status(400).json({ message: e.message });
        }
        return res.status(500).json({ message: e?.message });
    }
}

export { createEvent };
