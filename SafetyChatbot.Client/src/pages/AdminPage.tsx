import React, { useEffect, useState } from 'react';
import {
    Box, Typography, Card, CardContent,
    Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, Button, LinearProgress, CircularProgress
} from '@mui/material';
import {
    Warning, CheckCircle, HourglassTop,
    AccessTime, BarChart, Refresh
} from '@mui/icons-material';
import { getIncidents } from '../services/ApiService';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Banner from '../components/Banner';

interface Incident {
    id: number;
    incidentType: string;
    date: string;
    location: string;
    severity: string;
    status: 'Pending' | 'In Progress' | 'Resolved'; // Updated status options
    description: string;
}

const AdminDashboard = () => {
    const [incidents, setIncidents] = useState<Incident[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [stats, setStats] = useState({
        totalIncidents: 0,
        pending: 0,
        inProgress: 0,
        resolved: 0,
        avgResponseTime: '0h'
    });

    useEffect(() => {
        loadIncidents();
    }, []);

    const loadIncidents = async () => {
        try {
            const data = await getIncidents();
            setIncidents(data);

            // Calculate statistics with new status options
            const total = data.length;
            const pending = data.filter(i => i.status === 'Pending').length;
            const inProgress = data.filter(i => i.status === 'In Progress').length;
            const resolved = data.filter(i => i.status === 'Resolved').length;

            setStats({
                totalIncidents: total,
                pending,
                inProgress,
                resolved,
                avgResponseTime: calculateAvgResponseTime(data)
            });

        } catch (error) {
            console.error('Failed to load incidents:', error);
        } finally {
            setLoading(false);
        }
    };

 

    const navigate = useNavigate();

    const handleViewClick = (incidentId: string) => {
        navigate(`/admin/${incidentId}`); // Dynamic route
    };

    const calculateAvgResponseTime = (incidents: Incident[]): string => {
        // Implement your actual response time calculation logic here
        return '2.5h'; // Placeholder
    };

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" mt={5} minHeight="100vh">
                <CircularProgress sx={{ color: 'blue2.main' }} />
            </Box>
        );
    }

    

    return (
        <Box sx={{ minHeight: '100vh' }}>
            <Header />
            <Banner />

            <Box sx={{
                p: 3,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                maxWidth: '1400px',
                margin: '0 auto'
            }}>

                {/* Main Dashboard Container */}
                <Card sx={{
                    width: { xs: '100%', md: '1208px' },
                    backgroundColor: 'white',
                    borderRadius: 10,
                    boxShadow: 3,
                    overflow: 'hidden',
                    mb: 4
                }}>
                    {/* Dashboard Header */}
                    <Box sx={{
                        height: '80px',
                        backgroundColor: 'blue2.main',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <Typography
                            variant="h5"
                            sx={{
                                color: 'white',
                                fontFamily: '"Jersey 25"'
                            }}
                        >
                            Admin Dashboard
                        </Typography>
                    </Box>

                    <Box sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', md: 'row' },
                        p: 2,
                        gap: 2,               
                        alignItems: 'stretch'
                    }}>
                        {/* Total Incidents - Larger Card */}
                        <Box sx={{
                            flex: { xs: '1 1 100%', md: '2 1 40%' },
                            minWidth: 0
                        }}>
                            <Card sx={{
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',             
                                backgroundColor: '#EB4545',
                                color: 'white',

                            }}>
                                <CardContent sx={{ flexGrow: 1 }}>
                                    <Typography variant="body1">Total Incidents</Typography>
                                    <Typography variant="h4">{stats.totalIncidents}</Typography>
                                </CardContent>
                            </Card>
                        </Box>

                        {/* Four Equal Cards */}
                        <Box sx={{
                            display: 'flex',
                            flexDirection: { xs: 'column', sm: 'row' },
                            flexWrap: 'wrap',
                            flex: { xs: '1 1 100%', md: '3 1 60%' },
                            gap: 2,
                            minWidth: 0
                        }}>
                            {/* Pending */}
                            <Box sx={{ flex: 1, minWidth: { xs: '100%', sm: 'calc(50% - 16px)', md: 'calc(25% - 16px)' } }}>
                                <Card sx={{
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    borderLeft: '4px solid #ff9800',
                                    backgroundColor: 'blue1.main',
                                    color: 'white'
                                }}>
                                    <CardContent sx={{ flexGrow: 1 }}>
                                        <Typography variant="body1">Pending</Typography>
                                        <Typography variant="h4">{stats.pending}</Typography>
                                        <HourglassTop color="warning" sx={{ mt: 1 }} />
                                    </CardContent>
                                </Card>
                            </Box>

                            {/* In Progress */}
                            <Box sx={{ flex: 1, minWidth: { xs: '100%', sm: 'calc(50% - 16px)', md: 'calc(25% - 16px)' } }}>
                                <Card sx={{
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    borderLeft: '4px solid #2196f3',
                                    backgroundColor: 'blue1.main',
                                    color: 'white'
                                }}>
                                    <CardContent sx={{ flexGrow: 1 }}>
                                        <Typography variant="body1">In Progress</Typography>
                                        <Typography variant="h4">{stats.inProgress}</Typography>
                                        <AccessTime color="info" sx={{ mt: 1 }} />
                                    </CardContent>
                                </Card>
                            </Box>

                            {/* Resolved */}
                            <Box sx={{ flex: 1, minWidth: { xs: '100%', sm: 'calc(50% - 16px)', md: 'calc(25% - 16px)' } }}>
                                <Card sx={{
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    borderLeft: '4px solid #4caf50',
                                    backgroundColor: 'blue1.main',
                                    color: 'white'
                                }}>
                                    <CardContent sx={{ flexGrow: 1 }}>
                                        <Typography variant="body1">Resolved</Typography>
                                        <Typography variant="h4">{stats.resolved}</Typography>
                                        <CheckCircle color="success" sx={{ mt: 1 }} />
                                    </CardContent>
                                </Card>
                            </Box>

                            {/* Average Response Time */}
                            <Box sx={{ flex: 1, minWidth: { xs: '100%', sm: 'calc(50% - 16px)', md: 'calc(25% - 16px)' } }}>
                                <Card sx={{
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    border: '4px solid golden',
                                    color: 'blue1.main',
                                }}>
                                    <CardContent sx={{ flexGrow: 1 }}>
                                        <Typography variant="body1">Avg. Response</Typography>
                                        <Typography variant="h4">{stats.avgResponseTime}</Typography>
                                        <BarChart color="golden" sx={{ mt: 1 }} />
                                    </CardContent>
                                </Card>
                            </Box>
                        </Box>
                    </Box>

                    {/* Table Section */}
                    <CardContent>
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            mb: 3
                        }}>
                            <Typography variant="h3" sx={{ color: 'blue2.main' }}>
                                <Warning sx={{ verticalAlign: 'middle', mr: 1 }} />
                                Recent Incidents
                            </Typography>
                            <Button
                                variant="outlined"
                                startIcon={<Refresh />}
                                onClick={loadIncidents}
                                sx={{ color: 'blue2.main', borderColor: 'blue2.main' }}
                            >
                                Refresh
                            </Button>
                        </Box>

                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead sx={{ bgcolor: '#E7E8E9' }}>
                                    <TableRow>
                                        <TableCell sx={{ typography: 'h2' }}>ID</TableCell>
                                            <TableCell sx={{ typography: 'h2' }}>Type</TableCell>
                                            <TableCell sx={{ typography: 'h2' }}>Date</TableCell>
                                            <TableCell sx={{ typography: 'h2' }}>Location</TableCell>
                                            <TableCell sx={{ typography: 'h2' }}>Severity</TableCell>
                                            <TableCell sx={{ typography: 'h2' }}>Status</TableCell>
                                            <TableCell sx={{ typography: 'h2' }}>Description</TableCell>
                                            <TableCell sx={{ typography: 'h2' }}>Actions</TableCell>                                      
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {incidents.map((incident) => (
                                        <TableRow key={incident.id} hover>
                                            <TableCell>{incident.id}</TableCell>
                                            <TableCell>{incident.incidentType}</TableCell>
                                            <TableCell>{incident.date}</TableCell>
                                            <TableCell>{incident.location}</TableCell>
                                            <TableCell>
                                                <Box sx={{
                                                    p: 1,
                                                    borderRadius: 1,
                                                    backgroundColor:
                                                        incident.severityCode === 0 ? '#ffebee' : // High = red
                                                            incident.severityCode === 1 ? '#fff3e0' : // Medium = orange
                                                                '#e8f5e9', // Low = green
                                                    color:
                                                        incident.severityCode === 0 ? '#d32f2f' : // High = dark red
                                                            incident.severityCode === 1 ? '#fb8c00' : // Medium = dark orange
                                                                '#2e7d32', // Low = dark green
                                                    fontWeight: 'bold',
                                                    textAlign: 'center',
                                                    display: 'inline-block'
                                                }}>
                                                    {incident.severityCode === 0 && 'High'}
                                                    {incident.severityCode === 1 && 'Medium'}
                                                    {incident.severityCode === 2 && 'Low'}
                                                </Box>
                                            </TableCell>
                                            <TableCell>
                                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                    {incident.status === 'Pending' && <HourglassTop color="warning" sx={{ mr: 1 }} />}
                                                    {incident.status === 'In Progress' && <AccessTime color="info" sx={{ mr: 1 }} />}
                                                    {incident.status === 'Resolved' && <CheckCircle color="success" sx={{ mr: 1 }} />}
                                                    {incident.status}
                                                </Box>
                                            </TableCell>
                                            <TableCell>{incident.description}</TableCell>
                                            <TableCell>
                                                <Button
                                                    onClick={() => handleViewClick(incident.id.toString())} 
                                                    size="small"
                                                    variant="outlined"
                                                    sx={{
                                                        color: 'blue2.main',
                                                        borderColor: 'blue2.main',
                                                        '&:hover': {
                                                            backgroundColor: 'blue2.main',
                                                            color: 'white',
                                                        },
                                                    }}
                                                >
                                                    View
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </CardContent>
                </Card>

                {/* Status Progress */}
                <Card sx={{
                    width: { xs: '100%', md: '1208px' },
                    borderRadius: 10,
                    boxShadow: 3,
                    backgroundColor: 'white'
                }}>
                    <CardContent>
                        <Typography variant="h6" gutterBottom sx={{ color: 'blue2.main' }}>
                            Case Resolution Progress
                        </Typography>
                        <Box sx={{ mb: 2 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                <Typography>Pending</Typography>
                                <Typography>{stats.pending} cases</Typography>
                            </Box>
                            <LinearProgress
                                variant="determinate"
                                value={(stats.pending / stats.totalIncidents) * 100}
                                sx={{ height: 10, borderRadius: 5 }}
                                color="warning"
                            />
                        </Box>
                        <Box sx={{ mb: 2 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                <Typography>In Progress</Typography>
                                <Typography>{stats.inProgress} cases</Typography>
                            </Box>
                            <LinearProgress
                                variant="determinate"
                                value={(stats.inProgress / stats.totalIncidents) * 100}
                                sx={{ height: 10, borderRadius: 5 }}
                                color="info"
                            />
                        </Box>
                        <Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                <Typography>Resolved</Typography>
                                <Typography>{stats.resolved} cases</Typography>
                            </Box>
                            <LinearProgress
                                variant="determinate"
                                value={(stats.resolved / stats.totalIncidents) * 100}
                                sx={{ height: 10, borderRadius: 5 }}
                                color="success"
                            />
                        </Box>
                    </CardContent>
                </Card>
            </Box>
        </Box>
    );
};

export default AdminDashboard;