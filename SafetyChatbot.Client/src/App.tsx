import React, { useEffect, useState } from 'react'
import './App.css'
import { getGuidelines} from './services/ApiService'  // Importing from ApiService

function App() {
    interface Guideline {
        id: number
        title: string
        description: string
    }

    const [guidelines, setGuidelines] = useState<Guideline[]>([])

    useEffect(() => {
        loadGuidelines()
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

    // Load guidelines using the API service
    async function loadGuidelines() {
        try {
            const data = await getGuidelines()  // Call the getGuidelines function
            setGuidelines(data)
        } catch (error) {
            console.error('Failed to load guidelines:', error)
        }
    }
}

export default App
