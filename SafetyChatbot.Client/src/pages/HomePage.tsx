import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Banner from '../components/Banner';

const HomePage = () => {
    return (
        <Box sx={{ minHeight: '100vh' }}>
            <Header />
            <Banner />

            <Box
                sx={{
                    marginX: { xs: 2, sm: 4, md: 8, lg: '170px' }, // Responsive margins
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: { xs: '50vh', md: '100vh' }, // Smaller height on mobile
                    px: { xs: 1, sm: 2, md: 4 }, // Responsive padding
                    py: { xs: 4, md: 0 } // Vertical padding on mobile
                }}
            >
                {/* Main container */}
                <Box
                    sx={{
                        display: 'flex',
                        gap: { xs: 4, md: 8 }, // Smaller gap on mobile
                        maxWidth: '1200px',
                        width: '100%',
                        flexDirection: { xs: 'column', md: 'row' }
                    }}
                >
                    {/* LEFT BOX - Stacked text */}
                    <Box sx={{
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: { xs: 2, md: 4 }, // Smaller gap on mobile
                        textAlign: { xs: 'center', md: 'left' }, // Centered on mobile
                        justifyContent: 'center'
                    }}>
                        {/* Text Box 1 */}
                        <Box>
                            <Typography
                                variant="h4"
                                sx={{
                                    fontFamily: '"Jersey 25"',
                                    color: 'white',
                                    lineHeight: 1.2,
                                    fontSize: {
                                        xs: '1.5rem', sm: '1.75rem', md: '2rem', lg: '80px' } // Responsive font
                                }}
                            >
                                Welcome to the IUS Campus Safety Chatbot
                            </Typography>
                        </Box>

                        {/* Text Box 2 */}
                        <Box>
                            <Typography
                                variant="h1"
                                sx={{
                                    fontFamily: '"Jersey 20"',
                                    color: 'white',
                                    lineHeight: 1.5,
                                    fontSize: { xs: '1.75rem', sm: '2rem', md: '2.5rem', lg: '36px' } // Responsive font
                                }}
                            >
                                Your 24/7 available companion for emergency guidance!
                            </Typography>
                        </Box>
                    </Box>

                    {/* RIGHT BOX - Large button */}
                    <Box sx={{
                        flex: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: { xs: 'center', md: 'flex-end' },
                        mt: { xs: 2, md: 0 } // Margin top on mobile only
                    }}>
                        <Button
                            variant="contained"
                            component={Link}
                            to="/chat"
                            sx={{
                                bgcolor: 'primary_red.main',
                                fontFamily: '"Jersey 25"',
                                color: 'white',
                                fontSize: { xs: '1.25rem', md: '1.5rem' }, // Responsive font
                                py: { xs: 2, md: 3 }, // Responsive padding
                                px: { xs: 4, md: 6 }, // Responsive padding
                                borderRadius: 2,
                                width: { xs: '100%', sm: 'auto' }, // Full width on mobile
                                '&:hover': {
                                    bgcolor: 'severity_red.main',
                                    transform: 'scale(1.02)'
                                },
                                transition: 'all 0.3s ease'
                            }}
                        >
                            <Box
                                component="span"
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: { xs: 1, md: 2 } // Smaller gap on mobile
                                }}
                            >
                                <Box
                                    component="img"
                                    src="/bot.png"
                                    alt="Chatbot Icon"
                                    sx={{
                                        height: { xs: '24px', md: '32px' }, // Smaller icon on mobile
                                        width: 'auto',
                                        filter: 'brightness(0) invert(1)'
                                    }}
                                />
                                CHAT NOW
                            </Box>
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default HomePage;