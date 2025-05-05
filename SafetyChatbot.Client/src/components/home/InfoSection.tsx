import React from 'react';
import { Box, Typography, Container, Card, CardContent, useTheme } from '@mui/material';
import { ShieldAlert, BookOpen, Users, Bell } from 'lucide-react';

const InfoSection: React.FC = () => {
    const theme = useTheme();

    const features = [
        {
            icon: <ShieldAlert size={36} color={theme.palette.warning.main} />,
            title: 'Emergency Response',
            description: 'Immediate guidance during critical situations with clear step-by-step instructions for various emergency scenarios.'
        },
        {
            icon: <BookOpen size={36} color={theme.palette.warning.main} />,
            title: 'Safety Protocols',
            description: 'Access to comprehensive safety protocols and procedures, tailored to specific locations and situations on campus.'
        },
        {
            icon: <Users size={36} color={theme.palette.warning.main} />,
            title: 'Community Security',
            description: 'Fostering a safer environment through collective awareness and reporting of potential security concerns.'
        },
        {
            icon: <Bell size={36} color={theme.palette.warning.main} />,
            title: 'Alert System',
            description: 'Receive timely notifications about campus-wide emergencies, weather warnings, and other critical safety updates.'
        }
    ];

    return (
        <Box sx={{ py: 10, bgcolor: '#f8f9fa' }}>
            <Container maxWidth="xl">
                <Box sx={{ textAlign: 'center', mb: 8 }}>
                    <Typography
                        variant="h2"
                        component="h2"
                        fontWeight={700}
                        color="primary.main"
                        gutterBottom
                    >
                        Why Use Our Safety Platform?
                    </Typography>
                    <Typography
                        variant="h6"
                        color="text.secondary"
                        sx={{ maxWidth: 700, mx: 'auto' }}
                    >
                        Our AI-powered campus safety system provides real-time assistance and reporting tools to keep everyone safe.
                    </Typography>
                </Box>

                <Box
                    sx={{
                        maxWidth: '1300px',       // You can adjust this max width
                        mx: 'auto',               // Center horizontally
                        px: { xs: 2, sm: 4, md: 6 }, // Responsive horizontal padding
                        py: 4                     // Vertical padding
                    }}
                >
                    <Box
                        display="flex"
                        flexWrap="wrap"
                        justifyContent="space-between"
                        gap={3} // spacing between cards
                    >
                        {features.map((feature, index) => (
                            <Box
                                key={index}
                                sx={{
                                    flex: {
                                        xs: '100%',    // full width on mobile
                                        sm: '48%',     // 2 per row on small screens
                                        md: '23%',     // 4 per row on medium+ screens
                                    },
                                    boxSizing: 'border-box',
                                }}
                            >
                                <Card
                                    sx={{
                                        height: '100%',
                                        transition: 'transform 0.3s, box-shadow 0.3s',
                                        '&:hover': {
                                            transform: 'translateY(-8px)',
                                            boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
                                        }
                                    }}
                                >
                                    <CardContent sx={{ p: 4 }}>
                                        <Box sx={{ mb: 2 }}>
                                            {feature.icon}
                                        </Box>
                                        <Typography variant="h6" component="h4" fontWeight={600} gutterBottom>
                                            {feature.title}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {feature.description}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Box>
                        ))}
                    </Box>
                </Box>



                <Box sx={{ mt: 10, textAlign: 'center' }}>
                    <Typography
                        variant="h3"
                        component="h2"
                        fontWeight={700}
                        color="primary.main"
                        gutterBottom
                    >
                        Making Campus Safety Accessible
                    </Typography>
                    <Typography
                        variant="body1"
                        color="text.secondary"
                        sx={{ maxWidth: 800, mx: 'auto', mb: 4 }}
                    >
                        Our platform is designed to address the rising need for quick, clear, and accessible safety communication tools on university campuses. With the increasing occurrence of mental health crises, security incidents, and medical emergencies, having reliable safety resources at your fingertips is more important than ever.
                    </Typography>

                    <Box
                        component="img"
                        src="../public/students.jpg"
                        alt="Students using safety app on campus"
                        sx={{
                            width: '100%',
                            maxWidth: 900,
                            height: '60%',
                            borderRadius: 3,
                            boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                            mb: 4
                        }}
                    />

                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: { xs: 'column', md: 'row' }, // stack on small, side-by-side on medium+
                            gap: 4,
                            mt: 2,
                            textAlign: 'left',
                            mx: {lg: 20}
                        }}
                    >
                        <Box sx={{ flex: 1 }}>
                            <Typography variant="h5" fontWeight={600} gutterBottom color="primary.main">
                                Available 24/7
                            </Typography>
                            <Typography variant="body1" paragraph>
                                Our AI-powered system is available around the clock, ensuring that safety assistance is always accessible to students, faculty, and staff.
                            </Typography>
                        </Box>

                        <Box sx={{ flex: 1 }}>
                            <Typography variant="h5" fontWeight={600} gutterBottom color="primary.main">
                                Multi-device Accessibility
                            </Typography>
                            <Typography variant="body1" paragraph>
                                Access safety information and reporting tools from any device, whether you're on a computer, tablet, or smartphone.
                            </Typography>
                        </Box>
                    </Box>

                </Box>
            </Container>
        </Box>
    );
};

export default InfoSection;