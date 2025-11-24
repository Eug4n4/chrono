import Calendar from "../../db/models/Calendar.js";
import EventDto from "../../db/dto/EventDto.js";
import Event from "../../db/models/Event.js";
import mongoose from "mongoose";
import { generateInviteLink } from "./event.utils.js";
import { matchedData } from "express-validator";
import EmailManager from "../mail/EmailManager.js";
import User from "../../db/models/User.js";
import Invitations from "../../db/models/Invitations.js";

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

async function sendInvite(req, res) {
    const { eventId, email } = matchedData(req);
    const user = await User.findOne({ email: email });
    if (user === null) {
        return res
            .status(400)
            .json({ message: `There is no user with email ${email}` });
    }
    const link = generateInviteLink(eventId);
    EmailManager.getInstance().sendEventInvitation(link, email);
    await new Invitations({ user: user._id, event: eventId }).save();
    return res.sendStatus(204);
}

export { createEvent, sendInvite };
