import React, { useEffect, useState } from 'react';
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
    useTheme,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from '@mui/material';
import { User, Mail, MapPin, AlertCircle, BadgeCheck } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import PageHeader from '../components/common/PageHeader';
import { getUserIncidents } from '../services/ApiService';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

interface Incident {
    id: number;
    incidentType: string;
    date: string;
    severity: 'low' | 'medium' | 'high';
    status: 'pending' | 'in_progress' | 'resolved';
    description: string;
    adminNotes?: string | null;
}

type DecodedToken = {
    name: string;
    email: string;
    role: string;
    exp: number;
};

const ProfilePage: React.FC = () => {
    const theme = useTheme();
    const [incidents, setIncidents] = useState<Incident[]>([]);
    const [openDescriptionId, setOpenDescriptionId] = useState<number | null>(null);
    const [openNotesId, setOpenNotesId] = useState<number | null>(null);

    const [user, setUser] = useState({
        name: '',
        surname: '',
        studentId: '',
        email: '',
        role: '',
    });

    useEffect(() => {
        const storedToken = Cookies.get('token');
        if (storedToken) {
            try {
                const decoded: DecodedToken = jwtDecode(storedToken);
                const firstName = decoded.name.split(' ')[0];
                const lastName = decoded.name.split(' ')[1] || '';
                const email = decoded.email;
                const studentId = email.split('@')[0];
                const role = decoded.role;

                setUser({
                    name: firstName,
                    surname: lastName,
                    studentId,
                    email,
                    role,
                });
            } catch (err) {
                console.error('Invalid token:', err);
                Cookies.remove('token');
            }
        }
    }, []);

    useEffect(() => {
        const fetchIncidents = async () => {
            try {
                const response = await getUserIncidents();
                console.log("Fetched incidents:", response);
                if (Array.isArray(response)) {
                    setIncidents(response);
                } else {
                    console.error('Expected array but got:', response);
                    setIncidents([]);
                }
            } catch (error) {
                console.error('Failed to fetch incidents:', error);
                setIncidents([]);
            }
        };
        fetchIncidents();
    }, []);

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'pending': return 'warning';
            case 'in_progress': return 'primary';
            case 'resolved': return 'success';
            default: return 'default';
        }
    };

    const getSeverityColor = (severity: string) => {
        switch (severity.toLowerCase()) {
            case 'high': return theme.palette.error.main;
            case 'medium': return theme.palette.warning.main;
            case 'low': return theme.palette.success.main;
            default: return theme.palette.grey[500];
        }
    };

    // Funkcije za otvaranje i zatvaranje dijaloga opisa i napomena
    const handleOpenDescription = (id: number) => setOpenDescriptionId(id);
    const handleCloseDescription = () => setOpenDescriptionId(null);

    const handleOpenNotes = (id: number) => setOpenNotesId(id);
    const handleCloseNotes = () => setOpenNotesId(null);

    return (
        <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Navbar />
            <Container component="main" sx={{ flexGrow: 1, py: 6 }}>
                <PageHeader
                    title="My Profile"
                    subtitle="View your profile information and incident report history"
                    breadcrumbs={[
                        { name: 'Home', path: '/' },
                        { name: 'Profile' },
                    ]}
                />

                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
                    <Box sx={{ width: { xs: '100%', md: '33%' } }}>
                        <Card elevation={0} sx={{ borderRadius: 2, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
                            <CardContent sx={{ p: 3 }}>
                                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
                                    <Avatar sx={{ bgcolor: 'primary.main', mr: 2, width: 120, height: 120 }}>
                                        <User size={40} color="white" />
                                    </Avatar>
                                </Box>

                                <Divider sx={{ my: 2 }} />
                                <Box sx={{ mt: 2 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                        <User size={18} style={{ marginRight: 12, color: theme.palette.primary.main }} />
                                        <Typography variant="body2">Name: {user.name}</Typography>
                                    </Box>

                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                        <User size={18} style={{ marginRight: 12, color: theme.palette.primary.main }} />
                                        <Typography variant="body2">Surname: {user.surname}</Typography>
                                    </Box>

                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                        <BadgeCheck size={18} style={{ marginRight: 12, color: theme.palette.primary.main }} />
                                        <Typography variant="body2">Student ID: {user.studentId}</Typography>
                                    </Box>

                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                        <Mail size={18} style={{ marginRight: 12, color: theme.palette.primary.main }} />
                                        <Typography variant="body2">{user.email}</Typography>
                                    </Box>

                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                        <MapPin size={18} style={{ marginRight: 12, color: theme.palette.primary.main }} />
                                        <Typography variant="body2">International University of Sarajevo</Typography>
                                    </Box>
                                </Box>

                                <Divider sx={{ my: 2 }} />
                            </CardContent>
                        </Card>
                    </Box>

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
                                                <TableCell sx={{ whiteSpace: 'nowrap' }}>Date</TableCell>
                                                <TableCell>Severity</TableCell>
                                                <TableCell>Status</TableCell>
                                                <TableCell>Description</TableCell>
                                                <TableCell>Notes</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {incidents.map((incident) => (
                                                <TableRow key={incident.id} hover>
                                                    <TableCell>{incident.incidentType || 'N/A'}</TableCell>
                                                    <TableCell sx={{ whiteSpace: 'nowrap' }}>
                                                        {incident.date ? new Date(incident.date).toLocaleDateString() : 'N/A'}
                                                    </TableCell>
                                                    <TableCell>
                                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                            <AlertCircle
                                                                size={16}
                                                                color={getSeverityColor(incident.severity)}
                                                                style={{ marginRight: 8 }}
                                                            />
                                                            {incident.severity
                                                                ? incident.severity.charAt(0).toUpperCase() + incident.severity.slice(1)
                                                                : 'N/A'}
                                                        </Box>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Chip
                                                            label={
                                                                incident.status
                                                                    ? incident.status.charAt(0).toUpperCase() +
                                                                    incident.status.slice(1).toLowerCase()
                                                                    : 'N/A'
                                                            }
                                                            color={getStatusColor(incident.status)}
                                                            size="small"
                                                        />
                                                    </TableCell>
                                                    <TableCell sx={{ whiteSpace: 'nowrap' }}>
                                                        <Button size="small" onClick={() => handleOpenDescription(incident.id)}>
                                                            View
                                                        </Button>
                                                    </TableCell>
                                                    <TableCell sx={{ whiteSpace: 'nowrap' }}>
                                                        <Button size="small" onClick={() => handleOpenNotes(incident.id)}>
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

                        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 3, mt: 3 }}>
                            <CardStat count={incidents.filter(i => i.status.toLowerCase() === 'in progress').length} label="In Progress" color="primary.main" />
                            <CardStat count={incidents.filter(i => i.status.toLowerCase() === 'pending').length} label="Pending" color="warning.main" />
                            <CardStat count={incidents.filter(i => i.status.toLowerCase() === 'resolved').length} label="Resolved" color="success.main" />
                        </Box>
                    </Box>
                </Box>
            </Container>

            {/* Dialog za opis incidenata */}
            <Dialog open={openDescriptionId !== null} onClose={handleCloseDescription} maxWidth="sm" fullWidth>
                <DialogTitle>Incident Description</DialogTitle>
                <DialogContent dividers>
                    <Typography>
                        {incidents.find(i => i.id === openDescriptionId)?.description || 'No description available.'}
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDescription}>Close</Button>
                </DialogActions>
            </Dialog>

            {/* Dialog za admin napomene */}
            <Dialog open={openNotesId !== null} onClose={handleCloseNotes} maxWidth="sm" fullWidth>
                <DialogTitle>Admin Notes</DialogTitle>
                <DialogContent dividers>
                    <Typography>
                        {incidents.find(i => i.id === openNotesId)?.adminNotes || 'No notes available.'}
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseNotes}>Close</Button>
                </DialogActions>
            </Dialog>

            <Footer />
        </Box>
    );
};

const CardStat: React.FC<{ count: number; label: string; color: string }> = ({ count, label, color }) => (
    <Box sx={{ width: { xs: '100%', sm: '33%' } }}>
        <Card
            elevation={0}
            sx={{
                borderRadius: 2,
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                bgcolor: color,
                color: 'white',
            }}
        >
            <CardContent>
                <Typography variant="h4" fontWeight="bold" textAlign="center">
                    {count}
                </Typography>
                <Typography variant="body2" textAlign="center">
                    {label}
                </Typography>
            </CardContent>
        </Card>
    </Box>
);

export default ProfilePage;
