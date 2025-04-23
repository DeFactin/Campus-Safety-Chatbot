import React, { useEffect, useState } from 'react'
import './App.css'
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme/theme';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SafetyGuidelinesPage from './pages/SafetyGuidelinesPage';
import HomePage from './pages/HomePage';
import AdminPage from './pages/AdminPage';
import IncidentDetailsPage from './pages/IncidentDetailsPage';
import ProtectedRoute from './pages/ProtectedRoute';
import UnauthorizedPage from './pages/UnathorizedPage';
import IncidentReportPage from './pages/IncidentReportPage';

const App = () => {
    return (
        <div>
            <ThemeProvider theme={theme}>
                <Router>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/unauthorized" element={<UnauthorizedPage />} /> { }
                        <Route
                            path="/safety-guidelines"
                            element={
                                <ProtectedRoute requiredRole="User">
                                    <SafetyGuidelinesPage />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/admin"
                            element={
                                <ProtectedRoute requiredRole="Admin">
                                    <AdminPage />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/admin/:id"
                            element={
                                <ProtectedRoute requiredRole="Admin">
                                    <IncidentDetailsPage />
                                </ProtectedRoute>
                            }
                        />
                    </Routes>
                    <Route path="/incident-report" element={
                        <ProtectedRoute requiredRole="User">
                            <IncidentReportPage />
                        </ProtectedRoute>} />
                </Router>
            </ThemeProvider>
        </div>
    );
};

export default App;