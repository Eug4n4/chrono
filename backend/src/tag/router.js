import express from 'express';
import {createTag} from "./tag.controller.js";
import validationErrors from "../validators/catch.errors.js";
import {authenticate} from "../midlewear/auth.midelwear.js";

const router = express.Router()

router.post('/', authenticate, validationErrors, createTag);

export default router;