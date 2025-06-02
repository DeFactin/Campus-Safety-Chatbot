import React from 'react';
import {
    Box,
    Container,
    Typography,
    Avatar,
    Chip,
    Divider,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Card,
    CardContent,
    useTheme
} from '@mui/material';
import { User, Mail, Phone, MapPin, AlertCircle } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import PageHeader from '../components/common/PageHeader';
import { mockIncidents } from '../data/mockData';

const ProfilePage: React.FC = () => {
    const theme = useTheme();

    // Mock user data
    const user = {
        name: 'John Doe',
        email: 'john.doe@ius.edu.ba',
        phone: '+387 61 234 567',
        studentId: 'IUS2024001',
        department: 'Faculty of Engineering',
        address: 'Student Dormitory A, Room 304'
    };

    // Filter incidents for this user (in a real app, this would be filtered by user ID)
    const userIncidents = mockIncidents.slice(0, 5); // Just showing last 5 incidents

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'pending':
                return 'warning';
            case 'in_progress':
                return 'primary';
            case 'resolved':
                return 'success';
            default:
                return 'default';
        }
    };

    const getSeverityColor = (severity: string) => {
        switch (severity) {
            case 'high':
                return theme.palette.error.main;
            case 'medium':
                return theme.palette.warning.main;
            case 'low':
                return theme.palette.success.main;
            default:
                return theme.palette.grey[500];
        }
    };

    return (
        <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Navbar />

            <Container component="main" sx={{ flexGrow: 1, py: 6 }}>
                <PageHeader
                    title="My Profile"
                    subtitle="View your profile information and incident report history"
                    breadcrumbs={[
                        { name: 'Home', path: '/' },
                        { name: 'Profile' }
                    ]}
                />

                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
                    {/* Profile Information */}
                    <Box sx={{ width: { xs: '100%', md: '33%' } }}>
                        <Card elevation={0} sx={{ borderRadius: 2, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
                            <CardContent sx={{ p: 3 }}>
                                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
                                    <Avatar
                                        sx={{
                                            width: 120,
                                            height: 120,
                                            bgcolor: 'primary.main',
                                            mb: 2
                                        }}
                                    >
                                        <User size={60} />
                                    </Avatar>
                                    <Typography variant="h5" fontWeight={600}>
                                        {user.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Student ID: {user.studentId}
                                    </Typography>
                                </Box>

                                <Divider sx={{ my: 2 }} />

                                <Box sx={{ mt: 2 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                        <Mail size={18} style={{ marginRight: '12px', color: theme.palette.primary.main }} />
                                        <Typography variant="body2">{user.email}</Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                        <Phone size={18} style={{ marginRight: '12px', color: theme.palette.primary.main }} />
                                        <Typography variant="body2">{user.phone}</Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <MapPin size={18} style={{ marginRight: '12px', color: theme.palette.primary.main }} />
                                        <Typography variant="body2">{user.address}</Typography>
                                    </Box>
                                </Box>

                                <Divider sx={{ my: 2 }} />

                                <Box>
                                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                        Department
                                    </Typography>
                                    <Typography variant="body1">
                                        {user.department}
                                    </Typography>
                                </Box>
                            </CardContent>
                        </Card>
                    </Box>

                    {/* Incident Reports History */}
                    <Box sx={{ width: { xs: '100%', md: '67%' } }}>
                        <Card elevation={0} sx={{ borderRadius: 2, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
                            <CardContent sx={{ p: 3 }}>
                                <Typography variant="h6" fontWeight={600} gutterBottom>
                                    My Incident Reports
                                </Typography>

                                <TableContainer>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Type</TableCell>
                                                <TableCell>Date</TableCell>
                                                <TableCell>Severity</TableCell>
                                                <TableCell>Status</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {userIncidents.map((incident) => (
                                                <TableRow key={incident.id} hover>
                                                    <TableCell>{incident.type}</TableCell>
                                                    <TableCell>
                                                        {new Date(incident.date).toLocaleDateString()}
                                                    </TableCell>
                                                    <TableCell>
                                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                            <AlertCircle
                                                                size={16}
                                                                color={getSeverityColor(incident.severityLevel)}
                                                                style={{ marginRight: '8px' }}
                                                            />
                                                            {incident.severityLevel.charAt(0).toUpperCase() + incident.severityLevel.slice(1)}
                                                        </Box>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Chip
                                                            label={incident.status.replace('_', ' ').charAt(0).toUpperCase() + incident.status.slice(1)}
                                                            color={getStatusColor(incident.status)}
                                                            size="small"
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </CardContent>
                        </Card>

                        {/* Statistics Cards */}
                        <Box sx={{
                            display: 'flex',
                            flexDirection: { xs: 'column', sm: 'row' },
                            gap: 3,
                            mt: 3
                        }}>
                            <Box sx={{ width: { xs: '100%', sm: '33%' } }}>
                                <Card
                                    elevation={0}
                                    sx={{
                                        borderRadius: 2,
                                        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                                        bgcolor: 'primary.main',
                                        color: 'white'
                                    }}
                                >
                                    <CardContent>
                                        <Typography variant="h4" fontWeight={700}>
                                            {userIncidents.length}
                                        </Typography>
                                        <Typography variant="body2">
                                            Total Reports
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Box>
                            <Box sx={{ width: { xs: '100%', sm: '33%' } }}>
                                <Card
                                    elevation={0}
                                    sx={{
                                        borderRadius: 2,
                                        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                                        bgcolor: 'warning.main',
                                        color: 'white'
                                    }}
                                >
                                    <CardContent>
                                        <Typography variant="h4" fontWeight={700}>
                                            {userIncidents.filter(i => i.status === 'pending').length}
                                        </Typography>
                                        <Typography variant="body2">
                                            Pending
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Box>
                            <Box sx={{ width: { xs: '100%', sm: '33%' } }}>
                                <Card
                                    elevation={0}
                                    sx={{
                                        borderRadius: 2,
                                        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                                        bgcolor: 'success.main',
                                        color: 'white'
                                    }}
                                >
                                    <CardContent>
                                        <Typography variant="h4" fontWeight={700}>
                                            {userIncidents.filter(i => i.status === 'resolved').length}
                                        </Typography>
                                        <Typography variant="body2">
                                            Resolved
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Container>

            <Footer />
        </Box>
    );
};

export default ProfilePage;