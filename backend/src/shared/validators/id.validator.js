import { body, param } from "express-validator";

const mongoIdValidator = (paramName, place) => {
    let validator;
    switch (place) {
        case "body":
            validator = body;
            break;
        case "param":
            validator = param;
            break;
        default:
            validator = body;
            break;
    }
    return validator(paramName).exists().isMongoId();
};

export { mongoIdValidator };
