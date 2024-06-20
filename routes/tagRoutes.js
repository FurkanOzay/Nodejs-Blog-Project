import express from 'express';
import { addTag, fetchTag, fetchAllTags } from '../controllers/tagController.js';


const router = express.Router();

router.post('/', addTag);

router.get('/:id', fetchTag);

router.get('/', fetchAllTags);

export default router;