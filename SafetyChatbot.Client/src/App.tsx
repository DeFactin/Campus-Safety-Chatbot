// App.tsx

import React, { useEffect, useState } from 'react'
import './App.css'

interface Guideline {
    id: number
    title: string
    description: string
}

function App() {
    const [guidelines, setGuidelines] = useState<Guideline[]>([])

    useEffect(() => {
        fetchGuidelines()
    }, [])

    const contents =
        guidelines.length === 0 ? (
            <p>
                <em>Loading... Please ensure the ASP.NET backend is running.</em>
            </p>
        ) : (
            <table className="table table-striped" aria-labelledby="tableLabel">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {guidelines.map((guideline) => (
                        <tr key={guideline.id}>
                            <td>{guideline.id}</td>
                            <td>{guideline.title}</td>
                            <td>{guideline.description}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        )

    return (
        <div>
            <h1 id="tableLabel">Safety Guidelines</h1>
            <p>
                This component demonstrates fetching safety guidelines from the
                backend.
            </p>
            {contents}
        </div>
    )

    async function fetchGuidelines() {
        try {
            const response = await fetch('/api/guidelines')
            if (!response.ok) throw new Error('Network response was not ok')
            const data: Guideline[] = await response.json()
            setGuidelines(data)
        } catch (error) {
            console.error('Failed to fetch guidelines:', error)
        }
    }
}

export default App