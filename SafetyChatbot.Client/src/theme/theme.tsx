import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#213D73', // blue1
            dark: '#162A50',
            light: '#4C6695',
            contrastText: '#FFFFFF',
        },
        secondary: {
            main: '#202453', // blue2
            dark: '#161A3A',
            light: '#4D5077',
            contrastText: '#FFFFFF',
        },
        warning: {
            main: '#E9AD35', // golden
            dark: '#C68F23',
            light: '#EEBF5D',
            contrastText: '#000000',
        },
        error: {
            main: '#EB4545', // primary_red
            dark: '#C42E2E',
            light: '#EF6B6B',
            contrastText: '#FFFFFF',
        },
        success: {
            main: '#4CAF50',
            dark: '#388E3C',
            light: '#81C784',
        },
        info: {
            main: '#2196F3',
            dark: '#0D47A1',
            light: '#64B5F6',
        },
        background: {
            default: '#F5F7FA',
            paper: '#FFFFFF',
        },
        text: {
            primary: '#1A2027',
            secondary: '#637381',
        },
    },
    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        h1: {
            fontSize: '2.5rem',
            fontWeight: 700,
            lineHeight: 1.2,
        },
        h2: {
            fontSize: '2rem',
            fontWeight: 700,
            lineHeight: 1.2,
        },
        h3: {
            fontSize: '1.75rem',
            fontWeight: 600,
            lineHeight: 1.2,
        },
        h4: {
            fontSize: '1.5rem',
            fontWeight: 600,
            lineHeight: 1.2,
        },
        h5: {
            fontSize: '1.25rem',
            fontWeight: 600,
            lineHeight: 1.2,
        },
        h6: {
            fontSize: '1rem',
            fontWeight: 600,
            lineHeight: 1.2,
        },
        body1: {
            fontSize: '1rem',
            lineHeight: 1.5,
        },
        body2: {
            fontSize: '0.875rem',
            lineHeight: 1.5,
        },
        button: {
            fontSize: '0.875rem',
            fontWeight: 600,
            textTransform: 'none',
        },
    },
    shape: {
        borderRadius: 8,
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    boxShadow: 'none',
                    '&:hover': {
                        boxShadow: 'none',
                    },
                },
                containedPrimary: {
                    '&:hover': {
                        backgroundColor: '#162A50',
                    },
                },
                containedSecondary: {
                    '&:hover': {
                        backgroundColor: '#161A3A',
                    },
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
                    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                    '&:hover': {
                        boxShadow: '0px 8px 30px rgba(0, 0, 0, 0.12)',
                    },
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        '&:hover fieldset': {
                            borderColor: '#213D73',
                        },
                    },
                },
            },
        },
    },
});

export default theme;