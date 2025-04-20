import { Box, Button, Container, Typography, Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Banner from '../components/Banner';
const HomePage = () => {
    return (
        <Box sx={{ minHeight: '100vh' }}>
            

            <Header></Header>
            <Banner></Banner>
            
      
            
        </Box>
    );
};

export default HomePage;