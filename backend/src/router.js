import express from "express";
import authRouter from "./modules/auth/router.js";
import holidaysRouter from "./modules/holidays/router.js";
import calendarRouter from "./modules/calendar/router.js";
import tagRouter from "./modules/tag/router.js";
import eventRouter from "./modules/event/router.js";
import usersRouter from "./modules/users/router.js";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/users", usersRouter);
router.use("/holidays", holidaysRouter);
router.use("/calendar", calendarRouter);
router.use("/event", eventRouter);
router.use("/tag", tagRouter);

export default router;
