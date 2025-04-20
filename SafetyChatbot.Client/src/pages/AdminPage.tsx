import { Box, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import React from 'react';
import Header from '../components/Header'
import Banner from '../components/Banner';

const AdminPage = () => {
    return (
        <Box sx={{ minHeight: '100vh' }}>
            <Header />
            <Banner />

            <Typography> It is admiiin</Typography>


            
        </Box>
    );
};

export default AdminPage;