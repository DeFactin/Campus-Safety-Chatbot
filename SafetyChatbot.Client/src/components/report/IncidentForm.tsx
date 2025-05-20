import React, { useState } from 'react';
import {
    Box,
    TextField,
    MenuItem,
    Button,
    Typography,
    Paper,
    Stepper,
    Step,
    StepLabel,
    FormHelperText,
    FormControl,
    InputLabel,
    Select,
    Alert,
    useMediaQuery,
    useTheme
} from '@mui/material';
import { Upload, Clock, AlertCircle, Check } from 'lucide-react';
import { SeverityLevel } from '../../types/incident';
import Cookies from 'js-cookie';


const incidentTypes = [
    'Theft',
    'Vandalism',
    'Harassment',
    'Medical Emergency',
    'Facility Issue',
    'Suspicious Activity',
    'Noise Complaint',
    'Power Outage',
    'Other'
];

const locations = [
    'Library Building',
    'Faculty of Engineering',
    'Faculty of Arts',
    'Student Center',
    'Dormitory A',
    'Dormitory B',
    'Sports Hall',
    'Parking Lot A',
    'Parking Lot B',
    'Campus Entry Gate',
    'Other'
];

const IncidentForm: React.FC = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const [activeStep, setActiveStep] = useState(0);
    const [submitted, setSubmitted] = useState(false);
    const steps = ['Incident Details', 'Additional Information', 'Review & Submit'];

    const getTokenFromCookie = () => {
        const tokenMatch = document.cookie.match(/(^| )token=([^;]+)/);
        return tokenMatch ? tokenMatch[2] : null;
    };

    const token = getTokenFromCookie();

    const [formData, setFormData] = useState({
        reportedBy: '',       
        incidentType: '',     
        status: 'Pending',           
        description: '',      
        date: '',            
        location: '',         
        severity: '',         
    });


    const [errors, setErrors] = useState({
        type: false,
        location: false,
        date: false,
        description: false,
        severityLevel: false
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
        
        const { name, value } = e.target;
        console.log("handle input change" + name + value);
        setFormData({
            ...formData,
            [name as string]: value
        });

        // Clear error for this field
        setErrors({
            ...errors,
            [name as string]: false
        });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFormData({
                ...formData,
                evidenceFile: e.target.files[0].name
            });
        }
    };

    const validateStep = () => {
        let isValid = true;
        const newErrors = { ...errors };

        if (activeStep === 0) {
            if (!formData.incidentType) {
                newErrors.incidentType = true;
                isValid = false;
            }
            if (!formData.location) {
                newErrors.location = true;
                isValid = false;
            }
            if (!formData.date) {
                newErrors.date = true;
                isValid = false;
            }
        } else if (activeStep === 1) {
            if (!formData.description) {
                newErrors.description = true;
                isValid = false;
            }
            if (!formData.severity) {
                newErrors.severity = true;
                isValid = false;
            }
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleNext = () => {
        if (validateStep()) {
            if (activeStep === steps.length - 1) {
                handleSubmit();

            } else {
                setActiveStep((prevStep) => prevStep + 1);
            }
        }
    };

    const handleBack = () => {
        setActiveStep((prevStep) => prevStep - 1);
    };

    const handleSubmit = async () => {
        try {
            console.log(JSON.stringify(formData));
            console.log(token);
            console.log("nesto1");

            const response = await fetch('/api/incidentreports', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            console.log("nesto2");
            if (response.ok) {
                const result = await response.json();
                console.log("Submitted successfully:", result);
            } else {
                console.error("Failed to submit:", response.statusText);
            }
        } catch (error) {
            console.error("Error during submission:", error);
        }

        setSubmitted(true);
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

    if (submitted) {
        return (
            <Paper elevation={3} sx={{ p: 4, borderRadius: 2, maxWidth: 800, mx: 'auto' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 3 }}>
                    <Box
                        sx={{
                            display: 'flex',
                            p: 2,
                            borderRadius: '50%',
                            bgcolor: 'success.light',
                            color: 'success.dark',
                            mb: 3
                        }}
                    >
                        <Check size={40} />
                    </Box>
                    <Typography variant="h4" component="h2" fontWeight={600} gutterBottom>
                        Incident Report Submitted
                    </Typography>
                    <Typography variant="body1" color="text.secondary" paragraph sx={{ textAlign: 'center' }}>
                        Thank you for submitting your incident report. Your report has been logged successfully and our team will review it shortly.
                    </Typography>
                    <Typography variant="body1" fontWeight={500} paragraph>
                        Reference Number: INC-{Math.floor(Math.random() * 10000).toString().padStart(4, '0')}
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {
                            setSubmitted(false);
                            setActiveStep(0);
                            setFormData({
                                reportedBy: '',
                                incidentType: '',
                                status: 'Pending',
                                description: '',
                                date: '',
                                location: '',
                                severity: '',
                            });
                        }}
                        sx={{ mt: 2 }}
                    >
                        Submit Another Report
                    </Button>
                </Box>
            </Paper>
        );
    }

    return (
        <Paper elevation={3} sx={{ p: { xs: 2, sm: 4 }, borderRadius: 2, maxWidth: 800, mx: 'auto' }}>
            <Stepper
                activeStep={activeStep}
                sx={{ mb: 4 }}
                alternativeLabel={!isMobile}
                orientation={isMobile ? 'vertical' : 'horizontal'}
            >
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>

            <Box sx={{ mt: 4 }}>
                {activeStep === 0 && (
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                        <Box>
                            <Typography variant="h6" component="h3" fontWeight={600} gutterBottom>
                                Basic Incident Information
                            </Typography>
                            <Typography variant="body2" color="text.secondary" paragraph>
                                Please provide the essential details about the incident.
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 3 }}>
                            <FormControl fullWidth error={errors.type} sx={{ flex: 1 }}>
                                <InputLabel id="incident-type-label">Incident Type *</InputLabel>
                                <Select
                                    labelId="incident-type-label"
                                    id="incident-type"
                                    name="incidentType"
                                    value={formData.incidentType}
                                    label="Incident Type *"
                                    onChange={handleInputChange}
                                >
                                    {incidentTypes.map((type) => (
                                        <MenuItem key={type} value={type}>{type}</MenuItem>
                                    ))}
                                </Select>
                                {errors.type && (
                                    <FormHelperText>Incident type is required</FormHelperText>
                                )}
                            </FormControl>
                            <FormControl fullWidth error={errors.location} sx={{ flex: 1 }}>
                                <InputLabel id="location-label">Location *</InputLabel>
                                <Select
                                    labelId="location-label"
                                    id="location"
                                    name="location"
                                    value={formData.location}
                                    label="Location *"
                                    onChange={handleInputChange}
                                >
                                    {locations.map((location) => (
                                        <MenuItem key={location} value={location}>{location}</MenuItem>
                                    ))}
                                </Select>
                                {errors.location && (
                                    <FormHelperText>Location is required</FormHelperText>
                                )}
                            </FormControl>
                        </Box>
                        <Box>
                            <TextField
                                id="date"
                                name="date"
                                label="Date and Time of Incident *"
                                type="datetime-local"
                                fullWidth
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                value={formData.date}
                                onChange={handleInputChange}
                                error={errors.date}
                                helperText={errors.date ? "Date and time are required" : ""}
                                inputProps={{
                                    max: new Date().toISOString().slice(0, 16)
                                }}
                            />
                        </Box>
                    </Box>
                )}

                {activeStep === 1 && (
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                        <Box>
                            <Typography variant="h6" component="h3" fontWeight={600} gutterBottom>
                                Incident Details
                            </Typography>
                            <Typography variant="body2" color="text.secondary" paragraph>
                                Please provide more details about what happened.
                            </Typography>
                        </Box>
                        <Box>
                            <TextField
                                id="description"
                                name="description"
                                label="Description *"
                                placeholder="Please describe what happened in as much detail as possible..."
                                multiline
                                rows={4}
                                fullWidth
                                value={formData.description}
                                onChange={handleInputChange}
                                error={errors.description}
                                helperText={errors.description ? "Description is required" : ""}
                            />
                        </Box>
                        <Box>
                            <FormControl fullWidth error={errors.severityLevel}>
                                <InputLabel id="severity-label">Severity Level *</InputLabel>
                                <Select
                                    labelId="severity-label"
                                    id="severityLevel"
                                    name="severity"
                                    value={formData.severity}
                                    label="Severity Level *"
                                    onChange={handleInputChange}
                                    startAdornment={formData.severity ? (
                                        <AlertCircle
                                            size={18}
                                            color={getSeverityColor(formData.severity)}
                                            style={{ marginRight: '8px' }}
                                        />
                                    ) : undefined}
                                >
                                    <MenuItem value="high">High</MenuItem>
                                    <MenuItem value="medium">Medium</MenuItem>
                                    <MenuItem value="low">Low</MenuItem>
                                </Select>
                                {errors.severityLevel && (
                                    <FormHelperText>Severity level is required</FormHelperText>
                                )}
                            </FormControl>
                        </Box>
                        <Box>
                            <Typography variant="subtitle2" gutterBottom>
                                Evidence Attachment (Optional)
                            </Typography>
                            <Button
                                variant="outlined"
                                component="label"
                                startIcon={<Upload size={18} />}
                                sx={{ mt: 1 }}
                            >
                                Upload Evidence
                                <input
                                    type="file"
                                    hidden
                                    accept="image/*, application/pdf"
                                    onChange={handleFileChange}
                                />
                            </Button>
                            {formData.evidenceFile && (
                                <Typography variant="body2" sx={{ mt: 1 }}>
                                    Selected file: {formData.evidenceFile}
                                </Typography>
                            )}
                        </Box>
                    </Box>
                )}

                {activeStep === 2 && (
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                        <Box>
                            <Typography variant="h6" component="h3" fontWeight={600} gutterBottom>
                                Review Your Report
                            </Typography>
                            <Typography variant="body2" color="text.secondary" paragraph>
                                Please review the information below before submitting your report.
                            </Typography>
                            <Alert severity="info" sx={{ mb: 2 }}>
                                Once submitted, you will not be able to edit this report. Please ensure all information is accurate.
                            </Alert>
                        </Box>

                        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 3 }}>
                            <Box sx={{ flex: 1 }}>
                                <Typography variant="subtitle2" color="text.secondary">
                                    Incident Type
                                </Typography>
                                <Typography variant="body1" fontWeight={500} paragraph>
                                    {formData.type}
                                </Typography>
                            </Box>
                            <Box sx={{ flex: 1 }}>
                                <Typography variant="subtitle2" color="text.secondary">
                                    Location
                                </Typography>
                                <Typography variant="body1" fontWeight={500} paragraph>
                                    {formData.location}
                                </Typography>
                            </Box>
                        </Box>

                        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 3 }}>
                            <Box sx={{ flex: 1 }}>
                                <Typography variant="subtitle2" color="text.secondary">
                                    Date & Time
                                </Typography>
                                <Typography variant="body1" fontWeight={500} paragraph>
                                    {formData.date ? new Date(formData.date).toLocaleString() : ''}
                                </Typography>
                            </Box>
                            <Box sx={{ flex: 1 }}>
                                <Typography variant="subtitle2" color="text.secondary">
                                    Severity Level
                                </Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <AlertCircle
                                        size={18}
                                        color={getSeverityColor(formData.severity)}
                                        style={{ marginRight: '8px' }}
                                    />
                                    <Typography variant="body1" fontWeight={500} paragraph>
                                        {formData.severity.charAt(0).toUpperCase() + formData.severity.slice(1)}
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>

                        <Box>
                            <Typography variant="subtitle2" color="text.secondary">
                                Description
                            </Typography>
                            <Typography variant="body1" paragraph>
                                {formData.description}
                            </Typography>
                        </Box>

                        {formData.evidenceFile && (
                            <Box>
                                <Typography variant="subtitle2" color="text.secondary">
                                    Evidence Attached
                                </Typography>
                                <Typography variant="body1" paragraph>
                                    {formData.evidenceFile}
                                </Typography>
                            </Box>
                        )}
                    </Box>
                )}

                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                    <Button
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        sx={{ mr: 1 }}
                    >
                        Back
                    </Button>
                    <Button
                        variant="contained"
                        color={activeStep === steps.length - 1 ? "warning" : "primary"}
                        onClick={handleNext}
                        startIcon={activeStep === steps.length - 1 ? <Check size={18} /> : undefined}
                    >
                        {activeStep === steps.length - 1 ? 'Submit Report' : 'Continue'}
                    </Button>
                </Box>
            </Box>
        </Paper>
    );
};

export default IncidentForm;