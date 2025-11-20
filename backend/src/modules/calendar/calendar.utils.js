import Calendar from "../../db/models/Calendar.js";
import CalendarDto from "../../db/dto/CalendarDto.js";
import User from "../../db/models/User.js";

async function createCalendarFunction(id, name, description) {
    const calendar = await Calendar.create({ name, description });
    const dto = new CalendarDto(calendar);
    await User.updateOne(
        { _id: id },
        { $addToSet: { calendarsId: calendar._id } },
    );
    return dto;
}

export { createCalendarFunction };
