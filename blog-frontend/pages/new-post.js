import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import 'react-quill/dist/quill.snow.css';
import { Box, Button, Container, TextField, Typography, Select, MenuItem, InputLabel, FormControl, Chip } from '@mui/material';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const NewPost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState('');
  const [allTags, setAllTags] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchCategoriesAndTags = async () => {
      try {
        const [categoriesRes, tagsRes] = await Promise.all([
          fetch('/api/categories'),
          fetch('/api/tags')
        ]);
        const [categoriesData, tagsData] = await Promise.all([
          categoriesRes.json(),
          tagsRes.json()
        ]);
        setCategories(categoriesData);
        setAllTags(tagsData);
      } catch (error) {
        console.error('Error fetching categories and tags:', error);
      }
    };
    fetchCategoriesAndTags();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/blogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title,
          content,
          authorId: 1, // Örnek olarak verildi, gerçek değeri güncellemeyi unutmayın
          categoryId: selectedCategory,
          tags: tags
        })
      });
      if (res.ok) {
        router.push('/');
      } else {
        console.error('Failed to create post');
      }
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  const handleAddTag = () => {
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
      setNewTag('');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Create New Post
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box mb={2}>
            <TextField
              fullWidth
              label="Title"
              variant="outlined"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </Box>
          <Box mb={2}>
            <Typography variant="h6" component="label">
              Content:
            </Typography>
            <ReactQuill value={content} onChange={setContent} />
          </Box>
          <Box mb={2}>
            <FormControl fullWidth>
              <InputLabel id="category-label">Category</InputLabel>
              <Select
                labelId="category-label"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                required
              >
                {categories.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box mb={2}>
            <TextField
              fullWidth
              label="Add Tag"
              variant="outlined"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddTag();
                }
              }}
            />
            <Button onClick={handleAddTag} sx={{ mt: 1 }}>
              Add Tag
            </Button>
            <Box sx={{ mt: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {tags.map((tag, index) => (
                <Chip key={index} label={tag} onDelete={() => setTags(tags.filter(t => t !== tag))} />
              ))}
            </Box>
          </Box>
          <Box mb={2}>
            <FormControl fullWidth>
              <InputLabel id="all-tags-label">Select Tags</InputLabel>
              <Select
                labelId="all-tags-label"
                multiple
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )}
              >
                {allTags.map((tag) => (
                  <MenuItem key={tag.id} value={tag.name}>
                    {tag.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Create Post
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default NewPost;
