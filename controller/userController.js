import jwt from 'jsonwebtoken';
import { createUser, getUserByEmail } from '../models/userModel.js';


const secretKey = process.env.SECRET_KEY;

export const registerUser = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const userExist = await getUserByEmail(email);
        if(userExist){
            return res.status(400).json({message: 'User already exist'});
        }
        const userId = await createUser({username, email,password});
        res.status(201).json({ message: 'User created successfully', userId});
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
}

export const loginUser = async (req, res) => {
    const {email, password } = req.body;
    try {
        const user = await getUserByEmail(email);
        if(!user) {
            return res.status(400).json({message: 'Invalid mail or password'});
        }
        const isPasswordValid = await validatePassword(password, user.password);
        if(!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: '1h'});
        res.status(200).json({ message: 'Login succesful', token});
    } catch (error) {
        res.status(500).json({message: 'Server error', error});
    }
}