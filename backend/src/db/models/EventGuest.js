import mongoose from "mongoose";

const Schema = mongoose.Schema;

const EventGuestSchema = new Schema({
    isInviteAccepted: { type: Boolean, default: false },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
});
const EventGuest = mongoose.model("EventGuest", EventGuestSchema);

export default EventGuest;
