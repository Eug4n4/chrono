import express from "express";
import { authenticate } from "../middleware/auth.middleware.js";
import upload from "./avatars.js";
import { uploadAvatar } from "./users.controller.js";

const router = express.Router();

router.patch("/avatar", authenticate, upload.single("avatar"), uploadAvatar);

export default router;
