import React from 'react';
import {
    Box,
    Container,
    Typography,
    Link as MuiLink,
    Divider,
    IconButton
} from '@mui/material';
import {
    Facebook,
    Instagram,
    Mail,
    MapPin,
    Phone
} from 'lucide-react';
import { Link } from 'react-router-dom'; // Import from react-router-dom

const Footer: React.FC = () => {
    return (
        <Box
            component="footer"
            sx={{
                bgcolor: 'primary.main',
                color: 'white',
                py: 6,
                mt: 'auto',
            }}
        >
            <Container maxWidth="lg">
                {/* ===== columns wrapper ===== */}
                <Box
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: 4,
                        justifyContent: 'space-between'
                    }}
                >
                    {/* Column 1 - unchanged */}
                    <Box
                        sx={{
                            flex: {
                                xs: '1 1 100%',
                                sm: '1 1 48%',
                                md: '1 1 22%'
                            }
                        }}
                    >
                        <Typography variant="h6" fontWeight="bold" mb="16px">
                            IUS Campus Safety Chatbot
                        </Typography>
                        <Typography variant="body2" paragraph>
                            Providing 24/7 safety services to the IUS community.
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                            {[Facebook, Instagram].map((Icon, idx) => (
                                <IconButton
                                    key={idx}
                                    sx={{
                                        color: 'white',
                                        bgcolor: 'rgba(255, 255, 255, 0.1)',
                                        '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.2)' }
                                    }}
                                    size="small"
                                >
                                    <Icon size={18} />
                                </IconButton>
                            ))}
                        </Box>
                    </Box>

                    {/* Column 2 - Quick Links with proper navigation */}
                    <Box
                        sx={{
                            flex: {
                                xs: '1 1 100%',
                                sm: '1 1 48%',
                                md: '1 1 22%'
                            }
                        }}
                    >
                        <Typography variant="h6" fontWeight="bold" mb="16px">
                            Quick Links
                        </Typography>
                        {/* Internal routes using react-router */}
                        <MuiLink
                            component={Link}
                            to="/"
                            underline="hover"
                            color="inherit"
                            sx={{ display: 'block', mb: 1.5 }}
                        >
                            Home
                        </MuiLink>
                        <MuiLink
                            component={Link}
                            to="/chat"
                            underline="hover"
                            color="inherit"
                            sx={{ display: 'block', mb: 1.5 }}
                        >
                            Chat Now
                        </MuiLink>
                        <MuiLink
                            component={Link}
                            to="/report"
                            underline="hover"
                            color="inherit"
                            sx={{ display: 'block', mb: 1.5 }}
                        >
                            Report Incident
                        </MuiLink>                      
                        <MuiLink
                            component={Link}
                            to="/admin"
                            underline="hover"
                            color="inherit"
                            sx={{ display: 'block', mb: 1.5 }}
                        >
                            Admin Dashboard
                        </MuiLink>
                        
                    </Box>

                    {/* Column 3 - University Policies */}
                    <Box
                        sx={{
                            flex: {
                                xs: '1 1 100%',
                                sm: '1 1 48%',
                                md: '1 1 22%'
                            }
                        }}
                    >
                        <Typography variant="h6" fontWeight="bold" mb="16px">
                            University Policies
                        </Typography>
                        {/* Example with mixed internal and external links */}
                        <MuiLink
                            component={Link}
                            to="/chat"
                            underline="hover"
                            color="inherit"
                            sx={{ display: 'block', mb: 1.5 }}
                        >
                            Emergency Contacts
                        </MuiLink>
                        <MuiLink
                            href="/privacy-policy.pdf" // External file
                            target="_blank"
                            rel="noopener noreferrer"
                            underline="hover"
                            color="inherit"
                            sx={{ display: 'block', mb: 1.5 }}
                        >
                            Privacy Policy
                        </MuiLink>
                        <MuiLink
                            href="https://ius.edu.ba/terms" // External URL
                            target="_blank"
                            rel="noopener noreferrer"
                            underline="hover"
                            color="inherit"
                            sx={{ display: 'block', mb: 1.5 }}
                        >
                            Terms of Service
                        </MuiLink>
                    </Box>

                    {/* Column 4 - unchanged */}
                    <Box
                        sx={{
                            flex: {
                                xs: '1 1 100%',
                                sm: '1 1 48%',
                                md: '1 1 22%'
                            }
                        }}
                    >
                        <Typography variant="h6" fontWeight="bold" mb="16px">
                            Contact Us
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <MapPin size={18} style={{ marginRight: 8 }} />
                            <Typography variant="body2">
                                Hrasnicka cesta 15, Sarajevo 71210
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <Phone size={18} style={{ marginRight: 8 }} />
                            <Typography variant="body2">
                                +387 33 957 101
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Mail size={18} style={{ marginRight: 8 }} />
                            <Typography variant="body2">
                                safety@ius.edu.ba
                            </Typography>
                        </Box>
                    </Box>
                </Box>

                <Divider sx={{ my: 4, borderColor: 'rgba(255, 255, 255, 0.2)' }} />

                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', md: 'row' },
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        textAlign: { xs: 'center', md: 'left' },
                        gap: 2
                    }}
                >
                    <Typography variant="body2">
                        &#169; 2025 International University of Sarajevo. All rights reserved.
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <MuiLink
                            component={Link}
                            to="/terms"
                            color="inherit"
                            underline="hover"
                        >
                            <Typography variant="body2">Terms</Typography>
                        </MuiLink>
                        <MuiLink
                            component={Link}
                            to="/privacy"
                            color="inherit"
                            underline="hover"
                        >
                            <Typography variant="body2">Privacy</Typography>
                        </MuiLink>
                        <MuiLink
                            component={Link}
                            to="/cookies"
                            color="inherit"
                            underline="hover"
                        >
                            <Typography variant="body2">Cookies</Typography>
                        </MuiLink>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default Footer;