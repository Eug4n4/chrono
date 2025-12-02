import mongoose from "mongoose";
import { ObjectId } from "mongodb";
import { createCalendarFunction } from "./calendar.utils.js";
import User from "../../db/models/User.js";
import Calendar from "../../db/models/Calendar.js";
import Event from "../../db/models/Event.js";
import { createTag } from "../event/event.utils.js";
import EventDto from "../../db/dto/EventDto.js";
import EventGuest from "../../db/models/EventGuest.js";
import CalendarGuest from "../../db/models/CalendarGuest.js";
import EmailManager from "../mail/EmailManager.js";
import jwt from "jsonwebtoken";
import { matchedData } from "express-validator";
import CalendarDto from "../../db/dto/CalendarDto.js";

async function createCalendar(req, res) {
    const user = req.user;
    const { name, description } = req.body;
    try {
        const dto = await createCalendarFunction(user.id, name, description);
        return res.status(200).send({ message: "Success", calendar: dto });
    } catch (e) {
        if (e instanceof mongoose.Error.ValidationError) {
            return res.status(400).json({ message: e.message });
        }
        return res.status(500).json({ message: e?.message });
    }
}

async function deleteCalendar(req, res) {
    try {
        const user = req.user;
        const calendar_id = req.params.calendar_id;
        const calendars = await User.findOne({ _id: new ObjectId(user.id) });
        if (!calendars) {
            return res.status(404).json({ message: "Calendar not found" });
        }
        if (calendars.calendarsId[0].toString() === calendar_id.toString()) {
            return res.status(404).json({ message: "It's default calendar" });
        }
        await Calendar.deleteOne({ _id: new ObjectId(calendar_id) });
        await User.updateOne(
            { _id: new ObjectId(user.id) },
            { $pull: { calendarsId: new ObjectId(calendar_id) } },
        );

        return res
            .status(200)
            .send({ message: "Successfully deleted calendar" });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ error: "Failed to delete calendar" });
    }
}

async function getCalendarByEventId(req, res) {
    const { eventId } = matchedData(req);
    const calendar = await Calendar.findOne({ events: eventId });
    if (!calendar) {
        return res.status(404).json({ message: "Can't find calendar" });
    }
    return res.json(new CalendarDto(calendar));
}

async function getCalendars(req, res) {
    const user = req.user;
    try {
        const calendars = await User.aggregate([
            { $match: { _id: new ObjectId(user.id) } },
            {
                $set: {
                    calendarsId: {
                        $map: {
                            input: "$calendarsId",
                            as: "cal",
                            in: { $toObjectId: "$$cal" },
                        },
                    },
                },
            },
            {
                $lookup: {
                    from: "calendars",
                    localField: "calendarsId",
                    foreignField: "_id",
                    as: "calendars",
                },
            },
            { $unwind: "$calendars" },
            {
                $project: {
                    _id: "$calendars._id",
                    name: "$calendars.name",
                    description: "$calendars.description",
                },
            },
        ]);

        const calendarsGuests = await User.aggregate([
            { $match: { _id: new ObjectId(user.id) } },
            {
                $set: {
                    calendarsGuestsId: {
                        $map: {
                            input: "$calendarsGuestsId",
                            as: "cal",
                            in: { $toObjectId: "$$cal" },
                        },
                    },
                },
            },
            {
                $lookup: {
                    from: "calendars",
                    localField: "calendarsGuestsId",
                    foreignField: "_id",
                    as: "calendarsGuest",
                },
            },
            { $unwind: "$calendarsGuest" },
            {
                $project: {
                    _id: "$calendarsGuest._id",
                    name: "$calendarsGuest.name",
                    description: "$calendarsGuest.description",
                },
            },
        ]);
        return res
            .status(200)
            .send({ calendars: calendars, guestsCalendars: calendarsGuests });
    } catch (e) {
        if (e instanceof mongoose.Error.ValidationError) {
            return res.status(400).json({ message: e.message });
        }
        return res.status(500).json({ message: e?.message });
    }
}

async function updateCalendar(req, res) {
    const { id, name, description } = matchedData(req);
    const calendar = await Calendar.findByIdAndUpdate(
        { _id: id },
        { name: name, description: description },
        { new: true },
    );
    if (calendar === null) {
        return res.status(400).json({ message: "Can't find this calendar" });
    }

    return res.json(calendar);
}

