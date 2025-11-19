import api from "../api";

class CreateEventService {
    static async createEvent(calendar_id, body) {
        return api.post(`/calendars/${calendar_id}`, body);
    }

    async getAllTags() {
        return api.get("tag");
    }
}

export default new CreateEventService;