import cron from "node-cron";
import Event from "../../db/models/Event.js";
import NotificationService from "../notifications/NotificationService.js";

class SchedulerService {
    static tasks = new Map();

    static async init() {
        console.log("Initializing Scheduler Service...");
        try {
            const events = await Event.find({
                type: "reminder",
                isNotified: false,
            });

            console.log(`Found ${events.length} pending reminders.`);
            for (const event of events) {
                this.scheduleEvent(event);
            }
        } catch (error) {
            console.error("Error initializing scheduler:", error);
        }
    }

    static scheduleEvent(event) {
        if (event.type !== "reminder" || !event.remindAfter) return;

        const eventId = event._id.toString();

        this.cancelEvent(eventId);

        const remindDate = new Date(event.remindAfter);
        const now = new Date();

        if (remindDate <= now) {
            this.triggerNotification(event);
            return;
        }

        const task = cron.schedule(
            `${remindDate.getMinutes()} ${remindDate.getHours()} ${remindDate.getDate()} ${remindDate.getMonth() + 1} *`,
            () => {
                this.triggerNotification(event);
            },
        );

        this.tasks.set(eventId, task);
    }

    static cancelEvent(eventId) {
        if (this.tasks.has(eventId)) {
            this.tasks.get(eventId).stop();
            this.tasks.delete(eventId);
        }
    }

    static async triggerNotification(event) {
        const eventId = event._id.toString();

        try {
            await NotificationService.sendReminderEmail(eventId);

            await Event.findByIdAndUpdate(eventId, { isNotified: true });

            this.cancelEvent(eventId);
        } catch (error) {
            console.error(
                `Failed to process notification for event ${eventId}`,
                error,
            );
        }
    }
}

export default SchedulerService;
