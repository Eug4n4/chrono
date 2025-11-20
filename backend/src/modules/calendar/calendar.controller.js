import mongoose from "mongoose";
import { ObjectId } from "mongodb";
import { createCalendarFunction } from "./calendar.utils.js";
import User from "../../db/models/User.js";
import Calendar from "../../db/models/Calendar.js";
import Event from "../../db/models/Event.js";
import { createTag } from "../event/event.utils.js";
import TagDto from "../../db/dto/TagDto.js";
import EventDto from "../../db/dto/EventDto.js";
import Tag from "../../db/models/Tag.js";

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
                                localField: "tags",
                                foreignField: "_id",
                                as: "tags",
                            },
                        },
                        {
                            $project: {
                                _id: 1,
                                name: 1,
                                start: 1,
                                end: 1,
                                "tags._id": 1,
                                "tags.name": 1,
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
        const tags = await Promise.all(body.tags.map(async (tag) => {
            if (tag.value === tag.label) {
                const tagInDB = await createTag(user.id, tag.value);
                return tagInDB.id;
            } else {
                return tag.value;
            }
        }));
        body.tags = tags;
        const event = await Event.create(body);
        const dto = new EventDto(event);
        await Calendar.updateOne(
            { _id: calendarId },
            { $addToSet: { events: dto.id } },
        );
        return res.status(200).send({ message: "Success" });
    } catch (e) {
        if (e instanceof mongoose.Error.ValidationError) {
            return res.status(400).json({ message: e.message });
        }
        return res.status(500).json({ message: e?.message });
    }
    return res.status(200).send({ message: "Success" });
}

export { createCalendar, deleteCalendar, getCalendars, getCalendarsEvents, createEventToCalendar };
