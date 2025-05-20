import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Box,
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
import {
    AlertCircle,
    MessageSquare,
    Clock,
    Calendar,
    MapPin,
    FileText,
    Check
} from 'lucide-react';
import { Incident, IncidentStatus, SeverityLevel } from '../../types/incident';
import { jsPDF } from "jspdf";

interface IncidentDetailsProps {
    incident: Incident;
}
const loadLogoAsBase64 = (url: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "Anonymous"; // Bitno za lokalne slike
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx?.drawImage(img, 0, 0);
      const dataURL = canvas.toDataURL("image/png");
      resolve(dataURL);
    };
    img.onerror = reject;
    img.src = url;
  });
};


const IncidentDetails: React.FC = () => {

    const handlePrintReport = async () => {
        if (!incident) return;

        const doc = new jsPDF();
        const marginLeft = 20;
        const topMargin = 20;
        const lineSpacing = 8;

        // Font i velièina
        doc.setFont("helvetica", "bold");
        doc.setFontSize(18);

        // Pripremi logo
        let logoHeight = 0;
        try {
            const logo = new Image();
            logo.src = "/logoDark.png";
            await new Promise((res, rej) => {
                logo.onload = res;
                logo.onerror = rej;
            });

            const targetHeight = 20; // visina da odgovara tekstu
            const aspectRatio = logo.width / logo.height;
            const logoWidth = targetHeight * aspectRatio;
            logoHeight = targetHeight;

            const xLogo = 190 - logoWidth; // desno poravnato
            doc.addImage(logo, "PNG", xLogo, topMargin, logoWidth, logoHeight);
        } catch (error) {
            console.error("Logo nije uèitan:", error);
        }

        // Naslov u liniji s logom
        doc.text("Incident Report", marginLeft, topMargin + logoHeight * 0.8);

        // Linija ispod
        const yLine = topMargin + logoHeight + 4;
        doc.setLineWidth(0.5);
        doc.line(marginLeft, yLine, 190, yLine);

        // Dalji sadržaj
        let y = yLine + lineSpacing;

        doc.setFontSize(12);
        const addField = (label: string, value: string) => {
            doc.setFont("helvetica", "bold");
            doc.text(`${label}:`, marginLeft, y);
            doc.setFont("helvetica", "normal");
            doc.text(value, marginLeft + 40, y);
            y += lineSpacing;
        };

        addField("Incident ID", String(incident.id));
        addField("Type", incident.incidentType);
        addField("Reported By", incident.reportedBy);
        addField("Status", incident.status);
        addField("Severity", incident.severity);
        addField("Location", incident.location);
        addField("Date", new Date(incident.date).toLocaleString());
        addField("Last Updated", new Date(incident.lastUpdated).toLocaleString());

        y += lineSpacing;

        doc.setFont("helvetica", "bold");
        doc.text("Description:", marginLeft, y);
        y += lineSpacing;
        doc.setFont("helvetica", "normal");
        const descriptionLines = doc.splitTextToSize(incident.description, 170);
        doc.text(descriptionLines, marginLeft, y);
        y += descriptionLines.length * lineSpacing;

        if (notes.trim() !== "") {
            y += lineSpacing;
            doc.setFont("helvetica", "bold");
            doc.text("Admin Notes:", marginLeft, y);
            y += lineSpacing;
            doc.setFont("helvetica", "normal");
            const notesLines = doc.splitTextToSize(notes.trim(), 170);
            doc.text(notesLines, marginLeft, y);
        }

        doc.save(`Incident_Report_${incident.id}.pdf`);
    };

    const theme = useTheme();
    //const [status, setStatus] = useState<IncidentStatus>(incident.status);
    const [notes, setNotes] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [incident, setIncident] = useState<Incident | null>(null);
    const [status, setStatus] = useState<string>('');

    useEffect(() => {
        const fetchIncident = async () => {
            try {
                const response = await fetch(`/api/incidentreports/${id}`);
                const data: Incident = await response.json();
                setIncident(data);
                setStatus(data.status);
            } catch (error) {
                console.error("Failed to fetch incident:", error);
            }
        };
        fetchIncident();
    }, [id]);



    const handleStatusChange = (event: SelectChangeEvent<IncidentStatus>) => {
        setStatus(event.target.value as IncidentStatus);
    };

    const handleNotesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNotes(event.target.value);
    };

    const handleUpdateIncident = async () => {
        if (!incident) return;

        const updatedIncidentPayload = {
            reportedBy: incident.reportedBy,
            incidentType: incident.incidentType,
            description: incident.description,
            date: incident.date,
            location: incident.location,
            severity: incident.severity,
            status: status // <- updated
        };

        try {
            const response = await fetch(`/api/incidentreports/${incident.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedIncidentPayload)
            });

            if (!response.ok) {
                throw new Error('Failed to update incident');
            }

            const updatedIncident: Incident = await response.json();
            setIncident(updatedIncident);
            setSnackbarOpen(true);
        } catch (error) {
            console.error('Error updating incident:', error);
        }

        useEffect(() => {
            window.scrollTo(0, 0);
        }, []);
    };



    if (!incident) return <Typography>Loading...</Typography>;


    const getStatusColor = (status: IncidentStatus): 'warning' | 'primary' | 'success' | 'default' => {
        switch (status) {
            case 'Pending':
                return 'warning';
            case 'In Progress':
                return 'primary';
            case 'Resolved':
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
            case 'Pending':
            case 'In Progress':
            case 'Resolved':
                return status;
            default:
                return status;
        }
    };

    const getRandomRecentDate = (): string => {
        const now = new Date();
        const pastDate = new Date(now.getTime() - Math.random() * 30 * 24 * 60 * 60 * 1000);
        return pastDate.toISOString();
    };

    return (
        <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} gap={3}>
            {/* Main Content */}
            <Box flex={2}>
                <Paper
                    elevation={0}
                    sx={{
                        p: 3,
                        borderRadius: 2,
                        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                        mb: 3
                    }}
                >
                    <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={3}>
                        <Typography variant="h5" fontWeight={700} gutterBottom>
                            {incident.incidentType} Incident
                        </Typography>
                        <Chip label={getFormattedStatus(status)} color={getStatusColor(status)} />
                    </Box>

                    <Divider sx={{ my: 3 }} />

                    <Box display="flex" flexWrap="wrap" gap={4}>
                        <Box flex={1} minWidth={250}>
                            <Box display="flex" alignItems="center" mb={1}>
                                <Calendar size={18} style={{ marginRight: '8px', color: theme.palette.primary.main }} />
                                <Typography variant="subtitle2">Date & Time:</Typography>
                            </Box>
                            <Typography variant="body1">
                                {new Date(incident.date).toLocaleString()}
                            </Typography>
                        </Box>

                        <Box flex={1} minWidth={250}>
                            <Box display="flex" alignItems="center" mb={1}>
                                <MapPin size={18} style={{ marginRight: '8px', color: theme.palette.primary.main }} />
                                <Typography variant="subtitle2">Location:</Typography>
                            </Box>
                            <Typography variant="body1">{incident.location}</Typography>
                        </Box>

                        <Box flex={1} minWidth={250}>
                            <Box display="flex" alignItems="center" mb={1}>
                                <AlertCircle size={18} style={{ marginRight: '8px', color: getSeverityColor(incident.severity) }} />
                                <Typography variant="subtitle2">Severity Level:</Typography>
                            </Box>
                            <Typography variant="body1" fontWeight={500}>
                                {incident.severity.charAt(0).toUpperCase() + incident.severity.slice(1)}
                            </Typography>
                        </Box>

                        <Box flex={1} minWidth={250}>
                            <Box display="flex" alignItems="center" mb={1}>
                                <Clock size={18} style={{ marginRight: '8px', color: theme.palette.primary.main }} />
                                <Typography variant="subtitle2">Last Updated:</Typography>
                            </Box>
                            {new Date(incident.lastUpdated).toLocaleString()}
                        </Box>
                    </Box>

                    <Box mt={3}>
                        <Box display="flex" alignItems="center" mb={1}>
                            <FileText size={18} style={{ marginRight: '8px', color: theme.palette.primary.main }} />
                            <Typography variant="subtitle2">Description:</Typography>
                        </Box>
                        <Typography variant="body1">{incident.description}</Typography>
                    </Box>
                </Paper>

                {/* Notes Section */}
                <Card elevation={0} sx={{ p: 3, borderRadius: 2, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
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
                            onClick={handleUpdateIncident}
                            startIcon={<Check size={18} />}
                        >
                            Save Notes
                        </Button>
                    </CardContent>
                </Card>
            </Box>

            {/* Sidebar */}
            <Box flex={1} position="sticky" top={24}>
                <Card
                    elevation={0}
                    sx={{
                        p: 3,
                        borderRadius: 2,
                        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                        mb: 3
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
                                <MenuItem value="Pending">Pending</MenuItem>
                                <MenuItem value="In Progress">In Progress</MenuItem>
                                <MenuItem value="Resolved">Resolved</MenuItem>
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
                        boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
                    }}
                >
                    <CardContent sx={{ p: 0 }}>
                        <Typography variant="h6" fontWeight={600} gutterBottom>
                            Actions
                        </Typography>
                        <Divider sx={{ my: 2 }} />

                        <Button variant="outlined" fullWidth sx={{ mb: 2 }} onClick={handlePrintReport}>
                            Print Report
                        </Button>
                    </CardContent>
                </Card>
            </Box>

            {/* Snackbar */}
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
