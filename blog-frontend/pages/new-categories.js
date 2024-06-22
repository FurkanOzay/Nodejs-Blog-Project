import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Box, Button, Container, TextField, Typography, Select, MenuItem, InputLabel, FormControl, Chip } from '@mui/material';


const NewCategory = () => {
  const [name, setName] = useState('');

  const router = useRouter();


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name,
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
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Box>
          

          <Button type="submit" variant="contained" color="primary" fullWidth>
            Create Category
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default NewCategory;
