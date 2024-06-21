import { createTag, getTagById, getAllTags } from '../models/tagModel.js';

export const addTag = async (req,res) => {
    const { name } = req.body;
    try {
        const tagId = await createTag(name);
        res.status(201).json({ message: 'Tag created succesfully', tagId });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

export const fetchTag = async (req,res) => {
    const { id } = req.params;
    try {
        const tag = await getTagById(id);
        if(!tag){
            return res.status(404).json({ message: 'Tag not found' });
        }
        res.status(200).json(tag);
    } catch (error) {
        res.status(500).json({  message: 'Server error', error });
    }
};

export const fetchAllTags = async (req,res) => {
    try {
        const tags = await getAllTags();
        res.status(200).json(tags);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};