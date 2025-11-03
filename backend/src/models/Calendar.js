import mongoose from "mongoose";

const CalendarSchema = new mongoose.Schema({
    name: String,
    description: String,
    guests: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    calendars: [{ type: mongoose.Schema.Types.ObjectId, ref: "Calendar" }],
});

const Calendar = mongoose.model("Calendar", CalendarSchema);

export default Calendar;