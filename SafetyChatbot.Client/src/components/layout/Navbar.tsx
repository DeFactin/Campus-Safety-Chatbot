import React, { useEffect, useState } from 'react';
import {
    AppBar, Box, Toolbar, Typography, Button, IconButton, Drawer,
    List, ListItem, ListItemText, Container, useMediaQuery, useTheme,
    Avatar, Chip, Divider, Menu, MenuItem
} from '@mui/material';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import {X, LogOut } from 'lucide-react';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';
import {
    requestFirebaseToken
} from "../../services/firebase";
import {
    getNotifications,
    getUnreadNotifications,
    markAllNotificationsAsRead
} from "../../services/ApiService";
import NotificationBell from './NotificationBell';
import { messaging } from '../../services/firebase';
import { onMessage } from 'firebase/messaging';
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

    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const fetchAllNotifications = async () => {
        try {
            const savedNotifications = await getNotifications();
            setNotifications(savedNotifications);

            const unread = await getUnreadNotifications();
            setUnreadCount(unread.length);
        } catch (error) {
            console.error('Greška prilikom refetchanja notifikacija:', error);
        }
    };
    useEffect(() => {
        fetchAllNotifications();
    }, []);

    useEffect(() => {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.addEventListener('message', (event) => {
                if (event.data?.type === 'INCIDENT_STATUS_UPDATED') {
                    console.log('Received push-triggered message:', event.data.payload);

                    fetchAllNotifications();
                }
            });
        }
    }, []);


    useEffect(() => {
        async function fetchUnread() {
            try {
                const unreadNotifications = await getUnreadNotifications();
                setUnreadCount(unreadNotifications.length);
            } catch (error) {
                console.error(error);
            }
        }
        fetchUnread();
    }, []);

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

    useEffect(() => {
        const unsubscribe = onMessage(messaging, async (payload) => {
            await fetchAllNotifications();
        });

        return () => unsubscribe();
    }, []);



    const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
    const handleLogout = () => {
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

    const [hasPermission, setHasPermission] = useState(Notification.permission === 'granted');

    const handleNotificationClick = async () => {
        if (Notification.permission === 'granted') {
            return;
        }
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
            await requestFirebaseToken();
            setHasPermission(true);
        }
    };

    const handleBellClick = (event: React.MouseEvent<HTMLElement>) => {
        markAllNotificationsAsRead();
        setUnreadCount(0);
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => setAnchorEl(null);

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
                        <IconButton
                            color={hasPermission ? "primary" : "default"}
                            onClick={handleNotificationClick}
                            sx={{
                                '&:hover': {
                                    backgroundColor: 'rgba(25, 118, 210, 0.08)'
                                }
                            }}
                        >
                            <NotificationBell unreadCount={unreadCount} />
                        </IconButton>
                        <Button
                            fullWidth
                            variant="outlined"
                            color="error"
                            href="https://localhost:7084/signout"
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
                                <MenuIcon />
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
                                                <Avatar sx={{ bgcolor: 'warning.main' }}>
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
                                            color={hasPermission ? "primary" : "default"}
                                            onClick={(e) => {
                                                handleNotificationClick();
                                                handleBellClick(e);
                                            }}
                                            sx={{
                                                '&:hover': {
                                                    backgroundColor: 'rgba(25, 118, 210, 0.08)'
                                                }
                                            }}
                                        >
                                            <NotificationBell unreadCount={unreadCount} />
                                        </IconButton>

                                            <Menu
                                                anchorEl={anchorEl}
                                                open={Boolean(anchorEl)}
                                                onClose={handleMenuClose}
                                                PaperProps={{
                                                    style: {
                                                        width: '320px',
                                                        maxHeight: '400px',
                                                        overflowY: 'auto',
                                                        padding: '8px 0',
                                                    }
                                                }}
                                                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                                            >
                                                {notifications.length === 0 ? (
                                                    <MenuItem disabled sx={{ justifyContent: 'center' }}>
                                                        No notifications
                                                    </MenuItem>
                                                ) : (
                                                    notifications.map((notif) => (
                                                        <MenuItem
                                                            key={notif.id}
                                                            onClick={handleMenuClose}
                                                            sx={{
                                                                flexDirection: 'column',
                                                                alignItems: 'flex-start',
                                                                whiteSpace: 'normal',
                                                                wordBreak: 'break-word',
                                                                py: 1.5,
                                                                px: 2,
                                                                borderBottom: '1px solid rgba(0,0,0,0.08)',
                                                                '&:last-child': { borderBottom: 'none' }
                                                            }}
                                                        >
                                                            <Typography
                                                                variant="subtitle1"
                                                                fontWeight={700}
                                                                sx={{
                                                                    width: '100%',
                                                                    whiteSpace: 'normal',
                                                                    overflowWrap: 'break-word',
                                                                    mb: 0.5,
                                                                }}
                                                            >
                                                                {notif.title}
                                                            </Typography>
                                                            <Typography
                                                                variant="body2"
                                                                color="text.secondary"
                                                                sx={{
                                                                    width: '100%',
                                                                    whiteSpace: 'normal',
                                                                    overflowWrap: 'break-word',
                                                                }}
                                                            >
                                                                {notif.message}
                                                            </Typography>
                                                            <Typography
                                                                variant="body2"
                                                                color="text.secondary"
                                                                sx={{
                                                                    width: '100%',
                                                                    whiteSpace: 'normal',
                                                                    overflowWrap: 'break-word',
                                                                }}
                                                            >
                                                                {new Intl.DateTimeFormat('en-US', {
                                                                    day: '2-digit',
                                                                    month: 'long',
                                                                    year: 'numeric',
                                                                    hour: '2-digit',
                                                                    minute: '2-digit',
                                                                }).format(new Date(notif.receivedAt))}
                                                            </Typography>

                                                        </MenuItem>
                                                    ))
                                                )}
                                            </Menu>



                                        <IconButton
                                            color="error"
                                            href="https://localhost:7084/signout"
                                            onClick={handleLogout}
                                            title="Sign Out"
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