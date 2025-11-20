import api from "../api";

class TagService {
    async getAllTags() {
        return api.get("tag");
    }
}

export default new TagService;