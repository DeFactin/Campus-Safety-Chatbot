import { Box, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Banner from '../components/Banner';
import React from 'react';

const HomePage = () => {
    return (
        <Box sx={{ minHeight: '100vh' }}>
            <Header />
            <Banner />

            <Box
                sx={{
                    marginX: '170px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '100vh',
                    px: 4
                }}
            >
                {/* Main container */}
                <Box
                    sx={{
                        display: 'flex',
                        gap: 8,
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
                        gap: 4,
                        textAlign: 'left',
                        justifyContent: 'center'
                    }}>
                        {/* Text Box 1 */}
                        <Box>
                            <Typography
                                variant="h4"
                                sx={{
                                    fontFamily: '"Jersey 25"',
                                    color: 'white',
                                    lineHeight: 1.2
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
                                    lineHeight: 1.5
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
                        justifyContent: { xs: 'center', md: 'flex-end' }
                    }}>
                        <Button
                            variant="contained"
                            component={Link}
                            to="/chat"
                            sx={{
                                bgcolor: 'primary_red.main',
                                fontFamily: '"Jersey 25"',
                                color: 'white',
                                fontSize: '1.5rem',
                                py: 3,
                                px: 6,
                                borderRadius: 2,
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
                                    gap: 2
                                }}
                            >
                                <Box
                                    component="img"
                                    src="/bot.png"
                                    alt="Chatbot Icon"
                                    sx={{
                                        height: '32px',
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