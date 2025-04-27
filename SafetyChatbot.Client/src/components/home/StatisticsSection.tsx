import React from 'react';
import { Box, Typography, Container, Grid, Paper, useTheme } from '@mui/material';
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
        <Box sx={{ py: 10 }}>
            <Container maxWidth="lg">
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

                <Grid container spacing={4}>
                    {stats.map((stat, index) => (
                        <Grid item xs={12} sm={6} md={3} key={index}>
                            <Paper
                                elevation={0}
                                sx={{
                                    p: 4,
                                    height: '100%',
                                    textAlign: 'center',
                                    borderRadius: 3,
                                    boxShadow: '0 8px 30px rgba(0,0,0,0.08)',
                                    transition: 'transform 0.3s',
                                    '&:hover': {
                                        transform: 'translateY(-5px)',
                                        boxShadow: '0 12px 30px rgba(0,0,0,0.12)'
                                    }
                                }}
                            >
                                <Box
                                    sx={{
                                        display: 'inline-flex',
                                        p: 1.5,
                                        borderRadius: '50%',
                                        bgcolor: 'rgba(33, 61, 115, 0.1)',
                                        mb: 2
                                    }}
                                >
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
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    {stat.description}
                                </Typography>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
};

export default StatisticsSection;