import { generateInviteLink } from "./event.utils.js";
import { matchedData } from "express-validator";
import EmailManager from "../mail/EmailManager.js";
import User from "../../db/models/User.js";
import EventGuest from "../../db/models/EventGuest.js";
import Event from "../../db/models/Event.js";

async function sendInvite(req, res) {
    const { eventId, email } = matchedData(req);
    const user = await User.findOne({ email: email });
    if (user === null) {
        return res
            .status(400)
            .json({ message: `There is no user with email ${email}` });
    }
    if (email === req.user.email) {
        return res.status(400).json({ message: "You can't invite yourself" });
    }
    const event = await Event.findOne({ _id: eventId }).populate("guests");
    const invite = event?.guests.find((guest) => guest.user.equals(user._id));
    if (invite !== undefined) {
        return res.status(400).json({
            message: `You have already sent invite to ${email}`,
        });
    }
    const eventGuest = await EventGuest.create({ user: user._id });
    await Event.updateOne(
        { _id: eventId },
        { $addToSet: { guests: eventGuest._id } },
    );
    const link = generateInviteLink(eventId);
    EmailManager.getInstance().sendEventInvitation(link, email);

    return res.sendStatus(204);
}

export { sendInvite };
