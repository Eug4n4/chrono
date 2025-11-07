import Calendar from "../models/Calendar.js";
import EventDto from "../dto/EventDto.js";
import Event from "../models/Event.js";
import mongoose from "mongoose";

async function createEvent(req, res) {
    const {name, start, end, type, tags, calendarId} = req.body;
    try {
        const event = await Event.create({name, start, end, type});
        const dto = new EventDto(event);
        await Calendar.updateOne(
            {_id: calendarId},
            {$addToSet: {events: dto.id}}
        );
        return res.status(200).send({message: "Success", event: dto});
    } catch (e) {
        if (e instanceof mongoose.Error.ValidationError) {
            return res.status(400).json({message: e.message})
        }
        return res.status(500).json({message: e?.message})
    }
}

export {createEvent};
