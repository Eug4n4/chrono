import mongoose from "mongoose";

const CalendarGuestSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    isInviteAccepted: { type: Boolean, default: false },
});

const CalendarGuest = mongoose.model("CalendarGuest", CalendarGuestSchema);

export default CalendarGuest;
