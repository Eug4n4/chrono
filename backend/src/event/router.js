import express from 'express';
import {createEvent} from './event.controller.js';
import validationErrors from "../validators/catch.errors.js";

const router = express.Router()

router.post('/', validationErrors, createEvent);

export default router;