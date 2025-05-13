import React from 'react';
import {
    Box,
    Container,
    Typography,
    Link,
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
                    {/* Column 1 */}
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

                    {/* Column 2 */}
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
                        {['Home', 'Report Incident', 'Admin Dashboard', 'Safety Regulations'].map((text) => (
                            <Link
                                key={text}
                                href="#"
                                underline="hover"
                                color="inherit"
                                sx={{ display: 'block', mb: 1.5 }}
                            >
                                {text}
                            </Link>
                        ))}
                    </Box>

                    {/* Column 3 */}
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
                        {[ 'Emergency Contacts', 'Privacy Policy', 'Terms of Service'].map((text) => (
                            <Link
                                key={text}
                                href="#"
                                underline="hover"
                                color="inherit"
                                sx={{ display: 'block', mb: 1.5 }}
                            >
                                {text}
                            </Link>
                        ))}
                    </Box>

                    {/* Column 4 */}
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
                        {['Terms', 'Privacy', 'Cookies'].map((label) => (
                            <Link key={label} href="#" color="inherit" underline="hover">
                                <Typography variant="body2">{label}</Typography>
                            </Link>
                        ))}
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default Footer;
