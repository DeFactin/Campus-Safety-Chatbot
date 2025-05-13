import React, { useState, useEffect } from 'react';
import { Box, Container, Button, CircularProgress } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import PageHeader from '../components/common/PageHeader';
import IncidentDetails from '../components/admin/IncidentDetails';
import { Incident, IncidentStatus, SeverityLevel } from '../types/incident';

const IncidentDetailsPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [incident, setIncident] = useState<Incident | null>(null);
    const [status, setStatus] = useState<string>('');

    useEffect(() => {
        const fetchIncident = async () => {
            try {
                const response = await fetch('/api/incidentreports/${id}');
                const data: Incident = await response.json();
                setIncident(data);
                setStatus(data.status);
            } catch (error) {
                console.error("Failed to fetch incident:", error);
            }
        };
        fetchIncident();
    }, [id]);



    return (
        <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Navbar />

            <Container component="main" sx={{ flexGrow: 1, py: 6 }}>
                <Button
                    startIcon={<ArrowLeft size={18} />}
                    onClick={() => navigate(-1)}
                    sx={{ mb: 2 }}
                >
                    Back to Dashboard
                </Button>

                <PageHeader
                    title="Incident Details"
                    subtitle="View and manage the details of this incident report."
                    breadcrumbs={[
                        { name: 'Home', path: '/' },
                        { name: 'Admin Dashboard', path: '/admin' },
                        { name: 'Incident Details' }
                    ]}
                />


            </Container>

            <Footer />
        </Box>
    );
};

export default IncidentDetailsPage;