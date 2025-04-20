import axios from 'axios';

// Create an Axios instance
const api = axios.create({
    baseURL: 'https://localhost:7084/api',  // Correct base URL for your backend
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
