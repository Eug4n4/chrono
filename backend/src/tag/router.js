import express from 'express';
import {createTag} from "./tag.controller.js";

const router = express.Router()

router.post('/', createTag);

export default router;