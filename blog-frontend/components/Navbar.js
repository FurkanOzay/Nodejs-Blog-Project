import React from 'react';
import Link from 'next/link';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';

const Navbar = () => {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Blog
                </Typography>
                <Box sx={{ display: 'flex', gap : 2 }}>
                    <Button color="inherit" component={Link} href="/">
                        Home
                    </Button>
                    <Button color="inherit" component={Link} href="/new-post">
                        New Post
                    </Button>
                    <Button color="inherit" component={Link} href="/new-categories">
                        Categories
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;