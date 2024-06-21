import { createBlogPost, getBlogPostById, getAllBlogPosts } from '../models/blogModel.js';

export const addBlogPost = async (req, res) => {
    const { title, content, authorId, categoryId } = req.body;
    let imagePath = null;
    if (req.file) {
        imagePath = req.file.path;
    }
    try {
        console.log('Adding blog post:', { title, content, authorId, categoryId, imagePath });
        const blogPostId = await createBlogPost({ title, content, authorId, categoryId, imagePath });
        res.status(201).json({ message: 'Blog post created successfully', blogPostId });
    } catch (error) {
        console.error('Error creating blog post:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};

export const fetchBlogPost = async (req, res) => {
    const { id } = req.params;
    try {
        const blogPost = await getBlogPostById(id);
        if (!blogPost) {
            return res.status(404).json({ message: 'Blog post not found' });
        }
        res.status(200).json(blogPost);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

export const fetchAllBlogPosts = async (req, res) => {
    try {
        const blogPosts = await getAllBlogPosts();
        res.status(200).json(blogPosts);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
