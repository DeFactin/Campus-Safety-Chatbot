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
    useTheme
} from '@mui/material';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { Shield, Menu, X } from 'lucide-react';
import PersonIcon from '@mui/icons-material/Person';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';  // Import js-cookie

type DecodedToken = {
    name: string;
    email: string;
    role: string;
    exp: number;
};

const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Report Incident', path: '/report' },
    { name: 'Safety Regulations', path: '/regulations' },
    { name: 'Admin Dashboard', path: '/admin' },
];

const Navbar: React.FC = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const [username, setUsername] = useState<string | null>(null);
    const [role, setRole] = useState<string | null>(null);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const token = params.get('token');
        console.log(Cookies.get('token')); // Provjerite što vraća

        if (token) {
            Cookies.set('token', token, { expires: 1 });  // Token pohranjen u cookie, s rokom trajanja od 1 dana
            try {
                const decoded: DecodedToken = jwtDecode(token);
                const cleanName = decoded.name.split(' ')[0];
                setUsername(cleanName);
                setRole(decoded.role);
            } catch (err) {
                console.error('Neispravan token:', err);
            }
            navigate(location.pathname, { replace: true });
        } else {
            const storedToken = Cookies.get('token');  // Dohvat tokena iz cookieja
            if (storedToken) {
                try {
                    const decoded: DecodedToken = jwtDecode(storedToken);
                    const cleanName = decoded.name.split(' ')[0];
                    setUsername(cleanName);
                    setRole(decoded.role);
                } catch {
                    Cookies.remove('token');  // Uklanjanje nevažećeg tokena iz cookieja
                }
            }
        }
    }, [location, navigate]);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const filteredNavItems = navItems.filter(
        item => item.name !== 'Admin Dashboard' || role === 'Admin'
    );

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2 }}>
                <Typography variant="h6" component="div" sx={{ color: 'primary.main', fontWeight: 700 }}>
                    IUS Campus Safety Chatbot
                </Typography>
                <IconButton color="primary">
                    <X size={24} />
                </IconButton>
            </Box>
            <List>
                {username &&
                    filteredNavItems.map((item) => (
                        <ListItem
                            key={item.name}
                            component={RouterLink}
                            to={item.path}
                            sx={{
                                textAlign: 'center',
                                '&:hover': {
                                    backgroundColor: 'rgba(33, 61, 115, 0.08)',
                                }
                            }}
                        >
                            <ListItemText
                                primary={item.name}
                                sx={{
                                    color: 'text.primary',
                                    '.MuiListItemText-primary': {
                                        fontWeight: 500,
                                    }
                                }}
                            />
                        </ListItem>
                    ))}
                {!username && (
                    <ListItem
                        component="a"
                        href="https://localhost:7084/signin"
                        sx={{
                            textAlign: 'center',
                            '&:hover': {
                                backgroundColor: 'rgba(33, 61, 115, 0.08)',
                            }
                        }}
                    >
                        <ListItemText
                            primary="Log In"
                            sx={{
                                color: 'text.primary',
                                '.MuiListItemText-primary': {
                                    fontWeight: 500,
                                }
                            }}
                        />
                    </ListItem>
                )}
            </List>
        </Box>
    );

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed" color="default" elevation={10} sx={{ backgroundColor: 'white' }}>
                <Container maxWidth="xl">
                    <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 1, sm: 2 } }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Box
                                component="img"
                                src="/logoDark.png"
                                alt="Logo"
                                sx={{ height: '36px', width: 'auto' }}
                            />
                            <Typography
                                variant="h6"
                                component={RouterLink}
                                to="/"
                                sx={{
                                    ml: 1.5,
                                    fontWeight: 700,
                                    color: 'primary.main',
                                    textDecoration: 'none',
                                    display: { xs: 'none', sm: 'block' }
                                }}
                            >
                                IUS Campus Safety Chatbot
                            </Typography>
                        </Box>

                        {isMobile ? (
                            <IconButton
                                color="primary"
                                aria-label="open drawer"
                                edge="end"
                                onClick={handleDrawerToggle}
                            >
                                <Menu />
                            </IconButton>
                        ) : username ? (
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                {filteredNavItems.map((item) => (
                                    <Button
                                        key={item.name}
                                        component={RouterLink}
                                        to={item.path}
                                        sx={{
                                            color: 'text.primary',
                                            mx: 1,
                                            '&:hover': {
                                                backgroundColor: 'rgba(33, 61, 115, 0.08)',
                                            }
                                        }}
                                    >
                                        {item.name}
                                    </Button>
                                ))}
                                <Typography sx={{ mx: 2, fontWeight: 500, display: 'flex', alignItems: 'center' }}>
                                    <PersonIcon sx={{ mr: 0.5 }} />
                                    {role === 'Admin' ? 'Admin' : 'User'} {username}
                                </Typography>
                                <Button
                                    variant="contained"
                                    color="error"
                                    href="https://localhost:7084/signout"
                                    onClick={() => Cookies.remove('token')}  // Uklanjanje tokena iz cookieja
                                    sx={{
                                        ml: 1,
                                        px: 3,
                                        transition: 'all 0.3s',
                                        '&:hover': {
                                            transform: 'translateY(-2px)',
                                        }
                                    }}
                                >
                                    Log Out
                                </Button>
                            </Box>
                        ) : (
                            <Button
                                variant="contained"
                                color="error"
                                href="https://localhost:7084/signin"
                                sx={{
                                    ml: 2,
                                    px: 3,
                                    transition: 'all 0.3s',
                                    '&:hover': {
                                        transform: 'translateY(-2px)',
                                    }
                                }}
                            >
                                Log In
                            </Button>
                        )}
                    </Toolbar>
                </Container>
            </AppBar>
            <Drawer
                anchor="right"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true,
                }}
                sx={{
                    display: { xs: 'block', md: 'none' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
                }}
            >
                {drawer}
            </Drawer>
            <Toolbar />
        </Box>
    );
};

export default Navbar;
