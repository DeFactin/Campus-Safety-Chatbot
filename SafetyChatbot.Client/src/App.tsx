import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme/theme';

// Pages
import HomePage from './pages/HomePage';
import ReportPage from './pages/IncidentReportPage';
import AdminDashboardPage from './pages/AdminPage';
import IncidentDetailsPage from './pages/IncidentDetailsPage';
import ChatPage from './pages/ChatPage';
function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/report" element={<ReportPage />} />
                    <Route path="/admin" element={<AdminDashboardPage />} />
                    <Route path="/chat" element={<ChatPage />} />
                    <Route path="/admin/:id" element={<IncidentDetailsPage />} />
                    
                </Routes>
            </Router>
        </ThemeProvider>
    );
}

export default App;