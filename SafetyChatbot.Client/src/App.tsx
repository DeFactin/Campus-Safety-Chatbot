import React, { useEffect, useState } from 'react'
import './App.css'
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme/theme';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SafetyGuidelinesPage from './pages/SafetyGuidelinesPage';
import HomePage from './pages/HomePage';
import AdminPage from './pages/AdminPage';
import IncidentDetailsPage from './pages/IncidentDetailsPage';

const App = () => {   
    return (
        <div>
            <ThemeProvider theme={theme}>
                <Router>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/admin" element={<AdminPage />} />
                        <Route path="/admin/:id" element={<IncidentDetailsPage />} />
                        <Route path="/safety-guidelines" element={<SafetyGuidelinesPage />} />
                        
                    </Routes>
                </Router>
            </ThemeProvider>
        </div>
    )   
}

export default App
