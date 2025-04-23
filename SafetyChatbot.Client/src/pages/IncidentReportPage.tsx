import { Box, Button, Typography } from '@mui/material'
import React, { useState } from 'react'
import Header from '../components/Header'
import { createIncident } from '../services/ApiService'

const IncidentReportPage = () => {
    const [incidentType, setIncidentType] = useState('')
    const [description, setDescription] = useState('')
    const [date, setDate] = useState('')
    const [location, setLocation] = useState('')
    const [severityLevel, setSeverityLevel] = useState<'low' | 'medium' | 'high' | ''>('')
    const [file, setFile] = useState<File | null>(null)

    const handleSubmit = async () => {
        try {
            if (!incidentType || !description || !date || !location || !severityLevel) {
                alert('Please fill all required fields')
                return
            }

            const newIncident = {
                incidentType,
                description,
                date,
                location,
                severityLevel
            }

            const response = await createIncident(newIncident)
            alert('Incident submitted successfully!')
            console.log(response)
            // Optional: clear the form here
        } catch (error) {
            console.error('Error submitting incident:', error)
            alert('Failed to submit incident')
        }
    }

    return (
        <Box>
            <Header />

            <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
                <Box
                    sx={{
                        width: { xs: '100%', md: '900px' },
                        backgroundColor: 'primary_red.main',
                        boxShadow: 3,
                        overflow: 'hidden',
                        marginTop: '40px',
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: { xs: 'column', md: 'row' },
                            p: 1,
                            alignItems: 'stretch',
                        }}
                    >
                        {/* Label Side */}
                        <Box
                            sx={{
                                minWidth: '220px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: 'blue2.main',
                            }}
                        >
                            <Typography
                                variant="h3"
                                sx={{
                                    fontFamily: '"Jersey 25"',
                                    color: 'white',
                                    px: 2,
                                    py: 1,
                                    textAlign: 'left',
                                }}
                            >
                                INCIDENT<br />REPORT<br />FORM
                            </Typography>
                        </Box>

                        {/* Form Side */}
                        <Box
                            sx={{
                                backgroundColor: 'blue2.main',
                                color: 'white',
                                p: 2,
                                flex: 1,
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 3,
                            }}
                        >
                            {/* Incident Type */}
                            <Box>
                                <Typography variant="h2" sx={labelStyle}>
                                    <span style={{ color: 'red' }}>*</span> Incident type:
                                </Typography>
                                <input
                                    type="text"
                                    value={incidentType}
                                    onChange={(e) => setIncidentType(e.target.value)}
                                    style={inputStyle}
                                />
                            </Box>

                            {/* Description */}
                            <Box>
                                <Typography variant="h2" sx={labelStyle}>
                                    <span style={{ color: 'red' }}>*</span> Description:
                                </Typography>
                                <textarea
                                    rows={4}
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    style={{ ...inputStyle, resize: 'none' }}
                                />
                            </Box>

                            {/* Date and Location */}
                            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                                <Box sx={{ flex: 1 }}>
                                    <Typography variant="h2" sx={labelStyle}>Date:</Typography>
                                    <input
                                        type="date"
                                        value={date}
                                        onChange={(e) => setDate(e.target.value)}
                                        style={inputStyle}
                                    />
                                </Box>
                                <Box sx={{ flex: 1 }}>
                                    <Typography variant="h2" sx={labelStyle}>Location:</Typography>
                                    <input
                                        type="text"
                                        value={location}
                                        onChange={(e) => setLocation(e.target.value)}
                                        style={inputStyle}
                                    />
                                </Box>
                            </Box>

                            {/* Severity Level */}
                            <Box>
                                <Typography variant="h2" sx={labelStyle}>
                                    <span style={{ color: 'red' }}>*</span> Severity Level:
                                </Typography>
                                <Box sx={{ display: 'flex', gap: 8, mt: 2 }}>
                                    {['high', 'medium', 'low'].map((level) => (
                                        <label key={level}>
                                            <input
                                                type="radio"
                                                name="severity"
                                                value={level}
                                                checked={severityLevel === level}
                                                onChange={() => setSeverityLevel(level as 'low' | 'medium' | 'high')}
                                            />
                                            <span style={{
                                                marginLeft: '6px',
                                                fontFamily: '"Jersey 20"',
                                                fontSize: '1.5rem',
                                                color: level === 'high' ? 'red' : level === 'medium' ? 'orange' : 'yellow'
                                            }}>
                                                {level.charAt(0).toUpperCase() + level.slice(1)}
                                            </span>
                                        </label>
                                    ))}
                                </Box>
                            </Box>

                            {/* File Upload */}
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Typography variant="h2" sx={labelStyle}>Attach evidence:</Typography>
                                <input
                                    type="file"
                                    id="fileUpload"
                                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                                    style={{ display: 'none' }}
                                />
                                <label htmlFor="fileUpload">
                                    <Box
                                        component="span"
                                        sx={{
                                            display: 'inline-block',
                                            backgroundColor: 'white',
                                            color: 'blue2.main',
                                            fontFamily: '"Jersey 20"',
                                            fontSize: '1.5rem',
                                            padding: '6px 10px',
                                            borderRadius: '2px',
                                            cursor: 'pointer',
                                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                                            '&:hover': {
                                                backgroundColor: '#f0f0f0',
                                            },
                                        }}
                                    >
                                        Choose File
                                    </Box>
                                </label>
                            </Box>

                            {/* Submit Button */}
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <Button
                                    variant="contained"
                                    onClick={handleSubmit}
                                    sx={{
                                        fontFamily: '"Jersey 20"',
                                        color: 'white',
                                        fontSize: {
                                            xs: '0.5rem', sm: '1.25rem', md: '1rem', lg: '24px',
                                        },
                                        backgroundColor: 'primary_red.main',
                                        px: 4,
                                        py: 1.5,
                                        '&:hover': {
                                            backgroundColor: 'severity_red.main',
                                        },
                                    }}
                                >
                                    SEND
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

// Shared styles
const labelStyle = {
    fontFamily: '"Jersey 20"',
    color: 'white',
    textAlign: 'left',
    fontSize: {
        xs: '0.5rem', sm: '1.25rem', md: '1rem', lg: '24px'
    },
    mb: 1,
}

const inputStyle = {
    width: '100%',
    padding: '12px',
    borderRadius: '2px',
    border: 'none',
    outline: 'none',
    boxSizing: 'border-box' as const,
}

export default IncidentReportPage
