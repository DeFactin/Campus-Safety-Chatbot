import React, { useState } from 'react';
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
import { Link as RouterLink } from 'react-router-dom';
import { Shield, Menu, X } from 'lucide-react';

const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Report Incident', path: '/report' },
    { name: 'Safety Regulations'},
    { name: 'Admin Dashboard', path: '/admin' },
];

const Navbar: React.FC = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

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
                {navItems.map((item) => (
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
            </List>
        </Box>
    );

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed" color="default" elevation={1} sx={{ backgroundColor: 'white' }}>
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
                        ) : (
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                {navItems.map((item) => (
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
                                <Button
                                    variant="contained"
                                    color="error"
                                    component={RouterLink}
                                    to="/report"
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
                            </Box>
                        )}
                    </Toolbar>
                </Container>
            </AppBar>
            <Drawer
                anchor="right"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile
                }}
                sx={{
                    display: { xs: 'block', md: 'none' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
                }}
            >
                {drawer}
            </Drawer>
            <Toolbar /> {/* This toolbar is for spacing below the fixed AppBar */}
        </Box>
    );
};

export default Navbar;