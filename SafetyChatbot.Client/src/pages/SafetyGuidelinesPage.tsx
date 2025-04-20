import React, { useEffect, useState } from 'react';
import { getGuidelines } from '../services/ApiService';
import { Table, TableHead, TableBody, TableRow, TableCell, Typography, CircularProgress, Button, Box } from '@mui/material';
import Header from '../components/Header';
import Banner from '../components/Banner';

interface Guideline {
    id: number;
    title: string;
    description: string;
}

const SafetyGuidelinesPage = () => {
    const [guidelines, setGuidelines] = useState<Guideline[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        loadGuidelines();
    }, []);

    async function loadGuidelines() {
        try {
            const data = await getGuidelines();
            setGuidelines(data);
            setLoading(false);
        } catch (error) {
            console.error('Failed to load guidelines:', error);
            setLoading(false);
        }
    }

    const contents = loading ? (
        <Box display="flex" justifyContent="center" mt={5}>
            <CircularProgress sx={{ color: 'white' }} />
        </Box>
    ) : (
        <Table className="table" aria-labelledby="tableLabel" sx={{ color: 'white' }}>
            <TableHead>
                <TableRow>
                    <TableCell sx={{ color: 'white', borderColor: 'rgba(255, 255, 255, 0.12)' }}>ID</TableCell>
                    <TableCell sx={{ color: 'white', borderColor: 'rgba(255, 255, 255, 0.12)' }}>Title</TableCell>
                    <TableCell sx={{ color: 'white', borderColor: 'rgba(255, 255, 255, 0.12)' }}>Description</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {guidelines.map((guideline) => (
                    <TableRow key={guideline.id} sx={{ '&:last-child td': { borderBottom: 0 } }}>
                        <TableCell sx={{ color: 'white', borderColor: 'rgba(255, 255, 255, 0.12)' }}>{guideline.id}</TableCell>
                        <TableCell sx={{ color: 'white', borderColor: 'rgba(255, 255, 255, 0.12)' }}>{guideline.title}</TableCell>
                        <TableCell sx={{ color: 'white', borderColor: 'rgba(255, 255, 255, 0.12)' }}>{guideline.description}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );

    return (
        <Box sx={{ minHeight: '100vh' }}>
            <Header />
            <Banner />
            <Box sx={{ p: 4, color: 'white' }}>
                <Typography variant="h1" sx={{ color: 'white', mb: 2 }}>
                    Safety Guidelines
                </Typography>
                <Typography paragraph sx={{ color: 'white', mb: 4 }}>
                    This component demonstrates fetching safety guidelines from the backend.
                </Typography>
                {contents}
            </Box>
        </Box>
    );
};

export default SafetyGuidelinesPage;