import express from "express";
import { authenticate } from "../auth/auth.middleware.js";
import upload from "./avatars.js";
import { updateUser, uploadAvatar } from "./users.controller.js";
import stringValidator from "../../shared/validators/string.validator.js";

const router = express.Router();

router.patch(
    "/",
    authenticate,
    upload.single("avatar"),
    stringValidator("login", "body"),
    stringValidator("countryCode", "body").isLength({ min: 2, max: 2 }),
    updateUser,
);

export default router;
