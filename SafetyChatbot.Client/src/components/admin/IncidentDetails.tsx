import React, { useState } from 'react';
import {
    Box,
    Grid,
    Paper,
    Typography,
    Chip,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    TextField,
    Divider,
    Card,
    CardContent,
    Alert,
    Snackbar,
    SelectChangeEvent,
    useTheme
} from '@mui/material';
import { AlertCircle, MessageSquare, Clock, Calendar, MapPin, FileText, Check } from 'lucide-react';
import { Incident, IncidentStatus, SeverityLevel } from '../../types/incident';

interface IncidentDetailsProps {
    incident: Incident;
}

const IncidentDetails: React.FC<IncidentDetailsProps> = ({ incident }) => {
    const theme = useTheme();
    const [status, setStatus] = useState<IncidentStatus>(incident.status);
    const [notes, setNotes] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const handleStatusChange = (event: SelectChangeEvent<IncidentStatus>) => {
        setStatus(event.target.value as IncidentStatus);
    };

    const handleNotesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNotes(event.target.value);
    };

    const handleUpdateIncident = () => {
        // In a real application, we would make an API call here
        console.log('Update incident:', { id: incident.id, status, notes });
        setSnackbarOpen(true);
    };

    const getStatusColor = (status: IncidentStatus): "warning" | "primary" | "success" | "default" => {
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

    const getSeverityColor = (severity: SeverityLevel) => {
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

    const getFormattedStatus = (status: IncidentStatus) => {
        switch (status) {
            case 'pending':
                return 'Pending';
            case 'in_progress':
                return 'In Progress';
            case 'resolved':
                return 'Resolved';
            default:
                return status;
        }
    };

    return (
        <Box>
            <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                    <Paper
                        elevation={0}
                        sx={{
                            p: 3,
                            borderRadius: 2,
                            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                            mb: 3
                        }}
                    >
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
                            <Box>
                                <Typography variant="h5" component="h2" fontWeight={700} gutterBottom>
                                    {incident.type} Incident
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Reported on {new Date(incident.reportedAt).toLocaleString()}
                                </Typography>
                            </Box>
                            <Chip
                                label={getFormattedStatus(status)}
                                color={getStatusColor(status)}
                            />
                        </Box>

                        <Divider sx={{ my: 3 }} />

                        <Grid container spacing={4}>
                            <Grid item xs={12} sm={6}>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                    <Calendar size={18} style={{ marginRight: '8px', color: theme.palette.primary.main }} />
                                    <Typography variant="subtitle2" component="span">
                                        Date & Time:
                                    </Typography>
                                </Box>
                                <Typography variant="body1" paragraph>
                                    {new Date(incident.date).toLocaleString()}
                                </Typography>
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                    <MapPin size={18} style={{ marginRight: '8px', color: theme.palette.primary.main }} />
                                    <Typography variant="subtitle2" component="span">
                                        Location:
                                    </Typography>
                                </Box>
                                <Typography variant="body1" paragraph>
                                    {incident.location}
                                </Typography>
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                    <AlertCircle size={18} style={{ marginRight: '8px', color: getSeverityColor(incident.severityLevel) }} />
                                    <Typography variant="subtitle2" component="span">
                                        Severity Level:
                                    </Typography>
                                </Box>
                                <Typography variant="body1" fontWeight={500} paragraph>
                                    {incident.severityLevel.charAt(0).toUpperCase() + incident.severityLevel.slice(1)}
                                </Typography>
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                    <Clock size={18} style={{ marginRight: '8px', color: theme.palette.primary.main }} />
                                    <Typography variant="subtitle2" component="span">
                                        Last Updated:
                                    </Typography>
                                </Box>
                                <Typography variant="body1" paragraph>
                                    {new Date(incident.updatedAt).toLocaleString()}
                                </Typography>
                            </Grid>
                        </Grid>

                        <Box sx={{ mt: 3 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <FileText size={18} style={{ marginRight: '8px', color: theme.palette.primary.main }} />
                                <Typography variant="subtitle2" component="span">
                                    Description:
                                </Typography>
                            </Box>
                            <Typography variant="body1" paragraph>
                                {incident.description}
                            </Typography>
                        </Box>

                        {incident.evidenceFile && (
                            <Box sx={{ mt: 3 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                    <FileText size={18} style={{ marginRight: '8px', color: theme.palette.primary.main }} />
                                    <Typography variant="subtitle2" component="span">
                                        Evidence:
                                    </Typography>
                                </Box>
                                <Button
                                    variant="outlined"
                                    size="small"
                                    startIcon={<FileText size={16} />}
                                >
                                    View Attachment
                                </Button>
                            </Box>
                        )}
                    </Paper>

                    <Card
                        elevation={0}
                        sx={{
                            p: 3,
                            borderRadius: 2,
                            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                        }}
                    >
                        <CardContent sx={{ p: 0 }}>
                            <Typography variant="h6" fontWeight={600} gutterBottom>
                                <MessageSquare size={18} style={{ marginRight: '8px', verticalAlign: 'text-bottom' }} />
                                Admin Notes & Updates
                            </Typography>
                            <Divider sx={{ my: 2 }} />

                            <TextField
                                label="Add notes or updates about this incident"
                                multiline
                                rows={4}
                                value={notes}
                                onChange={handleNotesChange}
                                fullWidth
                                sx={{ mb: 3 }}
                            />

                            <Button
                                variant="contained"
                                color="primary"
                                disabled={notes.trim() === ''}
                                sx={{ mr: 2 }}
                                onClick={handleUpdateIncident}
                                startIcon={<Check size={18} />}
                            >
                                Save Notes
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Card
                        elevation={0}
                        sx={{
                            p: 3,
                            borderRadius: 2,
                            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                            mb: 3,
                            position: 'sticky',
                            top: 24
                        }}
                    >
                        <CardContent sx={{ p: 0 }}>
                            <Typography variant="h6" fontWeight={600} gutterBottom>
                                Update Status
                            </Typography>

                            <FormControl fullWidth sx={{ mt: 2, mb: 3 }}>
                                <InputLabel id="status-label">Status</InputLabel>
                                <Select
                                    labelId="status-label"
                                    id="status"
                                    value={status}
                                    label="Status"
                                    onChange={handleStatusChange}
                                >
                                    <MenuItem value="pending">Pending</MenuItem>
                                    <MenuItem value="in_progress">In Progress</MenuItem>
                                    <MenuItem value="resolved">Resolved</MenuItem>
                                </Select>
                            </FormControl>

                            <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                onClick={handleUpdateIncident}
                                sx={{ mb: 2 }}
                            >
                                Update Status
                            </Button>

                            <Alert severity="info" sx={{ mt: 2 }}>
                                Changing the status will notify the reporting user about the progress of their incident.
                            </Alert>
                        </CardContent>
                    </Card>

                    <Card
                        elevation={0}
                        sx={{
                            p: 3,
                            borderRadius: 2,
                            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                        }}
                    >
                        <CardContent sx={{ p: 0 }}>
                            <Typography variant="h6" fontWeight={600} gutterBottom>
                                Actions
                            </Typography>
                            <Divider sx={{ my: 2 }} />

                            <Button
                                variant="outlined"
                                fullWidth
                                sx={{ mb: 2 }}
                            >
                                Print Report
                            </Button>

                            <Button
                                variant="outlined"
                                color="error"
                                fullWidth
                            >
                                Archive Incident
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={4000}
                onClose={() => setSnackbarOpen(false)}
                message="Incident updated successfully"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            />
        </Box>
    );
};

export default IncidentDetails;