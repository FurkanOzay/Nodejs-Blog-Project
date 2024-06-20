import pool from '../config/db.js';

export const createCategory = async (name) => {
    const [result] = await pool.query(
        'INSERT INTO categories (name) VALUES (?)',
        [name]
    );
    return result.insertId;
};

export const getCategoryById = async (id) => {
    const [rows] = await pool.query(
        'SELECT * FROM categories WHERE id = ?',
        [id]
    );
};

export const getAllCategories = async () => {
    const [rows] = await pool.query('SELECT * FROM categories');
    return rows;
};