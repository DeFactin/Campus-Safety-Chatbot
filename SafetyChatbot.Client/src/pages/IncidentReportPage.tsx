import React from 'react';
import { Box, Container } from '@mui/material';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import PageHeader from '../components/common/PageHeader';
import IncidentForm from '../components/report/IncidentForm';

const ReportPage: React.FC = () => {
    return (
        <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Navbar />

            <Container component="main" sx={{ flexGrow: 1, py: 6 }}>
                <PageHeader
                    title="Report an Incident"
                    subtitle="Please provide details about the incident you wish to report. All information will be kept confidential and reviewed by campus safety personnel."
                    breadcrumbs={[
                        { name: 'Home', path: '/' },
                        { name: 'Report Incident' }
                    ]}
                />

                <IncidentForm />
            </Container>

            <Footer />
        </Box>
    );
};

export default ReportPage;