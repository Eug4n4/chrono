import Tag from "../models/Tag.js";

class TagDto {
    id;
    name;

    /**
     * @param {Tag} tag
     */
    constructor(tag) {
        this.id = tag.id;
        this.name = tag.name;
    }
}

export default TagDto;
