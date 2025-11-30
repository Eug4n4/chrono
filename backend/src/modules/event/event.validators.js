import { body, param } from "express-validator";

const idValidator = body("eventId").exists().isString();
const paramIdValidator = param("eventId").exists().isMongoId();
export { paramIdValidator, idValidator };
