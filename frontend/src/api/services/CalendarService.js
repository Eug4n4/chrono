import api from "../api";

class CalendarService {
    static async createCalendar(data) {
        return api.post("/calendar", data);
    }

    static async getCalendars() {
        return api.get("/calendar");
    }

    static async updateCalendar(id, data) {
        return api.patch(`/calendar/${id}`, data);
    }

    static async deleteCalendar(calendarId) {
        return api.delete(`/calendar/${calendarId}`);
    }

    static async addSharedEvent(calendarId, eventId) {
        return api.post("/calendar/add-shared-event", { calendarId, eventId });
    }

    static async inviteUser(calendarId, email) {
        return api.post("/calendar/invite", { calendarId, email });
    }

    static async respondToInvite(token, action) {
        return api.post("/calendar/invite/respond", { token, action });
    }
}

export default CalendarService;
