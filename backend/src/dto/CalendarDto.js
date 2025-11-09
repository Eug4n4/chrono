import Calendar from "../models/Calendar.js";

class CalendarDto {
    id;
    name;
    description;

    /**
     * @param {Calendar} calendar
     */
    constructor(calendar) {
        this.id = calendar.id;
        this.name = calendar.name;
        this.description = calendar.description;
    }
}

export default CalendarDto;
