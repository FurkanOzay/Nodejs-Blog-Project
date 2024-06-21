import jwt from 'jsonwebtoken';
import { createUser, getUserByEmail, validatePassword } from '../models/userModel.js';
import dotenv from 'dotenv';

dotenv.config();

const secretKey = process.env.SECRET_KEY;
console.log('secretKey:', secretKey); // Log ekleyin

export const registerUser = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const userExists = await getUserByEmail(email);
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const userId = await createUser({ username, email, password });
        res.status(201).json({ message: 'User created successfully', userId });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        console.log('email:', email);
        console.log('password:', password);

        const user = await getUserByEmail(email);
        console.log('user:', user);

        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        const isPasswordValid = await validatePassword(password, user.password);
        console.log('isPasswordValid:', isPasswordValid);

        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: '1h' });
        console.log('token:', token);

        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};
