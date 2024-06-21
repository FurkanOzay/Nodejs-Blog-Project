import pool from '../config/db.js';

export const createBlogPost = async (blogPost) => {
    const { title, content, authorId, categoryId, imagePath } = blogPost;
    const [result] = await pool.query(
        'INSERT INTO blog_posts (title, content, author_id, category_id, image_path) VALUES (?, ?, ?, ?, ?)',
        [title, content, authorId, categoryId, imagePath]
    );
    return result.insertId;
};

export const getBlogPostById = async (id) => {
    const [rows] = await pool.query(
        'SELECT * FROM blog_posts WHERE id = ?',
        [id]
    );
    return rows[0];
};

export const getAllBlogPosts = async () => {
    const [rows] = await pool.query('SELECT * FROM blog_posts');
    return rows;
};
