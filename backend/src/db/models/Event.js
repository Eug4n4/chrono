import mongoose from "mongoose";

const options = { discriminatorKey: "type" };

const EventSchema = new mongoose.Schema(
    {
        name: String,
        start: Date,
        color: String,
        tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tag" }],
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        guests: [{ type: mongoose.Schema.Types.ObjectId, ref: "EventGuest" }],
    },
    options,
);
const Event = mongoose.model("Event", EventSchema);

const ArrangementEvent = Event.discriminator(
    "arrangement",
    new mongoose.Schema({ end: Date }),
    options,
);
const ReminderEvent = Event.discriminator(
    "reminder",
    new mongoose.Schema({
        remindAfter: Date,
        isNotified: { type: Boolean, default: false },
    }),
    options,
);
const TaskEvent = Event.discriminator(
    "task",
    new mongoose.Schema({ end: Date, description: String }),
    options,
);

export { ArrangementEvent, ReminderEvent, TaskEvent };
export default Event;
