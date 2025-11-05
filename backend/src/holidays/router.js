import express from 'express';
import {getHolidays} from './holidays.controller.js';

const router = express.Router()

router.get('/', getHolidays);

export default router;