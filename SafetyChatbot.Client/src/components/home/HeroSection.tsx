import React from 'react';
import {
    Box,
    Typography,
    Button,
    Container,
    Grid,
    useTheme,
    useMediaQuery
} from '@mui/material';
import { ShieldCheck, MessageSquare, AlertCircle } from 'lucide-react';
import { Link as RouterLink } from 'react-router-dom';
import Cookies from 'js-cookie';

const HeroSection: React.FC = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const token = Cookies.get('token');
    const isAuthenticated = Boolean(token);

    return (
        <Box
            sx={{
                backgroundImage: 'linear-gradient(rgba(33, 61, 115, 0.8), rgba(32, 36, 83, 0.85)), url(../ius2.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                color: 'white',
                position: 'relative',
            }}
        >
            <Container maxWidth="lg">
                <Grid container spacing={3} alignItems="center">
                    <Grid item xs={12} md={7}>
                        <Box sx={{ maxWidth: 650 }}>
                            <Typography
                                variant={isMobile ? "h3" : "h1"}
                                component="h1"
                                fontWeight={800}
                                gutterBottom
                                sx={{
                                    textShadow: '0 2px 10px rgba(0,0,0,0.3)',
                                    animation: 'fadeInUp 0.8s ease-out'
                                }}
                            >
                                International University of Sarajevo Campus Safety Chatbot
                            </Typography>
                            <Typography
                                variant="h6"
                                paragraph
                                sx={{
                                    mb: 4,
                                    opacity: 0.9,
                                    fontWeight: 400,
                                    animation: 'fadeInUp 1s ease-out',
                                    '@keyframes fadeInUp': {
                                        '0%': {
                                            opacity: 0,
                                            transform: 'translateY(20px)'
                                        },
                                        '100%': {
                                            opacity: 1,
                                            transform: 'translateY(0)'
                                        }
                                    }
                                }}
                            >
                                A 24/7 AI-driven platform providing real-time safety guidance, incident reporting, and emergency protocols for the IUS community.
                            </Typography>
                            <Box
                                sx={{
                                    display: 'flex',
                                    gap: 2,
                                    flexWrap: { xs: 'wrap', sm: 'nowrap' },
                                    animation: 'fadeInUp 1.2s ease-out'
                                }}
                            >
                                <Button
                                    variant="contained"
                                    color="warning"
                                    size="large"
                                    component={RouterLink}
                                    to={isAuthenticated ? "/chat" : "https://localhost:7084/signin"}
                                    sx={{
                                        px: 4,
                                        py: 1.5,
                                        fontWeight: 600,
                                        transition: 'all 0.3s',
                                        '&:hover': {
                                            transform: 'translateY(-3px)',
                                            boxShadow: '0 10px 25px rgba(233, 173, 53, 0.4)'
                                        }
                                    }}
                                >
                                    Ask Safety Chatbot
                                </Button>
                                <Button
                                    variant="outlined"
                                    size="large"
                                    component={RouterLink}
                                    to={isAuthenticated ? "/report" : "https://localhost:7084/signin"}
                                    sx={{
                                        px: 4,
                                        py: 1.5,
                                        fontWeight: 600,
                                        borderColor: 'white',
                                        color: 'white',
                                        '&:hover': {
                                            borderColor: 'white',
                                            bgcolor: 'rgba(255, 255, 255, 0.1)'
                                        }
                                    }}
                                >
                                    Report Incident
                                </Button>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={5} sx={{ display: { xs: 'none', md: 'block' } }}>
                        <Box sx={{
                            bgcolor: 'rgba(255, 255, 255, 0.1)',
                            backdropFilter: 'blur(10px)',
                            borderRadius: 3,
                            p: 3,
                            boxShadow: '0 15px 35px rgba(0, 0, 0, 0.2)',
                            animation: 'fadeIn 1.5s ease-out',
                            '@keyframes fadeIn': {
                                '0%': {
                                    opacity: 0,
                                },
                                '100%': {
                                    opacity: 1,
                                }
                            }
                        }}>
                            <Typography variant="h5" fontWeight={600} gutterBottom>
                                Key Features
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2.5, mt: 3 }}>
                                <Box sx={{ bgcolor: 'warning.main', p: 1, borderRadius: 2 }}>
                                    <ShieldCheck color="#000" size={24} />
                                </Box>
                                <Box>
                                    <Typography variant="body1" fontWeight={600}>
                                        Real-Time Safety Assistance
                                    </Typography>
                                    <Typography variant="body2" sx={{ opacity: 0.8 }}>
                                        Instant guidance for emergency situations
                                    </Typography>
                                </Box>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2.5 }}>
                                <Box sx={{ bgcolor: 'warning.main', p: 1, borderRadius: 2 }}>
                                    <AlertCircle color="#000" size={24} />
                                </Box>
                                <Box>
                                    <Typography variant="body1" fontWeight={600}>
                                        Smart Incident Reporting
                                    </Typography>
                                    <Typography variant="body2" sx={{ opacity: 0.8 }}>
                                        Submit reports with detailed tracking and severity tags
                                    </Typography>
                                </Box>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Box sx={{ bgcolor: 'warning.main', p: 1, borderRadius: 2 }}>
                                    <MessageSquare color="#000" size={24} />
                                </Box>
                                <Box>
                                    <Typography variant="body1" fontWeight={600}>
                                        Natural Language Communication
                                    </Typography>
                                    <Typography variant="body2" sx={{ opacity: 0.8 }}>
                                        Intuitive conversations with our AI assistance
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default HeroSection;