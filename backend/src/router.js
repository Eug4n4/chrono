import express from "express";
import authRouter from "./auth/router.js";
import holidaysRouter from "./holidays/router.js";
import calendarRouter from "./calendar/router.js";
import tagRouter from "./tag/router.js";
import eventRouter from "./event/router.js";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/holidays", holidaysRouter);
router.use("/calendar", calendarRouter);
router.use("/event", eventRouter);
router.use("/tag", tagRouter);

export default router;
