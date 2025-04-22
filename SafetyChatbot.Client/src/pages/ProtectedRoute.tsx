import React, { JSX, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { Snackbar } from '@mui/material';

type Props = {
    children: JSX.Element;
    requiredRole: string;
};

type DecodedToken = {
    name?: string;
    email?: string;
    exp: number;
    [key: string]: any; // omogućava fleksibilan pristup claim-ovima
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
            setSnackbarMessage('Sesija je istekla. Prijavite se ponovo.');
            setOpenSnackbar(true);
            return <Navigate to="/unauthorized" replace />;
        }

        const userRole = decoded["role"];

        if (userRole !== requiredRole && requiredRole !== 'User') {
            setSnackbarMessage('Nemate ovlasti za pristup ovoj stranici.');
            setOpenSnackbar(true);
            return <Navigate to="/unauthorized" replace />;
        }

        return (
            <>
                {children}
                <Snackbar
                    open={openSnackbar}
                    autoHideDuration={4000}
                    onClose={() => setOpenSnackbar(false)}
                    message={snackbarMessage}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                />
            </>
        );
    } catch (error) {
        console.error('Token nije validan:', error);
        localStorage.removeItem('token');
        setSnackbarMessage('Sesija nije valjana. Prijavite se ponovo.');
        setOpenSnackbar(true);
        return <Navigate to="/unauthorized" replace />;
    }
};

export default ProtectedRoute;
