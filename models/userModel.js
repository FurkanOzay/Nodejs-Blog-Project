import pool from '../config/db.js';
import bcrypt from 'bcryptjs';

export const createUser = async (user) => {
    const { username, email, password } = user;
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('hashedPassword:', hashedPassword);
    const [result] = await pool.query(
        'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
        [username, email, hashedPassword]
    );
    return result.insertId;
};

export const getUserByEmail = async (email) => {
    const [rows] = await pool.query(
        'SELECT * FROM users WHERE email = ?',
        [email]
    );
    return rows[0];
};

export const validatePassword = async (inputPassword, storedPassword) => {
    return await bcrypt.compare(inputPassword, storedPassword);
};
