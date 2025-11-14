import Calendar from "../models/Calendar.js";
import CalendarDto from "../dto/CalendarDto.js";
import User from "../models/User.js";

async function createCalendarFunction(id, name, description) {
    const calendar = await Calendar.create({ name, description });
    const dto = new CalendarDto(calendar);
    await User.updateOne(
        { _id: id },
        { $addToSet: { calendarsId: dto.id } },
    );
    return dto;
}

export { createCalendarFunction };