import pool from '../config/db.js';

export const createTag = async (name) => {
    const [result] = await pool.query('INSERT INTO tags (name) VALUES (?)', [name]);
    return { id: result.insertId, name };
};

export const getTagByName = async (name) => {
    const [rows] = await pool.query('SELECT * FROM tags WHERE name = ?', [name]);
    return rows[0];
};

export const getAllTags = async () => {
    const [rows] = await pool.query('SELECT * FROM tags');
    return rows;
};

export const addTagToBlogPost = async (blogPostId, tagId) => {
    await pool.query('INSERT INTO blog_post_tags (blog_post_id, tag_id) VALUES (?, ?)', [blogPostId, tagId]);
};
