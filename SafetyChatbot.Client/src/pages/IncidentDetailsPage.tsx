import React from 'react';
import { Box, Container, Button, CircularProgress } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import PageHeader from '../components/common/PageHeader';
import IncidentDetails from '../components/admin/IncidentDetails';
//import { mockIncidents } from '../data/mockData';

const IncidentDetailsPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    // Find the incident with the matching ID
   // const incident = mockIncidents.find((inc) => inc.id === id);

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

                {incident ? (
                    <IncidentDetails incident={incident} />
                ) : (
                    <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
                        <CircularProgress />
                    </Box>
                )}
            </Container>

            <Footer />
        </Box>
    );
};

export default IncidentDetailsPage;