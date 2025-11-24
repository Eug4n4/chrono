import { body } from "express-validator";
import jwt from "jsonwebtoken";

const emailValidator = body("email").exists().isEmail();
const passwordValidator = body("password")
    .exists()
    .isLength({ min: 8 })
    .withMessage("Must be at least 8 characters long");

const common = [
    body("login")
        .exists()
        .withMessage("Login is required")
        .matches(/(^[\w.]+@(?:\w{2,}\.)+\w{2,}$)|(^\w+$)/)
        .withMessage("Login is invalid"),
    passwordValidator,
];

const registerValidator = [
    ...common,
    emailValidator,
    body("repeat_password")
        .exists()
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error("Passwords didn't match");
            }
            return true;
        }),
    body("countryCode")
        .exists()
        .isString()
        .isLength({ min: 2, max: 2 })
        .withMessage("Provide country code value"),
];

const loginValidator = [...common];

function tokenMustBeValid(paramName) {
    return (req, res, next) => {
        if (paramName) {
            try {
                const payload = jwt.verify(
                    req.params[paramName],
                    process.env.JWT_SECRET,
                );
                req.tokenPayload = payload;
                next();
            } catch (e) {
                return res.status(400).json({ message: "Token is invalid" });
            }
        }
    };
}

export {
    registerValidator,
    loginValidator,
    emailValidator,
    passwordValidator,
    tokenMustBeValid,
};
