import Calendar from "../models/Calendar.js";
import CalendarDto from "../dto/CalendarDto.js";
import User from "../models/User.js";
import mongoose from "mongoose";

async function createCalendar(req, res) {
    const {user_id, name, description} = req.body;
    try {
        const calendar = await Calendar.create({name, description});
        const dto = new CalendarDto(calendar);
        await User.updateOne(
            {_id: user_id},
            {$push: {calendarsId: dto._id}},
        );
        return res.status(200).send({message: "Success", calendar: dto});
    } catch (e) {
        if (e instanceof mongoose.Error.ValidationError) {
            return res.status(400).json({message: e.message})
        }
        return res.status(500).json({message: e?.message})
    }
}

export {createCalendar};