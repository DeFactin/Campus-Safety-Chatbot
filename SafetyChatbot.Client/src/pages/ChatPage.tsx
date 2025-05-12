import React from 'react';
import { Box, Container } from '@mui/material';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import PageHeader from '../components/common/PageHeader';
import ChatInterface from '../components/chat/ChatInterface';

const ChatPage: React.FC = () => {
    return (
        <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Navbar />

            <Container component="main" sx={{ flexGrow: 1, py: 6 }}>
                <PageHeader
                    title="Campus Safety Assistant"
                    subtitle="Get real-time assistance and guidance for any safety-related concerns on campus."
                    breadcrumbs={[
                        { name: 'Home', path: '/' },
                        { name: 'Safety Assistant' }
                    ]}
                />

                <ChatInterface />
            </Container>

            <Footer />
        </Box>
    );
};

export default ChatPage;