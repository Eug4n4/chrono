import api from "../api";

class EventService {
    static async getEventsForCalendar(calendarId, year) {
        return api.get(`/calendar/${calendarId}/events`, { params: { year } });
    }

    static async getGuests(eventId) {
        return api.get(`event/${eventId}/guests`);
    }

    static async createEvent(calendarId, data) {
        return api.post(`/calendar/${calendarId}/events`, data);
    }

    static async sendInvite(eventId, email) {
        return api.post(`event/invite`, { email: email, eventId: eventId });
    }

    static async leave(eventId) {
        return api.post(`event/${eventId}/leave`);
    }

    static async updateEvent(eventId, data) {
        return api.put(`/event/${eventId}`, data);
    }

    static async deleteEvent(eventId) {
        return api.delete(`/event/${eventId}`);
    }

    static async removeGuest(eventId, userId) {
        return api.delete(`event/${eventId}/guests/${userId}`);
    }
}

export default EventService;
