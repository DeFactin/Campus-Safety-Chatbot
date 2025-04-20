import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
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
            {/* Left side - Logo + Title */}
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4
                }}
            >
                {/* Logo */}
                <Box
                    component="img"
                    src="/logoDark.png"
                    alt="University Logo"
                    sx={{
                        height: '80px',
                        width: 'auto'
                    }}
                />

                {/* University Title */}
                <Box>
                    <Typography
                        variant="h2"
                        sx={{
                            fontFamily: '"Jersey 20"',
                            color: 'blue1.main',
                            lineHeight: 1.2
                        }}
                    >
                        International University of Sarajevo
                    </Typography>
                    <Typography
                        variant="h1"
                        sx={{
                            fontFamily: '"Jersey 25"',
                            color: 'blue2.main',
                            lineHeight: 1
                        }}
                    >
                        Campus Safety Chatbot
                    </Typography>
                </Box>
            </Box>

            {/* Right side - Navigation */}
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4
                }}
            >
                {/* Navigation Links */}
                {['Home', 'Safety Regulations'].map((item) => (
                    <Box
                        key={item}
                        sx={{
                            p: 2,
                            borderRadius: 1,
                            textAlign: 'center',
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
                            {item}
                        </Typography>
                    </Box>
                ))}

                {/* Register Button */}
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
        </Box>
    );
};

export default Header;