import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Button,
    Select,
    MenuItem,
    Box,
    Typography,
    SelectChangeEvent
} from '@mui/material';
import Header from '../components/Header';
import Banner from '../components/Banner';

interface Incident {
    id: number;
    incidentType: string;
    date: string;
    location: string;
    severity: string;
    description: string;
    status: string;
}

const IncidentDetails: React.FC = () => {
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

    const handleStatusUpdate = async () => {
        try {
            await fetch(`/api/incidentreports/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status }),
            });
            alert('Status updated successfully!');
            navigate('/admin');
        } catch (error) {
            console.error("Failed to update status:", error);
        }
    };

    const handleChange = (e: SelectChangeEvent<string>) => {
        setStatus(e.target.value);
    };

    if (!incident) return <Typography>Loading...</Typography>;

    // Style for all field containers
    const fieldContainerStyle = {
        mb: 3,
        width: '100%'
    };

    // Style for field labels
    const fieldLabelStyle = {
        color: 'blue2.main',
        mb: 1,
        fontWeight: 'bold'
    };

    // Style for field value boxes
    const fieldValueStyle = {
        p: 2,
        border: '1px solid',
        borderColor: 'blue2.main',
        borderRadius: 1,
        color: 'blue1.main',
        minHeight: '56px', // Match TextField height
        display: 'flex',
        alignItems: 'center'
    };

    return (
        <Box>
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
                <Box sx={{
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
                        justifyContent: 'center',
                    }}>
                        <Typography
                            variant="h5"
                            sx={{
                                color: 'white',
                                fontFamily: '"Jersey 25"'
                            }}
                        >
                            Incident Details (ID: {id}, {incident.incidentType})
                        </Typography>
                    </Box>

                    <Box sx={{ p: 4 }}>
                        {/* Incident Type */}
                        <Box sx={fieldContainerStyle}>
                            <Typography variant="h5" sx={fieldLabelStyle }>Incident Type</Typography>
                            <Box sx={fieldValueStyle}>
                                {incident.incidentType}
                            </Box>
                        </Box>

                        {/* Description */}
                        <Box sx={fieldContainerStyle}>
                            <Typography variant="h5" sx={fieldLabelStyle}>Description</Typography>
                            <Box sx={{ ...fieldValueStyle }}>
                                {incident.description}
                            </Box>
                        </Box>

                        {/* Date and Location */}
                        <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                            {/* Date */}
                            <Box sx={{ ...fieldContainerStyle, flex: 1 }}>
                                <Typography variant="h5"  sx={fieldLabelStyle}>Date</Typography>
                                <Box sx={fieldValueStyle}>
                                    {incident.date}
                                </Box>
                            </Box>

                            {/* Location */}
                            <Box sx={{ ...fieldContainerStyle, flex: 1 }}>
                                <Typography variant="h5" sx={fieldLabelStyle}>Location</Typography>
                                <Box sx={fieldValueStyle}>
                                    {incident.location}
                                </Box>
                            </Box>
                        </Box>

                      

                        {/* Status Update Section */}
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            mt: 4
                        }}>
                            <Box sx={{
                                display: 'flex',
                                gap: 2,
                            }} >
                                <Typography variant="h5" sx={fieldLabelStyle}>CURRENT STATUS:</Typography>
                                <Select
                                    value={status}
                                    onChange={handleChange}
                                    sx={{
                                        width: '200px',
                                        '& .MuiOutlinedInput-notchedOutline': {
                                            borderColor: 'blue2.main',
                                            
                                        },
                                        '& .MuiSelect-select': {
                                            color: 'blue1.main'
                                        }
                                    }}
                                >
                                    <MenuItem value="Pending">Pending</MenuItem>
                                    <MenuItem value="In Progress">In Progress</MenuItem>
                                    <MenuItem value="Resolved">Resolved</MenuItem>
                                </Select>
                            </Box>
                            

                            <Button
                                variant="contained"
                                onClick={handleStatusUpdate}
                                sx={{
                                    backgroundColor: 'primary_red.main',
                                    typography: 'h5',
                                    '&:hover': {
                                        backgroundColor: 'primary_red.dark'
                                    }
                                }}
                            >
                                Update Status
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default IncidentDetails;