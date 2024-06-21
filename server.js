import dotenv from 'dotenv';
import express from 'express';
import userRoutes from './routes/userRoutes.js';
import blogRoutes from './routes/blogRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import tagRoutes from './routes/tagRoutes.js';

dotenv.config();

const app = express();
const port = 3001;

app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/tags', tagRoutes);

app.get('/', (req,res) => {
    res.send("Hello World");
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});