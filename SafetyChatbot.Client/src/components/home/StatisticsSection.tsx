import React from 'react';
import { Box, Typography, Container, Grid, Card, CardContent, Paper, useTheme } from '@mui/material';
import { TrendingUp, Clock, Shield, AlertTriangle } from 'lucide-react';

const StatisticsSection: React.FC = () => {
    const theme = useTheme();

    const stats = [
        {
            icon: <Clock size={32} color={theme.palette.primary.main} />,
            value: '24/7',
            label: 'System Availability',
            description: 'Round-the-clock access to safety resources and reporting'
        },
        {
            icon: <Shield size={32} color={theme.palette.warning.main} />,
            value: '100+',
            label: 'Safety Protocols',
            description: 'Comprehensive collection of safety procedures for various scenarios'
        },
        {
            icon: <TrendingUp size={32} color={theme.palette.success.main} />,
            value: '94%',
            label: 'Resolution Rate',
            description: 'High success rate for incident resolution and assistance'
        },
        {
            icon: <AlertTriangle size={32} color={theme.palette.error.main} />,
            value: '<2 min',
            label: 'Response Time',
            description: 'Average time to respond to emergency reports'
        }
    ];

    return (
        <Box
            sx={{
                maxWidth: '1300px',       
                mx: 'auto',               
                px: { xs: 2, sm: 4, md: 6 }, 
                pt: 4,
                pb: 15 
            }}
        >
            <Box sx={{ textAlign: 'center', mb: 6 }}>
                <Typography
                    variant="h3"
                    component="h2"
                    fontWeight={700}
                    color="primary.main"
                    gutterBottom
                >
                    Campus Safety at a Glance
                </Typography>
                <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ maxWidth: 700, mx: 'auto' }}
                >
                    Our advanced safety platform helps the IUS community stay protected and informed with real-time assistance and rapid response capabilities.
                </Typography>
            </Box>
            <Box
                display="flex"
                flexWrap="wrap"
                justifyContent="space-between"
                gap={3} // spacing between cards
            >
                {stats.map((stat, index) => (
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
                                display: 'flex',
                                justifyContent: 'center',
                                transition: 'transform 0.3s, box-shadow 0.3s',
                                '&:hover': {
                                    transform: 'translateY(-8px)',
                                    boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
                                }
                            }}
                        >
                            <CardContent sx={{ p: 4 }}>
                                <Box sx={{
                                    display: 'inline-flex',
                                    p: 1.5,
                                    borderRadius: '50%',
                                    bgcolor: 'rgba(33, 61, 115, 0.1)',
                                    mb: 2
                                }}>
                                    {stat.icon}
                                </Box>
                                <Typography
                                    variant="h3"
                                    component="p"
                                    fontWeight={700}
                                    color="primary.main"
                                >
                                    {stat.value}
                                </Typography>
                                <Typography
                                    variant="h6"
                                    fontWeight={600}
                                    gutterBottom
                                >
                                    {stat.label}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {stat.description}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default StatisticsSection;