import { useEffect, useState } from "react";
import { Container, Box, Typography, Card, CardContent } from '@mui/material';

const stripHtml = (html) => {
  const temporalDivElement = document.createElement('div');
  temporalDivElement.innerHTML = html;
  return temporalDivElement.textContent || temporalDivElement.innerText || '';
};


const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('/api/blogs');
        const data = await res.json();
        console.log('Fetched posts:', data); // API'den dönen veriyi konsola yazdır
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    fetchPosts();
  }, []);

  return (
    <Container maxWidth="md">
      <Box sx={({ mt:4 })}>
        <Typography variant="h3" component="h3" gutterBottom>
          Blog Post
        </Typography>
        {posts.map((post) => (
          <Card key={post.id} sx={{ mb:3 }}>
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom>
                {post.title}
              </Typography>
              <Typography variant="body1" component="p">
                {stripHtml(post.content)}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Container>
  );

};

export default Home;