import React, { JSX } from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';  // Import js-cookie

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

    const token = Cookies.get('token');

    if (!token) {
        return <Navigate to="/unauthorized" replace />;
    }

    try {
        const decoded: DecodedToken = jwtDecode(token);
        const isExpired = decoded.exp * 1000 < Date.now();

        if (isExpired) {
            Cookies.remove('token');
            return <Navigate to="/unauthorized" replace />;
        }

        const userRole = decoded["role"];

        if (userRole !== requiredRole && requiredRole !== 'User') {
            return <Navigate to="/unauthorized" replace />;
        }

        return (
            <>
                {children}
            </>
        );
    } catch (error) {
        console.error('Token not valid:', error);
        Cookies.remove('token');
        return <Navigate to="/unauthorized" replace />;
    }
};

export default ProtectedRoute;
