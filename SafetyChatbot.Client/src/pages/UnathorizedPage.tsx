import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const UnauthorizedPage = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '80vh',
                textAlign: 'center',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <Typography variant="h3" sx={{ color: 'grey' }}>
                You have no access to this page. Please log in.
            </Typography>
            <Button
                variant="contained"
                sx={{ mt: 3 }}
                component={Link}
                to="/"
            >
                Return to Home
            </Button>
        </Box>
    );
};

export default UnauthorizedPage;
