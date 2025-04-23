import axios from 'axios'

// Create an Axios instance
const api = axios.create({
    baseURL: '/api',  // Correct base URL for your backend
})

// Fetch all safety guidelines
export const getGuidelines = async () => {
    const response = await api.get('/guidelines')
    return response.data
}

// Create a new safety guideline
export const createGuideline = async (newGuideline: { title: string; description: string }) => {
    const response = await api.post('/guidelines', newGuideline)
    return response.data
}

// Other API calls 
export const getIncidents = async () => {
    const response = await api.get('/incidentreports')
    return response.data
}


// Other API calls

// Type for new incident report
export interface NewIncident {
    incidentType: string;
    description: string;
    date: string;  // Use ISO date string (e.g., "2025-04-22")
    location: string;
    severityLevel: 'low' | 'medium' | 'high';
}

// Submit a new incident report
export const createIncident = async (newIncident: NewIncident) => {
    const response = await api.post('/incidentreports', newIncident, {
        headers: {
            'Content-Type': 'application/json',
        }
    })
    return response.data
}
