import React, { useEffect, useState } from 'react'
import './App.css'
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme/theme';
import { getGuidelines } from './services/ApiService'  // Importing from ApiService
import { Table, TableHead, TableBody, TableRow, TableCell, Typography, CircularProgress, Button } from '@mui/material'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SafetyGuidelinesPage from './pages/SafetyGuidelinesPage';
import HomePage from './pages/HomePage';

const App = () => {   
    return (
        <div>
            <ThemeProvider theme={theme}>
                <Router>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/safety-guidelines" element={<SafetyGuidelinesPage />} />
                        
                    </Routes>
                </Router>
            </ThemeProvider>
        </div>
    )   
}

export default App
