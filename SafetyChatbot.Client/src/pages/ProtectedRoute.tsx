import React, { JSX, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { Snackbar } from '@mui/material';

type Props = {
    children: JSX.Element;
    requiredRole: string;
};

type DecodedToken = {
    name: string;
    email: string;
    role: string;
    exp: number;
};

const ProtectedRoute: React.FC<Props> = ({ children, requiredRole }) => {
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const token = localStorage.getItem('token');

    if (!token) {
        return <Navigate to="/unauthorized" replace />;
    }

    try {
        const decoded: DecodedToken = jwtDecode(token);

        const isExpired = decoded.exp * 1000 < Date.now();
        if (isExpired) {
            localStorage.removeItem('token');
            setSnackbarMessage('Session expired. Please log in again.');
            setOpenSnackbar(true);
            return <Navigate to="/unauthorized" replace />;
        }

        if (decoded.role !== requiredRole && requiredRole !== 'User') {
            return <Navigate to="/unauthorized" replace />;
        }

        return children;
    } catch (error) {
        console.error('Token nije validan:', error);
        setSnackbarMessage('Invalid session. Please log in again.');
        setOpenSnackbar(true);
        return <Navigate to="/unauthorized" replace />;
    }
};

export default ProtectedRoute;
