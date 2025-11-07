import express from 'express';
import {createTag} from "./tag.controller.js";
import validationErrors from "../validators/catch.errors.js";

const router = express.Router()

router.post('/', validationErrors, createTag);

export default router;