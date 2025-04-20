import React, { useEffect, useState } from 'react'
import './App.css'
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme/theme';
import { getGuidelines } from './services/ApiService'  // Importing from ApiService
import { Table, TableHead, TableBody, TableRow, TableCell, Typography, CircularProgress, Button } from '@mui/material'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
function App() {
    interface Guideline {
        id: number
        title: string
        description: string
    }

    const [guidelines, setGuidelines] = useState<Guideline[]>([])
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        loadGuidelines()
    }, [])

    const contents = loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
            <CircularProgress />
        </div>
    ) : (
        <Table className="table" aria-labelledby="tableLabel">
            <TableHead>
                <TableRow>
                    <TableCell >ID</TableCell>
                    <TableCell>Title</TableCell>
                    <TableCell>Description</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {guidelines.map((guideline) => (
                    <TableRow key={guideline.id}>
                        <TableCell>{guideline.id}</TableCell>
                        <TableCell>{guideline.title}</TableCell>
                        <TableCell>{guideline.description}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )

    return (
        <div>

            <ThemeProvider theme={theme}>
                <Router>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        {/* Add other routes later */}
                    </Routes>
                </Router>
            <Typography variant="h1">
                Safety Guidelines
            </Typography>
            <Typography paragraph>
                This component demonstrates fetching safety guidelines from the backend.
            </Typography>
                {contents}
                <Button variant="contained" color="golden">Click me</Button>
            </ThemeProvider>
        </div>
    )

    // Load guidelines using the API service
    async function loadGuidelines() {
        try {
            const data = await getGuidelines()  // Call the getGuidelines function
            setGuidelines(data)
            setLoading(false)  // Set loading to false once the data is fetched
        } catch (error) {
            console.error('Failed to load guidelines:', error)
            setLoading(false)  // Stop loading even if there's an error
        }
    }
}

export default App
