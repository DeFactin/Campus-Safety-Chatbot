import React, { useEffect, useState } from 'react';
import {
    AppBar,
    Box,
    Toolbar,
    Typography,
    Button,
    IconButton,
    Drawer,
    List,
    ListItem,
    ListItemText,
    Container,
    useMediaQuery,
    useTheme,
    Avatar,
    Chip,
    Divider
} from '@mui/material';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, LogOut } from 'lucide-react';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';

type DecodedToken = {
    name: string;
    email: string;
    role: string;
    exp: number;
};

const Navbar: React.FC = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const location = useLocation();
    const navigate = useNavigate();

    const [username, setUsername] = useState<string | null>(null);
    const [role, setRole] = useState<string | null>(null);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const token = params.get('token');

        if (token) {
            Cookies.set('token', token, { expires: 1 });
            try {
                const decoded: DecodedToken = jwtDecode(token);
                const cleanName = decoded.name.split(' ')[0];
                setUsername(cleanName);
                setRole(decoded.role);
            } catch (err) {
                console.error('Invalid token:', err);
            }
            navigate(location.pathname, { replace: true });
        } else {
            const storedToken = Cookies.get('token');
            if (storedToken) {
                try {
                    const decoded: DecodedToken = jwtDecode(storedToken);
                    const cleanName = decoded.name.split(' ')[0];
                    setUsername(cleanName);
                    setRole(decoded.role);
                } catch {
                    Cookies.remove('token');
                }
            }
        }
    }, [location, navigate]);

    const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
    const handleLogout = () => {
        Cookies.remove('token');
        navigate('/');
        window.location.reload();
    };

    // Only show Home for non-logged in users
    const getNavItems = () => {
        if (!username) {
            return [{}];
        }
        return [
            { name: 'Home', path: '/' },
            { name: 'Report Incident', path: '/report' },
            ...(role === 'Admin' ? [{ name: 'Admin Dashboard', path: '/admin' }] : [])
        ];
    };

    const navItems = getNavItems();

    const drawer = (
        <Box sx={{ width: 280 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 3 }}>
                <Typography variant="h6" sx={{ color: 'primary.main', fontWeight: 700 }}>
                    IUS Campus Safety Chatbot
                </Typography>
                <IconButton onClick={handleDrawerToggle}>
                    <X size={24} />
                </IconButton>
            </Box>
            <Divider />
            <List>
                {navItems.map((item) => (
                    <ListItem
                        key={item.name}
                        component={RouterLink}
                        to={item.path}
                        selected={location.pathname === item.path}
                        sx={{
                            px: 3,
                            '&.Mui-selected': {
                                backgroundColor: 'rgba(33, 61, 115, 0.08)',
                                borderLeft: `3px solid ${theme.palette.primary.main}`
                            },
                            '&:hover': {
                                backgroundColor: 'rgba(33, 61, 115, 0.04)'
                            }
                        }}
                    >
                        <ListItemText
                            primary={item.name}
                            primaryTypographyProps={{ fontWeight: 500 }}
                        />
                    </ListItem>
                ))}
            </List>
            <Divider />
            <Box sx={{ p: 3 }}>
                {username ? (
                    <>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                                {username.charAt(0).toUpperCase()}
                            </Avatar>
                            <Box>
                                <Typography fontWeight={600}>{username}</Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {role === 'Admin' ? 'Administrator' : 'User'}
                                </Typography>
                            </Box>
                        </Box>
                        <Button
                            fullWidth
                            variant="outlined"
                            color="error"
                            startIcon={<LogOut size={18} />}
                            onClick={handleLogout}
                            sx={{ mt: 2 }}
                        >
                            Sign Out
                        </Button>
                    </>
                ) : (
                    <Button
                        fullWidth
                        variant="contained"
                        color="error" // Changed to error (red)
                        href="https://localhost:7084/signin"
                        sx={{ mt: 2 }}
                    >
                        Log In {/* Changed text to Log In */}
                    </Button>
                )}
            </Box>
        </Box>
    );

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar
                position="fixed"
                color="default"
                elevation={1}
                sx={{
                    backgroundColor: 'background.paper',
                    borderBottom: `1px solid ${theme.palette.divider}`
                }}
            >
                <Container maxWidth="xl">
                    <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 1, sm: 2 } }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Box
                                component="img"
                                src="/logoDark.png"
                                alt="Logo"
                                sx={{ height: 36, width: 'auto' }}
                            />
                            <Typography
                                variant="h6"
                                component={RouterLink}
                                to="/"
                                sx={{
                                    ml: 2,
                                    fontWeight: 700,
                                    color: 'primary.main',
                                    textDecoration: 'none',
                                    display: { xs: 'none', md: 'block' }
                                }}
                            >
                                IUS Campus Safety Chatbot
                            </Typography>
                        </Box>

                        {isMobile ? (
                            <IconButton
                                color="inherit"
                                onClick={handleDrawerToggle}
                                sx={{ color: 'text.primary' }}
                            >
                                <Menu />
                            </IconButton>
                        ) : (
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                {navItems.map((item) => (
                                    <Button
                                        key={item.name}
                                        component={RouterLink}
                                        to={item.path}
                                        sx={{
                                            color: location.pathname === item.path
                                                ? 'primary.main'
                                                : 'text.secondary',
                                            fontWeight: location.pathname === item.path ? 600 : 500,
                                            '&:hover': {
                                                color: 'primary.main',
                                                backgroundColor: 'rgba(33, 61, 115, 0.04)'
                                            }
                                        }}
                                    >
                                        {item.name}
                                    </Button>
                                ))}

                                {username ? (
                                    <>
                                            <Divider orientation="vertical" flexItem sx={{ mx: 1, height: 40 }} />
                                            <Chip
                                                avatar={
                                                    <Avatar sx={{
                                                        bgcolor: 'warning.main',                                                       
                                                    }}>
                                                        {username.charAt(0).toUpperCase()}
                                                    </Avatar>
                                                }
                                                label={
                                                    <Box>
                                                        <Typography variant="subtitle2">{username}</Typography>
                                                        <Typography variant="caption" color="text.secondary">
                                                            {role}
                                                        </Typography>
                                                    </Box>
                                                }
                                               
                                                sx={{
                                                   
                                                    backgroundColor: 'white',
                                                    '.MuiChip-label': { pr: 1 }
                                                }}
                                            />
                                        <IconButton
                                            color="error"
                                            onClick={handleLogout}
                                            sx={{
                                                ml: 1,
                                                '&:hover': {
                                                    backgroundColor: 'rgba(244, 67, 54, 0.08)'
                                                }
                                            }}
                                        >
                                            <LogOut size={20} />
                                        </IconButton>
                                    </>
                                ) : (
                                    <Button
                                        variant="contained"
                                        color="error"
                                        href="https://localhost:7084/signin"
                                        sx={{ ml: 2 }}
                                    >
                                        Log In {/* Changed text to Log In */}
                                    </Button>
                                )}
                            </Box>
                        )}
                    </Toolbar>
                </Container>
            </AppBar>

            <Drawer
                anchor="right"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                sx={{
                    '& .MuiDrawer-paper': {
                        width: 280,
                        boxSizing: 'border-box',
                    },
                }}
            >
                {drawer}
            </Drawer>

            <Toolbar /> {/* Spacer for content */}
        </Box>
    );
};

export default Navbar;