import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme/theme';

// Pages
import HomePage from './pages/HomePage';
import ReportPage from './pages/IncidentReportPage';
import AdminDashboardPage from './pages/AdminPage';
import IncidentDetailsPage from './pages/IncidentDetailsPage';
import UnauthorizedPage from './pages/UnathorizedPage';
import ProtectedRoute from './pages/ProtectedRoute';

import ChatPage from './pages/ChatPage';
function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/unauthorized" element={<UnauthorizedPage />} /> { }
                    <Route path="/report" element={
                        <ProtectedRoute requiredRole="User">
                            <ReportPage />
                        </ProtectedRoute>} />
                    <Route path="/admin" element={
                        <ProtectedRoute requiredRole="Admin">
                            <AdminDashboardPage />
                        </ProtectedRoute>} />
                    <Route path="/admin/incidents/:id" element={
                        <ProtectedRoute requiredRole="Admin">
                            <IncidentDetailsPage />
                        </ProtectedRoute>
                    } />
                    <Route path="/chat" element={
                    <ProtectedRoute requiredRole="User">
                        <ChatPage />
                    </ProtectedRoute>} />

                    <Route path="/admin/:id" element={<IncidentDetailsPage />} />
                    
                </Routes>
            </Router>
        </ThemeProvider>
    );
}

export default App;