import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';


const Banner = () => {
    return (
        <Box
            sx={{
                bgcolor: 'golden.main',
                color: 'white',
                display: 'flex',
                justifyContent: 'center',
                py: { xs: 1, md: 2 },
                px: { xs: 2, md: 4 },
                textAlign: 'center'
            }}
        >        
                <Box
                    component="img"
                    src="/alert_2.png"
                    alt="alert Icon"
                sx={{
                        pr: 2,
                        height: { xs: '24px', md: '36px', lg: '40px' }, // Smaller icon on mobile
                        width: 'auto',

                    }}
                />
                
           <Typography
                variant="h2"
                sx={{
                    fontSize: {
                        xs: '1rem',  // Mobile
                        sm: '1.25rem',    // Small tablets
                        md: '1.50rem',   // Tablets
                        lg: '1.75rem'       // Desktop
                    },
                    fontWeight: 500,
                    lineHeight: 1.3,
                    maxWidth: '1200px',
                   
                }}
            >
                Real-time alerts, emergency guidance, and secure incident reporting at your fingertips.
            </Typography>
            
        </Box>
    );
};

export default Banner;