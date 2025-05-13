import React, { useEffect, useState } from 'react';
import {
    Box,
    Paper,
    Typography,
    useTheme,
    Card,
    CardContent,
    Divider,
    LinearProgress
} from '@mui/material';
import {
    AlertTriangle,
    Clock,
    CheckCircle,
    BarChart
} from 'lucide-react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
import { Incident, IncidentStatus, SeverityLevel } from '../../types/incident';
import { getIncidents } from '../../services/ApiService';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

interface StatCard {
    title: string;
    value: number;
    icon: React.ReactNode;
    color: string;
    percentage?: number;
}


const StatisticsOverview: React.FC = () => {
    const theme = useTheme();
   
    const [incidents, setIncidents] = useState<Incident[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getIncidents();
                setIncidents(data);
            } catch (error) {
                console.error('Failed to load incidents:', error);
                setError('Failed to load incidents.');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const calculateStatistics = () => {
        const totalIncidents = incidents.length;
        const pendingCount = incidents.filter(incident => incident.status === 'Pending').length;
        const inProgressCount = incidents.filter(incident => incident.status === 'In Progress').length;
        const resolvedCount = incidents.filter(incident => incident.status === 'Resolved').length;

        const highSeverityCount = incidents.filter(incident => incident.severity === 'high').length;
        const mediumSeverityCount = incidents.filter(incident => incident.severity === 'medium').length;
        const lowSeverityCount = incidents.filter(incident => incident.severity === 'low').length;

        return {
            totalIncidents,
            pendingCount,
            inProgressCount,
            resolvedCount,
            highSeverityCount,
            mediumSeverityCount,
            lowSeverityCount,

            // Calculate percentages
            pendingPercentage: Math.round((pendingCount / totalIncidents) * 100),
            inProgressPercentage: Math.round((inProgressCount / totalIncidents) * 100),
            resolvedPercentage: Math.round((resolvedCount / totalIncidents) * 100),

            highSeverityPercentage: Math.round((highSeverityCount / totalIncidents) * 100),
            mediumSeverityPercentage: Math.round((mediumSeverityCount / totalIncidents) * 100),
            lowSeverityPercentage: Math.round((lowSeverityCount / totalIncidents) * 100),
        };
    };
    const stats = calculateStatistics();
    // Chart data and options
    const statusChartData = {
        labels: ['Pending', 'In Progress', 'Resolved'],
        datasets: [
            {
                data: [stats.pendingCount, stats.inProgressCount, stats.resolvedCount],
                backgroundColor: [
                    theme.palette.warning.main,
                    theme.palette.primary.main,
                    theme.palette.success.main,
                ],
                borderColor: [
                    theme.palette.warning.main,
                    theme.palette.primary.main,
                    theme.palette.success.main,
                ],
                borderWidth: 1,
            },
        ],
    };

    const severityChartData = {
        labels: ['High', 'Medium', 'Low'],
        datasets: [
            {
                label: 'Number of Incidents',
                data: [stats.highSeverityCount, stats.mediumSeverityCount, stats.lowSeverityCount],
                backgroundColor: [
                    theme.palette.error.main,
                    theme.palette.warning.main,
                    theme.palette.success.main,
                ],
            },
        ],
    };

    const pieChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom' as const,
                labels: {
                    font: {
                        size: 12,
                        family: theme.typography.fontFamily,
                    },
                },
            },
        },
    };

    const barChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    precision: 0
                }
            }
        },
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: true,
                text: 'Incidents by Severity Level',
                font: {
                    size: 14,
                    family: theme.typography.fontFamily,
                },
            },
        },
    };

    const statCards: StatCard[] = [
        {
            title: 'Total Incidents',
            value: stats.totalIncidents,
            icon: <BarChart size={32} color={theme.palette.primary.main} />,
            color: theme.palette.primary.main,
        },
        {
            title: 'Pending',
            value: stats.pendingCount,
            icon: <Clock size={32} color={theme.palette.warning.main} />,
            color: theme.palette.warning.main,
            percentage: stats.pendingPercentage,
        },
        {
            title: 'In Progress',
            value: stats.inProgressCount,
            icon: <AlertTriangle size={32} color={theme.palette.primary.main} />,
            color: theme.palette.primary.main,
            percentage: stats.inProgressPercentage,
        },
        {
            title: 'Resolved',
            value: stats.resolvedCount,
            icon: <CheckCircle size={32} color={theme.palette.success.main} />,
            color: theme.palette.success.main,
            percentage: stats.resolvedPercentage,
        },
    ];

    return (
        <Box sx={{ mb: 4 }}>
            {/* Stat Cards - Flexbox Version */}
            <Box sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 3,
                mb: 4
            }}>
                {statCards.map((card, index) => (
                    <Box key={index} sx={{
                        flex: '1 1 calc(25% - 24px)',
                        minWidth: { xs: '100%', sm: 'calc(50% - 24px)', md: 'calc(25% - 24px)' }
                    }}>
                        <Card
                            elevation={0}
                            sx={{
                                borderRadius: 2,
                                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                                height: '100%',
                                position: 'relative',
                                overflow: 'hidden',
                                '&::before': {
                                    content: '""',
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '4px',
                                    height: '100%',
                                    backgroundColor: card.color,
                                }
                            }}
                        >
                            <CardContent sx={{ p: 3 }}>
                                <Box sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    mb: 1
                                }}>
                                    <Typography variant="subtitle2" color="text.secondary">
                                        {card.title}
                                    </Typography>
                                    <Box sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        p: 1,
                                        borderRadius: '50%',
                                        bgcolor: `${card.color}15`,
                                    }}>
                                        {card.icon}
                                    </Box>
                                </Box>
                                <Typography variant="h3" component="div" fontWeight={700}>
                                    {card.value}
                                </Typography>

                                {card.percentage !== undefined && (
                                    <Box sx={{ mt: 2 }}>
                                        <Box sx={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            mb: 0.5
                                        }}>
                                            <Typography variant="caption" color="text.secondary">
                                                {card.percentage}% of total
                                            </Typography>
                                        </Box>
                                        <LinearProgress
                                            variant="determinate"
                                            value={card.percentage}
                                            sx={{
                                                height: 6,
                                                borderRadius: 3,
                                                bgcolor: `${card.color}20`,
                                                '& .MuiLinearProgress-bar': {
                                                    bgcolor: card.color,
                                                }
                                            }}
                                        />
                                    </Box>
                                )}
                            </CardContent>
                        </Card>
                    </Box>
                ))}
            </Box>

            {/* Charts - Flexbox Version */}
            <Box sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 3
            }}>
                <Box sx={{
                    flex: '1 1 calc(50% - 24px)',
                    minWidth: { xs: '100%', md: 'calc(50% - 24px)' }
                }}>
                    <Paper
                        elevation={0}
                        sx={{
                            p: 3,
                            height: '100%',
                            borderRadius: 2,
                            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                        }}
                    >
                        <Typography variant="h6" fontWeight={600} gutterBottom>
                            Incident Status Distribution
                        </Typography>
                        <Divider sx={{ mb: 3 }} />
                        <Box sx={{ height: 300 }}>
                            <Pie data={statusChartData} options={pieChartOptions} />
                        </Box>
                    </Paper>
                </Box>

                <Box sx={{
                    flex: '1 1 calc(50% - 24px)',
                    minWidth: { xs: '100%', md: 'calc(50% - 24px)' }
                }}>
                    <Paper
                        elevation={0}
                        sx={{
                            p: 3,
                            height: '100%',
                            borderRadius: 2,
                            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                        }}
                    >
                        <Typography variant="h6" fontWeight={600} gutterBottom>
                            Incidents by Severity
                        </Typography>
                        <Divider sx={{ mb: 3 }} />
                        <Box sx={{ height: 300 }}>
                            <Bar data={severityChartData} options={barChartOptions} />
                        </Box>
                    </Paper>
                </Box>
            </Box>
        </Box>
    );
};

export default StatisticsOverview;