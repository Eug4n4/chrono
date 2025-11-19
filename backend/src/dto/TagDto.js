import Tag from "../models/Tag.js";

class TagDto {
    id;
    name;

    /**
     * @param {Tag} tag
     */
    constructor(tag) {
        this.id = tag._id;
        this.name = tag.name;
    }

    toSelect() {
        return {
            id: this.id,
            name: this.name,
        };
    }
}

export default TagDto;
