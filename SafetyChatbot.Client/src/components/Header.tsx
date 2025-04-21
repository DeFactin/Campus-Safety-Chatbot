import {
    Box,
    Typography,
    Button
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

type DecodedToken = {
    name: string;
    email: string;
    role: string;
    exp: number;
};

const Header = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [username, setUsername] = useState<string | null>(null);
    const [showError, setShowError] = useState(false);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const token = params.get('token');

        if (token) {
            localStorage.setItem('token', token);
            try {
                const decoded: DecodedToken = jwtDecode(token);
                const cleanName = decoded.name.replace(/\s*\(.*?\)\s*$/, '').trim();
                setUsername(cleanName);
            } catch (err) {
                console.error('Neispravan token:', err);
            }

            navigate(location.pathname, { replace: true });
        } else {
            const storedToken = localStorage.getItem('token');
            if (storedToken) {
                try {
                    const decoded: DecodedToken = jwtDecode(storedToken);
                    const cleanName = decoded.name.replace(/\s*\(.*?\)\s*$/, '').trim();
                    setUsername(cleanName);
                } catch {
                    localStorage.removeItem('token');
                }
            }
        }
    }, [location, navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setUsername(null);
        window.location.href = '/';
    };

    return (
        <>
            <Box
                sx={{
                    height: '200px',
                    backgroundColor: 'white',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    px: 4,
                }}
            >
                {/* lijeva strana - Logo + Naslov */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <Box
                        component="img"
                        src="/logoDark.png"
                        alt="University Logo"
                        sx={{ height: '80px', width: 'auto' }}
                    />

                    <Box>
                        <Typography
                            variant="h2"
                            sx={{
                                fontFamily: '"Jersey 20"',
                                color: 'blue1.main',
                                lineHeight: 1.2,
                            }}
                        >
                            International University of Sarajevo
                        </Typography>
                        <Typography
                            variant="h1"
                            sx={{
                                fontFamily: '"Jersey 25"',
                                color: 'blue2.main',
                                lineHeight: 1,
                            }}
                        >
                            Campus Safety Chatbot
                        </Typography>
                    </Box>
                </Box>

                {/* desna strana - Navigacija */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    {['Home', 'Safety Guidelines'].map((item) => (
                        <Box
                            key={item}
                            component={Link}
                            to={item === 'Home' ? '/' : '/safety-guidelines'}
                            sx={{
                                p: 2,
                                borderRadius: 1,
                                textAlign: 'center',
                                textDecoration: 'none',
                                '&:hover': {
                                    backgroundColor: '#f5f5f5',
                                    cursor: 'pointer',
                                },
                            }}
                        >
                            <Typography
                                variant="h6"
                                sx={{
                                    fontFamily: '"Jersey 15"',
                                    color: 'blue1.main',
                                }}
                            >
                                {item}
                            </Typography>
                        </Box>
                    ))}

                    {/* prikazivanje button-a za logovanje ili logout */}
                    {!username ? (
                        <>
                            <Button
                                variant="contained"
                                component={Link}
                                to="/register"
                                sx={{
                                    bgcolor: 'primary_red.main',
                                    fontFamily: '"Jersey 15"',
                                    color: 'white',
                                    px: 3,
                                    '&:hover': {
                                        bgcolor: 'severity_red.main',
                                    },
                                }}
                            >
                                Register
                            </Button>
                            <Button
                                variant="contained"
                                component="a"
                                href="https://localhost:7084/signin"
                                sx={{
                                    bgcolor: 'primary_red.main',
                                    fontFamily: '"Jersey 15"',
                                    color: 'white',
                                    px: 3,
                                    '&:hover': {
                                        bgcolor: 'severity_red.main',
                                    },
                                }}
                            >
                                Log In
                            </Button>
                        </>
                    ) : (
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 2,
                            }}
                        >
                            <Typography
                                variant="h6"
                                sx={{
                                    fontFamily: '"Jersey 15"',
                                    color: 'blue1.main',
                                }}
                            >
                                Welcome, {username}
                            </Typography>
                            <Button
                                variant="outlined"
                                onClick={handleLogout}
                                sx={{
                                    borderColor: 'primary_red.main',
                                    color: 'primary_red.main',
                                    fontFamily: '"Jersey 15"',
                                    px: 2,
                                    '&:hover': {
                                        borderColor: 'severity_red.main',
                                        color: 'severity_red.main',
                                    },
                                }}
                            >
                                Log Out
                            </Button>
                        </Box>
                    )}
                </Box>
            </Box>
        </>
    );
};

export default Header;
