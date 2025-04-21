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


            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    minHeight: '100vh',
                    p: 2,
                }}
            >
                {/* Main white box */}
                <Box
                    sx={{
                        width: { xs: '100%', md: '1208px' }, // Full width on mobile, 1208px on desktop
                        backgroundColor: 'white',
                        borderRadius: 10,
                        boxShadow: 3,
                        overflow: 'hidden',
                        marginTop: '40px'// Ensures the header corners stay rounded
                    }}
                >
                    {/* Dark blue header */}
                    <Box
                        sx={{
                            height: '100px',
                            backgroundColor: 'blue2.main', // Using your theme's dark blue
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Typography
                            variant="h2"
                            sx={{
                                color: 'white',
                                fontFamily: '"Jersey 25"',

                            }}
                        >
                            Admin Dashboard
                        </Typography>
                    </Box>

                    {/* Content area */}
                    <Box sx={{ p: 4 }}>
                        {/* Your admin content goes here */}
                        <Typography>This is where your admin content will appear</Typography>
                    </Box>
                </Box>
            </Box>

        </Box>
    );
};

export default AdminPage;
