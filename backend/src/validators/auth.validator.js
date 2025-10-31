import { body } from "express-validator";

const common = [
    body("login").exists().matches(/\w+/).isLength({ max: 20 }).withMessage("Login is too long"),
    body("password").exists().isLength({ min: 8 }).withMessage("Must be at least 8 characters long")
]

const registerValidator = [
    ...common,
    body("email").exists().isEmail(),
    body("repeat_password").exists().custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error("Passwords didn't match")
        }
        return true;
    })
]

const loginValidator = [
    ...common
]


export { registerValidator, loginValidator }