import pool from '../config/db.js';

export const createTag = async (name) => {
    const [result] = await pool.query(
        'INSERT INTO tags VALUES (?)',
        [name]
    );
    return result.insertId;
};

export const getTagById = async (id) => {
    const [rows] = await pool.query(
        'SELECT * FROM tags WHERE id = ? ',
        [id]
    ); 
};

export const getAllTags = async () => {
    const [rows] = await pool.query('SELECT * FROM tags');
    return rows;
}