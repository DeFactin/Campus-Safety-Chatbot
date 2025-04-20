import React, { useEffect, useState } from 'react'
import './App.css'
import { getGuidelines } from './services/ApiService'  // Importing from ApiService
import { Table, TableHead, TableBody, TableRow, TableCell, Typography, CircularProgress } from '@mui/material'

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
            <Typography variant="h4" gutterBottom>
                Safety Guidelines
            </Typography>
            <Typography paragraph>
                This component demonstrates fetching safety guidelines from the backend.
            </Typography>
            {contents}
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
