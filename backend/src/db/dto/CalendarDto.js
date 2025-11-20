import Calendar from "../models/Calendar.js";

class CalendarDto {
    _id;
    name;
    description;

    /**
     * @param {Calendar} calendar
     */
    constructor(calendar) {
        this._id = calendar._id || calendar.id;
        this.name = calendar.name;
        this.description = calendar.description;
    }
}

export default CalendarDto;
