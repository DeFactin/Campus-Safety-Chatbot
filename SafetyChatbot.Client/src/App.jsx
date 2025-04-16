import { useEffect, useState } from 'react';
import './App.css';

function App() {
    const [guidelines, setGuidelines] = useState([]);

    useEffect(() => {
        fetchGuidelines();
    }, []);

    const contents = guidelines.length === 0
        ? <p><em>Loading... Please ensure the ASP.NET backend is running.</em></p>
        : <table className="table table-striped" aria-labelledby="tableLabel">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody>
                {guidelines.map(guideline =>
                    <tr key={guideline.id}>
                        <td>{guideline.id}</td>
                        <td>{guideline.title}</td>
                        <td>{guideline.description}</td>
                    </tr>
                )}
            </tbody>
        </table>;

    return (
        <div>
            <h1 id="tableLabel">Safety Guidelines</h1>
            <p>This component demonstrates fetching safety guidelines from the backend.</p>
            {contents}
        </div>
    );

    async function fetchGuidelines() {
        const response = await fetch('/api/guidelines'); // Updated API endpoint
        if (response.ok) {
            const data = await response.json();
            setGuidelines(data);
        }
    }
}

export default App;
