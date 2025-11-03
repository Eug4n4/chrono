import mongoose from "mongoose";

const CalendarSchema = new mongoose.Schema({
    name: String,
    description: String,
    guests: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    events: [{ type: mongoose.Schema.Types.ObjectId, ref: "Event" }],
});

const Calendar = mongoose.model("Calendar", CalendarSchema);

export default Calendar;