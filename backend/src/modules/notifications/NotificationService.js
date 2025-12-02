import Event from "../../db/models/Event.js";
import Calendar from "../../db/models/Calendar.js";
import EmailManager from "../mail/EmailManager.js";

class NotificationService {
    static async sendReminderEmail(eventId) {
        try {
            const event = await Event.findById(eventId)
                .populate("owner", "email")
                .populate({
                    path: "guests",
                    populate: { path: "user", select: "email" },
                });

            if (!event) {
                console.error(`Event ${eventId} not found for notification`);
                return;
            }

            const recipients = new Set();

            if (event.owner?.email) {
                recipients.add(event.owner.email);
            }

            if (event.guests?.length > 0) {
                event.guests.forEach((guest) => {
                    if (guest.user?.email) {
                        recipients.add(guest.user.email);
                    }
                });
            }
            const calendar = await Calendar.findOne({
                events: eventId,
            }).populate({
                path: "guests",
                populate: { path: "user", select: "email" },
            });

            if (calendar?.guests?.length > 0) {
                calendar.guests.forEach((guest) => {
                    if (guest.user?.email) {
                        recipients.add(guest.user.email);
                    }
                });
            }

            const emailManager = EmailManager.getInstance();
            const subject = `Reminder: ${event.name}`;

            const now = new Date();
            const start = new Date(event.start);
            const diffMs = start - now;
            const diffMins = Math.round(diffMs / 60000);
            const diffHours = Math.round(diffMs / 3600000);

            let timeString = "";
            if (diffMins < 60) {
                timeString = `in ${diffMins} minutes`;
            } else {
                timeString = `in about ${diffHours} hours`;
            }

            const html = `
                <h3>Event Reminder</h3>
                <p><strong>Event:</strong> ${event.name}</p>
                <p><strong>When:</strong> ${timeString} (${start.toUTCString()})</p>
                <p>This is a reminder for your upcoming event.</p>
            `;

            const emailPromises = Array.from(recipients).map((email) =>
                emailManager.sendNotification(email, subject, html),
            );
            await Promise.all(emailPromises);
        } catch (error) {
            console.error("Error sending reminder email:", error);
        }
    }
}

export default NotificationService;
