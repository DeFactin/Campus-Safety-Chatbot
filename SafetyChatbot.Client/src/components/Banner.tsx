import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Banner = () => {
    return (
        <Box sx={{ bgcolor: 'golden.main', color: 'white', py: 1, px: 4 }}>
            <Typography>Real-time alerts, emergency guidance, and secure incident reporting at your fingertips.</Typography>
            
        </Box>
    );
};

export default Banner;
