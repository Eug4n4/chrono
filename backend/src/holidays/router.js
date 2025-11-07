import express from 'express';
import {getHolidays} from './holidays.controller.js';
import validationErrors from "../validators/catch.errors.js";

const router = express.Router()

router.get('/', validationErrors, getHolidays);

export default router;