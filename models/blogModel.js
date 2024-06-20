import pool from '../config/db.js'

export const createBlogPost = async (blogPost) => {
    const { title, content, authorId, categoryId, image_path} = blogPost;
    const [result] = await pool.query(
        'INSERT INTO blog_post (title, content, author_id, category_id, image_path) VALUES (?, ?, ?, ?, ?)',
        [title, content,authorId, categoryId, image_path]
    );
    return result.insertId;
};

export const getBlogPostById = async (id) => {
    const [rows] = await pool.query('SELECT * FROM blog_post WHERE id = ?',
    [id]
    );
    return rows[0];
};

export const getAllBlogPost = async () => {
    const [rows] = await pool.query('SELECT * FROM blog_post');
    return rows;
};