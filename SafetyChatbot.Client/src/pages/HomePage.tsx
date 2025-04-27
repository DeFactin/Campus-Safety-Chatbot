import React from 'react';
import { Box, Container } from '@mui/material';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import HeroSection from '../components/home/HeroSection';
import InfoSection from '../components/home/InfoSection';
import StatisticsSection from '../components/home/StatisticsSection';

const HomePage: React.FC = () => {
    return (
        <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Navbar />

            <Box component="main" sx={{ flexGrow: 1 }}>
                <HeroSection />
                <InfoSection />
                <StatisticsSection />
            </Box>

            <Footer />
        </Box>
    );
};

export default HomePage;