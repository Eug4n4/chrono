import { body, param } from "express-validator";

const nameValidator = body("name").exists().isString();
const descriptionValidator = body("description").exists().isString();
const idValidator = param("id").exists().isMongoId();

export { nameValidator, descriptionValidator, idValidator };
