import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        blue1: {
            main: '#213D73',
        },
        blue2: {
            main: '#202453',
        },
        golden: {
            main: '#E9AD35',
        },
        primary_red: {
            main: '#EB4545',
        },
        font_blue: {
            main: '#2D3587',
        },
        severity_red: {
            main: '#F62323',
        },
        severity_orange: {
            main: '#F88539',
        },
        severity_green: {
            main: '#EDFC69',
        },
        pending: {
            main: '#EDFC69',
        },
        resolved: {
            main: '#7CFB89', // Fixed extra "#"
        },
        progressing: {
            main: '#F0A54A',
        },
        background: {
            default: '#f5f5f5',
        },
    },
    typography: {
        fontFamily: '"Jersey 15", sans-serif',
        h1: {
            fontFamily: '"Jersey 25", sans-serif',
            fontWeight: 400,
            fontSize: '2.5 rem',
        },
        h2: {
            fontFamily: '"Jersey 20", sans-serif', // Fixed hyphen to camelCase
            fontWeight: 400,
        },
        h3: {
            fontFamily: '"Jersey 15", sans-serif',
            fontWeight: 400,
        },
        h4: {
            fontFamily: '"Jersey 10", sans-serif',
            fontWeight: 400,
        },
    },
});

export default theme;