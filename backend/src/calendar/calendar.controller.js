import { createCalendarFunction } from "./calendar.utils.js";
import User from "../models/User.js";
import mongoose from "mongoose";
import { ObjectId } from "mongodb";
import Calendar from "../models/Calendar.js";

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
        const calendars = await User
            .findOne({ _id: new ObjectId(user.id) });
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

        return res.status(200).send({ message: "Successfully deleted calendar" });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ error: "Failed to delete calendar" });
    }
}

async function getCalendars(req, res) {
    const user = req.user;
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
                calendarsId: {
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
        { $unwind: "$calendars" },
        {
            $project: {
                _id: "$calendars._id",
                name: "$calendars.name",
                description: "$calendars.description",
            },
        },
    ]);
    return res.status(200).send({ calendars: calendars, guestsCalendars: calendarsGuests });
}

export { createCalendar, deleteCalendar, getCalendars };
