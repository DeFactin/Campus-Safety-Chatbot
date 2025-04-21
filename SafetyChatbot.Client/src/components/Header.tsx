import React from 'react';
import {
    Box,
    Typography,
    Button,
    IconButton,
    useMediaQuery,
    useTheme,
    Drawer,
    List,
    ListItem,
    ListItemText
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';

const Header = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [drawerOpen, setDrawerOpen] = React.useState(false);

    const toggleDrawer = (open: boolean) => () => {
        setDrawerOpen(open);
    };

    const navItems = [
        { name: 'Home', path: '/' },
        { name: 'Safety Guidelines', path: '/safety-guidelines' }
    ];

    return (
        <Box
            sx={{
                height: { xs: 'auto', md: '200px' },
                backgroundColor: 'white',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                py: 2,
                px: { xs: 10, lg: '130px' },
                gap: 2,
            }}
        >
            {/* Left side - Logo + Title + Menu (mobile) */}
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                }}
            >
                

                <Box
                    component="img"
                    src="/logoDark.png"
                    alt="University Logo"
                    sx={{
                        height: '90px',
                        width: 'auto'
                    }}
                />

                <Box>


                    <Typography
                        variant="h2"
                        sx={{
                            fontFamily: '"Jersey 20"',
                            color: 'blue1.main',
                            lineHeight: 1.2,
                            fontSize: {
                                xs: '0.5rem', sm: '1.25rem', md: '1rem', lg: '24px'
                            }
                        }}
                    >
                        International University of Sarajevo
                    </Typography>
                    <Typography
                        variant="h1"
                        sx={{
                            fontFamily: '"Jersey 25"',
                            color: 'blue1.main',
                            lineHeight: 1,
                            fontSize: {
                                xs: '1.25rem', sm: '1.75rem', md: '2rem', lg: '36px'
                            }
                        }}
                    >
                        Campus Safety Chatbot
                    </Typography>
                </Box>
                {isMobile && (
                    <IconButton
                        onClick={toggleDrawer(true)}
                        sx={{
                            color: 'blue1.main',
                            ml: 5,
                            
                        }}
                    >
                        <MenuIcon fontSize="large" />
                    </IconButton>
                )}
            </Box>

            {/* Right side - Navigation (desktop) */}
            {!isMobile && (
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 3
                    }}
                >
                    {navItems.map((item) => (
                        <Box
                            key={item.name}
                            component={Link}
                            to={item.path}
                            sx={{
                                p: 2,
                                borderRadius: 1,
                                textAlign: 'center',
                                textDecoration: 'none',
                                '&:hover': {
                                    backgroundColor: '#f5f5f5',
                                    cursor: 'pointer'
                                }
                            }}
                        >
                            <Typography
                                variant="h6"
                                sx={{
                                    fontFamily: '"Jersey 15"',
                                    color: 'blue1.main'
                                }}
                            >
                                {item.name}
                            </Typography>
                        </Box>
                    ))}

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
                                bgcolor: 'severity_red.main'
                            }
                        }}
                    >
                        Register
                    </Button>

                    <Button
                        variant="contained"
                        component={Link}
                        to="/login"
                        sx={{
                            bgcolor: 'primary_red.main',
                            fontFamily: '"Jersey 15"',
                            color: 'white',
                            px: 3,
                            '&:hover': {
                                bgcolor: 'severity_red.main'
                            }
                        }}
                    >
                        Log In
                    </Button>
                </Box>
            )}

            {/* Mobile Drawer */}
            <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
                <Box
                    sx={{ width: 250 }}
                    role="presentation"
                    onClick={toggleDrawer(false)}
                    onKeyDown={toggleDrawer(false)}
                >
                    <List>
                        {navItems.map((item) => (
                            <ListItem
                                button
                                component={Link}
                                to={item.path}
                                key={item.name}
                                sx={{
                                    '&:hover': {
                                        backgroundColor: '#f5f5f5'
                                    }
                                }}
                            >
                                <ListItemText
                                    primary={item.name}
                                    primaryTypographyProps={{
                                        fontFamily: '"Jersey 15"',
                                        color: 'blue1.main'
                                    }}
                                />
                            </ListItem>
                        ))}
                        <ListItem
                            button
                            component={Link}
                            to="/register"
                            sx={{
                                '&:hover': {
                                    backgroundColor: '#f5f5f5'
                                }
                            }}
                        >
                            <ListItemText
                                primary="Register"
                                primaryTypographyProps={{
                                    fontFamily: '"Jersey 15"',
                                    color: 'primary_red.main'
                                }}
                            />
                        </ListItem>
                        <ListItem
                            button
                            component={Link}
                            to="/login"
                            sx={{
                                '&:hover': {
                                    backgroundColor: '#f5f5f5'
                                }
                            }}
                        >
                            <ListItemText
                                primary="Log In"
                                primaryTypographyProps={{
                                    fontFamily: '"Jersey 15"',
                                    color: 'primary_red.main'
                                }}
                            />
                        </ListItem>
                    </List>
                </Box>
            </Drawer>
        </Box>
    );
};

export default Header;