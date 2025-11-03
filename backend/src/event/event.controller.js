import Calendar from "../models/Calendar.js";
import CalendarDto from "../dto/CalendarDto.js";

async function createEvent(req, res) {
    const {name, description} = req.body;
    const calendar = await Calendar.create({name, description});
    const dto = new CalendarDto(calendar);
    return res.status(200).send({message: "Success", calendar: dto});
}

export {createEvent};
