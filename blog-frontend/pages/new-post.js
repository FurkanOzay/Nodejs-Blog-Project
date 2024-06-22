import { useState } from 'react'; 
import dynamic from 'next/dynamic'; 
import { useRouter } from 'next/router'; 
import 'react-quill/dist/quill.snow.css'; 
import { Box, Button, Container, TextField, Typography } from '@mui/material'; 


const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const NewPost = () => {
  const [title, setTitle] = useState(''); 
  const [content, setContent] = useState(''); 
  const router = useRouter(); 

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    console.log('Form submitted');
    console.log('Title:', title);
    console.log('Content:', content);

    try {
      const res = await fetch('/api/blogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content, authorId: 1, categoryId: 1 }), 
      });
      console.log('Response status:', res.status);

      if (res.ok) {
        const data = await res.json();
        console.log('Post created successfully:', data);
        router.push('/'); 
      } else {
        console.error('Failed to create post:', res.statusText);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <Container maxWidth="sm"> {}
      <Box
        sx={{
          mt: 4,
          p: 3,
          border: '1px solid #ddd',
          borderRadius: 2,
          boxShadow: 2,
          backgroundColor: '#f9f9f9',
        }}
      >
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
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Create Post
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default NewPost;
