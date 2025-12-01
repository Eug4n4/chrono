import api from "../api";

class CalendarService {
    static async createCalendar(data) {
        return api.post("/calendar", data);
    }

    static async getCalendars() {
        return api.get("/calendar");
    }

    static async getCalendarByEventId(eventId) {
        return api.get(`calendar/${eventId}`);
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

    static async getGuests(calendarId) {
        return api.get(`/calendar/${calendarId}/guests`);
    }

    static async removeGuest(calendarId, userId) {
        return api.delete(`/calendar/${calendarId}/guests/${userId}`);
    }

    static async leaveCalendar(calendarId) {
        return api.post(`/calendar/${calendarId}/leave`);
    }
}

export default CalendarService;
