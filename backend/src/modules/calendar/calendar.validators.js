import { body, param } from "express-validator";

const nameValidator = body("name").exists().isString();
const descriptionValidator = body("description").exists().isString();
const calendarIdValidator = param("calendar_id").exists().isMongoId();
const userIdValidator = param("user_id").exists().isMongoId();

export {
    nameValidator,
    descriptionValidator,
    calendarIdValidator,
    userIdValidator,
};
