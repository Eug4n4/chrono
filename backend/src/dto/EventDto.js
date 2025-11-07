import Event from "../models/Event.js";

class EventDto {
    id
    name
    start
    end
    tags

    /**
     * @param {Event} event
     */
    constructor(event) {
        this.id = event.id;
        this.name = event.name;
        this.start = event.start;
        this.end = event.end;
        this.tags = event.tags;
    }
}

export default EventDto;