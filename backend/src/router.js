import express from 'express';
import authRouter from "./auth/router.js"
import holidaysRouter from "./holidays/router.js"
const router = express.Router()


router.use("/auth", authRouter);
router.use("/holidays", holidaysRouter);

export default router;