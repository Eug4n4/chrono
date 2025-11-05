import mongoose from "mongoose";

const EventSchema = new mongoose.Schema({
    name: String,
    start: Date,
    end: Date,
    type: { type: String, enum: ["meeting", "task", "reminder"] },
    calendarId: { type: mongoose.Schema.Types.ObjectId, ref: "Calendar" },
    tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tag" }],
});

const Event = mongoose.model("Event", EventSchema);

export default Event;