async function getCalendarsEvents(req, res) {
    try {
        const year = parseInt(req.query.year) || 2025;
        const user = req.user;
        const calendarId = new ObjectId(req.params.calendar_id);

        const startDate = new Date(`${year}-01-01T00:00:00Z`);
        const endDate = new Date(`${year + 1}-01-01T00:00:00Z`);
        const findCalendar = await User.findOne({
            _id: new mongoose.Types.ObjectId(user.id),
            $or: [
                { calendarsId: calendarId },
                { calendarsGuestsId: calendarId },
            ],
        });

        if (!findCalendar) {
            return res
                .status(403)
                .json({ message: "You don't have access to this calendar" });
        }

        const events = await Calendar.aggregate([
            { $match: { _id: calendarId } },
            {
                $lookup: {
                    from: "events",
                    let: { eventIds: "$events" },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        { $in: ["$_id", "$$eventIds"] },
                                        { $gte: ["$start", startDate] },
                                        { $lt: ["$end", endDate] },
                                    ],
                                },
                            },
                        },
                        {
                            $lookup: {
                                from: "tags",
                                let: { tagIds: "$tags" },
                                pipeline: [
                                    {
                                        $match: {
                                            $expr: {
                                                $in: ["$_id", "$$tagIds"],
                                            },
                                        },
                                    },
                                    { $project: { _id: 1, name: 1 } },
                                ],
                                as: "tags",
                            },
                        },
                    ],
                    as: "events",
                },
            },
            {
                $project: {
                    _id: 0,
                    events: 1,
                },
            },
        ]);

        return res.status(200).json({ events: events[0]?.events || [] });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Failed to get calendar events" });
    }
}

async function createEventToCalendar(req, res) {
    const calendarId = req.params.calendar_id;
    const user = req.user;
    const body = req.body;
    try {
        body.tags = await Promise.all(
            body.tags.map(async (tag) => {
                if (tag.value === tag.label) {
                    const tagInDB = await createTag(user.id, tag.value);
                    return tagInDB.id;
                } else {
                    return tag.value;
                }
            }),
        );
        body.owner = new ObjectId(user.id);
        const event = await Event.create(body);
        const dto = new EventDto(event);
        await Calendar.updateOne(
            { _id: calendarId },
            { $addToSet: { events: dto.id } },
        );
        const findEvent = await Event.aggregate([
            {
                $match: { _id: new ObjectId(dto.id) },
            },
            {
                $lookup: {
                    from: "tags",
                    let: { tagIds: "$tags" },
                    pipeline: [
                        {
                            $match: {
                                $expr: { $in: ["$_id", "$$tagIds"] },
                            },
                        },
                        {
                            $project: { _id: 1, name: 1 },
                        },
                    ],
                    as: "tags",
                },
            },
        ]);
        return res.status(200).send({ event: findEvent });
    } catch (e) {
        if (e instanceof mongoose.Error.ValidationError) {
            return res.status(400).json({ message: e.message });
        }
        return res.status(500).json({ message: e?.message });
    }
}

async function acceptInviteToEvent(req, res) {
    const { eventId, calendarId } = req.body;
    const user = req.user;
    try {
        const event = await Event.findOne({ _id: eventId }).populate("guests");
        const guest = event.guests.find(
            (guest) => guest.user.toString() === user.id,
        );
        if (!guest) {
            return res
                .status(400)
                .json({ message: "You haven't invite to this event" });
        }
        await EventGuest.updateOne(
            { _id: guest._id, user: user.id },
            { isInviteAccepted: true },
        );

        await Calendar.updateOne(
            { _id: new ObjectId(calendarId) },
            { $addToSet: { events: eventId } },
        );
        return res
            .status(200)
            .json({ message: "Successfully accepted invite" });
    } catch (e) {
        if (e instanceof mongoose.Error.ValidationError) {
            return res.status(400).json({ message: e.message });
        }
        return res.status(500).json({ message: e?.message });
    }
}

async function inviteUserToCalendar(req, res) {
    const { calendarId, email } = req.body;
    const sender = req.user;

    try {
        const owner = await User.findOne({
            _id: new ObjectId(sender.id),
            calendarsId: new ObjectId(calendarId),
        });

        if (!owner) {
            return res.status(403).json({
                message:
                    "You do not have permission to invite users to this calendar",
            });
        }

        const calendar = await Calendar.findById(calendarId);
        if (!calendar) {
            return res.status(404).json({ message: "Calendar not found" });
        }

        const userToInvite = await User.findOne({ email });
        if (!userToInvite) {
            return res
                .status(404)
                .json({ message: "User with this email not found" });
        }

        if (userToInvite._id.toString() === sender.id) {
            return res
                .status(400)
                .json({ message: "You cannot invite yourself" });
        }

        const populatedCalendar =
            await Calendar.findById(calendarId).populate("guests");
        const existingGuest = populatedCalendar.guests.find(
            (g) => g.user.toString() === userToInvite._id.toString(),
        );

        if (existingGuest) {
            return res
                .status(400)
                .json({ message: "User is already invited to this calendar" });
        }

        const calendarGuest = await CalendarGuest.create({
            user: userToInvite._id,
            isInviteAccepted: false,
        });

        await Calendar.updateOne(
            { _id: calendarId },
            { $push: { guests: calendarGuest._id } },
        );

        const token = jwt.sign(
            {
                calendarGuestId: calendarGuest._id,
                calendarId: calendarId,
                userId: userToInvite._id,
            },
            process.env.JWT_SECRET,
            { expiresIn: "7d" },
        );

        EmailManager.getInstance().sendCalendarInvitation(
            email,
            token,
            calendar.name,
        );

        return res
            .status(200)
            .json({ message: "Invitation sent successfully" });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ message: e.message });
    }
}

