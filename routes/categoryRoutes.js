import express from 'express';
import { addCategory, fetchCategory, fetchAllCategories } from '../controllers/categoryController.js';

const router = express.Router();

router.post('/', addCategory);

router.get('/:id', fetchCategory);

router.get('/', fetchAllCategories);

export default router;