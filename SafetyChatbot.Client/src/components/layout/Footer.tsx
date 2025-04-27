import React from 'react';
import { Box, Container, Grid, Typography, Link, Divider, IconButton } from '@mui/material';
import { Facebook, Twitter, Instagram, Mail, MapPin, Phone } from 'lucide-react';

const Footer: React.FC = () => {
    return (
        <Box
            sx={{
                bgcolor: 'primary.main',
                color: 'white',
                py: 6,
                mt: 'auto',
            }}
        >
            <Container maxWidth="lg">
                <Grid container spacing={4}>
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="h6" fontWeight="bold" gutterBottom>
                            IUS Campus Safety
                        </Typography>
                        <Typography variant="body2" paragraph>
                            Providing 24/7 support and safety services to the International University of Sarajevo community.
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                            <IconButton
                                sx={{
                                    color: 'white',
                                    bgcolor: 'rgba(255, 255, 255, 0.1)',
                                    '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.2)' }
                                }}
                                aria-label="Facebook"
                                size="small"
                            >
                                <Facebook size={18} />
                            </IconButton>
                            <IconButton
                                sx={{
                                    color: 'white',
                                    bgcolor: 'rgba(255, 255, 255, 0.1)',
                                    '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.2)' }
                                }}
                                aria-label="Twitter"
                                size="small"
                            >
                                <Twitter size={18} />
                            </IconButton>
                            <IconButton
                                sx={{
                                    color: 'white',
                                    bgcolor: 'rgba(255, 255, 255, 0.1)',
                                    '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.2)' }
                                }}
                                aria-label="Instagram"
                                size="small"
                            >
                                <Instagram size={18} />
                            </IconButton>
                        </Box>
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="h6" fontWeight="bold" gutterBottom>
                            Quick Links
                        </Typography>
                        <Link
                            href="/"
                            underline="hover"
                            color="inherit"
                            sx={{ display: 'block', mb: 1.5 }}
                        >
                            Home
                        </Link>
                        <Link
                            href="/report"
                            underline="hover"
                            color="inherit"
                            sx={{ display: 'block', mb: 1.5 }}
                        >
                            Report Incident
                        </Link>
                        <Link
                            href="/admin"
                            underline="hover"
                            color="inherit"
                            sx={{ display: 'block', mb: 1.5 }}
                        >
                            Admin Dashboard
                        </Link>
                        <Link
                            href="#"
                            underline="hover"
                            color="inherit"
                            sx={{ display: 'block', mb: 1.5 }}
                        >
                            Safety Resources
                        </Link>
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="h6" fontWeight="bold" gutterBottom>
                            University Policies
                        </Typography>
                        <Link
                            href="#"
                            underline="hover"
                            color="inherit"
                            sx={{ display: 'block', mb: 1.5 }}
                        >
                            Code of Conduct
                        </Link>
                        <Link
                            href="#"
                            underline="hover"
                            color="inherit"
                            sx={{ display: 'block', mb: 1.5 }}
                        >
                            Emergency Procedures
                        </Link>
                        <Link
                            href="#"
                            underline="hover"
                            color="inherit"
                            sx={{ display: 'block', mb: 1.5 }}
                        >
                            Privacy Policy
                        </Link>
                        <Link
                            href="#"
                            underline="hover"
                            color="inherit"
                            sx={{ display: 'block', mb: 1.5 }}
                        >
                            Terms of Service
                        </Link>
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="h6" fontWeight="bold" gutterBottom>
                            Contact Us
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <MapPin size={18} style={{ marginRight: '8px' }} />
                            <Typography variant="body2">
                                Hrasni?ka cesta 15, Sarajevo 71210
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <Phone size={18} style={{ marginRight: '8px' }} />
                            <Typography variant="body2">
                                +387 33 957 101
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Mail size={18} style={{ marginRight: '8px' }} />
                            <Typography variant="body2">
                                safety@ius.edu.ba
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>

                <Divider sx={{ my: 4, borderColor: 'rgba(255, 255, 255, 0.2)' }} />

                <Box sx={{ display: 'flex', justifyContent: { xs: 'center', md: 'space-between' }, flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center' }}>
                    <Typography variant="body2" sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                        © {new Date().getFullYear()} International University of Sarajevo. All rights reserved.
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 2, mt: { xs: 2, md: 0 } }}>
                        <Link href="#" color="inherit" underline="hover">
                            <Typography variant="body2">
                                Terms
                            </Typography>
                        </Link>
                        <Link href="#" color="inherit" underline="hover">
                            <Typography variant="body2">
                                Privacy
                            </Typography>
                        </Link>
                        <Link href="#" color="inherit" underline="hover">
                            <Typography variant="body2">
                                Cookies
                            </Typography>
                        </Link>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default Footer;