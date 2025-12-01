import { body, param } from "express-validator";

const stringValidator = (paramName, place) => {
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
    return validator(paramName).isString();
};

export default stringValidator;
