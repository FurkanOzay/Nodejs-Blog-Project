import express from 'express';
import { addBlogPost, fetchBlogPost, fetchAllBlogPosts } from '../controllers/blogController.js';
import upload from '../middleware/upload.js';

const router = express.Router();

router.post('/', addBlogPost);
router.get('/:id', fetchBlogPost);
router.get('/', fetchAllBlogPosts);

router.post('/upload', upload.single('image'), (req,res) => {
    if(!req.file) {
        return res.status(400).json({ message: 'Please upload a file' });
    }
    res.status(200).json({ message: 'File uploaded succesfully', filePath: req.file.path });
});

export default router;