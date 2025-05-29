import React from 'react';
import { Box, Container } from '@mui/material';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import PageHeader from '../components/common/PageHeader';
import StatisticsOverview from '../components/admin/StatisticsOverview';
import IncidentsList from '../components/admin/IncidentsList';

const AdminDashboardPage: React.FC = () => {
    return (
        <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Navbar />

            <Container component="main" sx={{ flexGrow: 1, py: 6 }}>
                <PageHeader
                    title="Admin Dashboard"
                    subtitle="Monitor and manage incident reports across the campus. View statistics and respond to reported issues."
                    breadcrumbs={[
                        { name: 'Home', path: '/' },
                        { name: 'Admin Dashboard' }
                    ]}
                />

                <StatisticsOverview />
                <IncidentsList />
            </Container>

            <Footer />
        </Box>
    );
};

export default AdminDashboardPage;