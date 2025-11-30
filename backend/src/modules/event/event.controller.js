import { generateInviteLink } from "./event.utils.js";
import { matchedData } from "express-validator";
import EmailManager from "../mail/EmailManager.js";
import User from "../../db/models/User.js";
import EventGuest from "../../db/models/EventGuest.js";
import Event from "../../db/models/Event.js";
import Calendar from "../../db/models/Calendar.js";

async function getGuests(req, res) {
    const { eventId } = matchedData(req);

    const event = await Event.findById(eventId).populate({
        path: "guests",
        populate: {
            path: "user",
            select: "login email avatar",
        },
    });
    if (!event) {
        return res.status(404).json({ message: "Event not found" });
    }
    return res.json({ guests: event.guests });
}

async function deleteGuest(req, res) {
    const { eventId, userId } = matchedData(req);
    const event = await Event.findById(eventId).populate("guests");
    if (!event) {
        return res.status(404).json({ message: "Event not found" });
    }
    const eventOwner = await User.findById(event.owner);
    const calendarOwner = await User.findById(userId);

    if (eventOwner._id.toString() !== req.user.id) {
        return res.status(403).json({
            message:
                "You do not have permission to remove guests from this event",
        });
    }

    const calendar = await Calendar.findOne({
        _id: { $in: calendarOwner.calendarsId },
        events: event._id,
    });
    await calendar.updateOne({ $pull: { events: event._id } });

    const guestEntry = event.guests.find((g) => g.user.toString() === userId);

    if (!guestEntry) {
        return res
            .status(404)
            .json({ message: "Guest not found in this event" });
    }

    await EventGuest.deleteOne({ _id: guestEntry._id });

    await event.updateOne({ $pull: { guests: guestEntry._id } });

    return res.json({ message: "User removed from event" });
}

async function deleteEvent(req, res) {
    return res.json({});
}

async function sendInvite(req, res) {
    const { eventId, email } = matchedData(req);
    const user = await User.findOne({ email: email });
    if (user === null) {
        return res
            .status(400)
            .json({ message: `There is no user with email ${email}` });
    }
    if (email === req.user.email) {
        return res.status(400).json({ message: "You can't invite yourself" });
    }
    const event = await Event.findOne({ _id: eventId }).populate("guests");
    const invite = event?.guests.find((guest) => guest.user.equals(user._id));
    if (invite !== undefined) {
        return res.status(400).json({
            message: `You have already sent invite to ${email}`,
        });
    }
    const eventGuest = await EventGuest.create({ user: user._id });
    await Event.updateOne(
        { _id: eventId },
        { $addToSet: { guests: eventGuest._id } },
    );
    const link = generateInviteLink(eventId);
    EmailManager.getInstance().sendEventInvitation(link, email);

    return res.sendStatus(204);
}

export { getGuests, deleteGuest, deleteEvent, sendInvite };
