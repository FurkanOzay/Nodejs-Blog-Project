import {createCategory , getCategoryById, getAllCategories} from '../models/categoryModel.js';

export const addCategory = async (req,res) => {
    const {name}= req.body;
    try {
        const categoryId = await createCategory(name);
        res.status(201),json({ message: 'Category created successfully', categoryId});
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

export const fetchCategory = async (req,res) => {
    const { id } = req.params;
    try {
        const category = await getCategoryById(id);
        if(!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
}



export const fetchAllCategories = async (req,res) => {
    try {
        const categories = await getAllCategories();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};