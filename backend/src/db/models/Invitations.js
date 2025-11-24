import mongoose from "mongoose";

const Schema = mongoose.Schema;

const InvitationSchema = new Schema(
    {
        user: { type: Schema.Types.ObjectId, ref: "User", required: true },
        event: { type: Schema.Types.ObjectId, ref: "Event" },
        calendar: { type: Schema.Types.ObjectId, ref: "Calendar" },
    },
    { timestamps: { updatedAt: false } },
);

const Invitations = mongoose.model("Invitations", InvitationSchema);

export default Invitations;
