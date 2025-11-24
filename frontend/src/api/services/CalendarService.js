// frontend/src/api/services/CalendarService.js
import api from "../api";

class CalendarService {
    static async createCalendar(data) {
        return api.post("/calendar", data);
    }

    static async getCalendars() {
        return api.get("/calendar");
    }

    static async deleteCalendar(calendarId) {
        return api.delete(`/calendar/${calendarId}`);
    }

    static async addSharedEvent(calendarId, eventId) {
        return api.post("/calendar/add-shared-event", { calendarId, eventId });
    }
}

export default CalendarService;