async function respondToCalendarInvite(req, res) {
    const { token, action } = req.body;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const { calendarGuestId, calendarId, userId } = decoded;

        const calendarGuest = await CalendarGuest.findById(calendarGuestId);
        if (!calendarGuest) {
            return res.status(404).json({ message: "Invitation not found" });
        }

        if (action === "accept") {
            await CalendarGuest.updateOne(
                { _id: calendarGuestId },
                { isInviteAccepted: true },
            );

            await User.updateOne(
                { _id: userId },
                { $addToSet: { calendarsGuestsId: calendarId } },
            );

            return res.status(200).json({ message: "Invitation accepted" });
        } else if (action === "reject") {
            await CalendarGuest.deleteOne({ _id: calendarGuestId });
            await Calendar.updateOne(
                { _id: calendarId },
                { $pull: { guests: calendarGuestId } },
            );
            return res.status(200).json({ message: "Invitation rejected" });
        } else {
            return res.status(400).json({ message: "Invalid action" });
        }
    } catch (e) {
        console.error(e);
        return res.status(400).json({ message: "Invalid or expired token" });
    }
}

async function getCalendarGuests(req, res) {
    const calendarId = req.params.calendar_id;
    try {
        const calendar = await Calendar.findById(calendarId).populate({
            path: "guests",
            populate: {
                path: "user",
                select: "login email avatar",
            },
        });

        if (!calendar) {
            return res.status(404).json({ message: "Calendar not found" });
        }

        return res.status(200).json({ guests: calendar.guests });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ message: "Failed to fetch guests" });
    }
}

async function removeUserFromCalendar(req, res) {
    const { calendar_id, user_id } = req.params;
    const requesterId = req.user.id;

    try {
        const owner = await User.findOne({
            _id: new ObjectId(requesterId),
            calendarsId: new ObjectId(calendar_id),
        });

        if (!owner) {
            return res.status(403).json({
                message:
                    "You do not have permission to remove guests from this calendar",
            });
        }

        const calendar =
            await Calendar.findById(calendar_id).populate("guests");
        if (!calendar) {
            return res.status(404).json({ message: "Calendar not found" });
        }

        const guestEntry = calendar.guests.find(
            (g) => g.user.toString() === user_id,
        );

        if (!guestEntry) {
            return res
                .status(404)
                .json({ message: "Guest not found in this calendar" });
        }

        await CalendarGuest.deleteOne({ _id: guestEntry._id });

        await Calendar.updateOne(
            { _id: new ObjectId(calendar_id) },
            { $pull: { guests: guestEntry._id } },
        );

        await User.updateOne(
            { _id: new ObjectId(user_id) },
            { $pull: { calendarsGuestsId: new ObjectId(calendar_id) } },
        );

        return res.status(200).json({ message: "User removed from calendar" });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ message: "Failed to remove user" });
    }
}

async function leaveCalendar(req, res) {
    const { calendar_id } = req.params;
    const userId = req.user.id;

    try {
        const calendar =
            await Calendar.findById(calendar_id).populate("guests");
        if (!calendar) {
            return res.status(404).json({ message: "Calendar not found" });
        }

        const guestEntry = calendar.guests.find(
            (g) => g.user.toString() === userId,
        );

        if (!guestEntry) {
            return res
                .status(404)
                .json({ message: "You are not a guest in this calendar" });
        }

        await CalendarGuest.deleteOne({ _id: guestEntry._id });

        await Calendar.updateOne(
            { _id: new ObjectId(calendar_id) },
            { $pull: { guests: guestEntry._id } },
        );

        await User.updateOne(
            { _id: new ObjectId(userId) },
            { $pull: { calendarsGuestsId: new ObjectId(calendar_id) } },
        );

        return res
            .status(200)
            .json({ message: "Successfully left the calendar" });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ message: "Failed to leave calendar" });
    }
}

export {
    createCalendar,
    deleteCalendar,
    getCalendars,
    getCalendarByEventId,
    getCalendarsEvents,
    createEventToCalendar,
    acceptInviteToEvent,
    inviteUserToCalendar,
    respondToCalendarInvite,
    getCalendarGuests,
    removeUserFromCalendar,
    leaveCalendar,
    updateCalendar,
};
