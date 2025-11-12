// frontend/src/api/services/CalendarService.js
import api from "../api";

class CalendarService {
    static async createCalendar(data) {
        return api.post("calendar", data);
    }

    static async getCalendars() {
        return api.get("calendar");
    }
}

export default CalendarService;
