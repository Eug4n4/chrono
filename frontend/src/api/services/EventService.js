import api from "../api";

class EventService {
    static async getEventsForCalendar(calendarId, year) {
        return api.get(`/calendar/${calendarId}/events`, { params: { year } });
    }

    static async createEvent(calendarId, data) {
        return api.post(`/calendar/${calendarId}/events`, data);
    }

    static async sendInvite(email, eventId) {
        return api.post(`event/invite`, { email: email, eventId: eventId });
    }

    static async updateEvent(eventId, data) {
        return api.put(`/event/${eventId}`, data);
    }

    static async deleteEvent(eventId) {
        return api.delete(`/event/${eventId}`);
    }
}

export default EventService;
