import { generateInviteLink } from "./event.utils.js";
import { matchedData } from "express-validator";
import EmailManager from "../mail/EmailManager.js";
import User from "../../db/models/User.js";
import EventGuest from "../../db/models/EventGuest.js";

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
    const link = generateInviteLink(eventId);
    EmailManager.getInstance().sendEventInvitation(link, email);
    const invite = await EventGuest.findOne({
        user: user._id,
    });
    if (invite === null) {
        await new EventGuest({ user: user._id }).save();
        return res.sendStatus(204);
    } else {
        return res.status(400).json({
            message: `You have already sent invite to ${email}`,
        });
    }
}

export { sendInvite };
