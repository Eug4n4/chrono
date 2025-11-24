import { body } from "express-validator";

const idValidator = body("eventId").exists().isString();

export { idValidator };
