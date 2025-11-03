import express from 'express';
import {getHolidays} from './holidays.js';

const router = express.Router()

router.get('/', getHolidays);

export default router;