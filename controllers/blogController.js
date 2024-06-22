import { createBlogPost, getBlogPostById, getAllBlogPosts } from '../models/blogModel.js';
import { createTag, getTagByName, addTagToBlogPost } from '../models/tagModel.js';

export const addBlogPost = async (req, res) => {
    const { title, content, authorId, categoryId, tags } = req.body;
    let imagePath = null;
    if (req.file) {
        imagePath = req.file.path;
    }
    try {
        console.log('Adding blog post:', { title, content, authorId, categoryId, imagePath });
        const blogPostId = await createBlogPost({ title, content, authorId, categoryId, imagePath });

        // Etiketleri işleme
        for (const tag of tags) {
            let tagRecord = await getTagByName(tag);
            if (!tagRecord) {
                tagRecord = await createTag(tag);
            }
            await addTagToBlogPost(blogPostId, tagRecord.id);
        }

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
