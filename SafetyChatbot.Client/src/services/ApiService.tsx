import axios from 'axios'

// Create an Axios instance
const api = axios.create({
    baseURL: '/api',  
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

// get incident reports 
export const getIncidents = async () => {
    const response = await api.get('/incidentreports')
    return response.data
}


export const fetchChatSessions = async () => {
    const response = await api.get('/chatbot/sessions');
    return response.data;
};
export const fetchChatHistory = async (sessionId: string) => {
    const response = await api.get(`/chatbot/history/${sessionId}`);
    return response.data;
};
// existing sendChatMessage remains unchanged
export const sendChatMessage = async (sessionId: string, message: string) => {
    const response = await api.post('/chatbot/message', { sessionId, message });
    return response.data.reply;
};
// Type for new incident report
export interface NewIncident {
    incidentType: string;
    description: string;
    date: string;  // Use ISO date string (e.g., "2025-04-22")
    location: string;
    severityLevel: 'low' | 'medium' | 'high';
    status:string
}

// Submit a new incident report
export const createIncident = async (newIncident: NewIncident) => {
    const response = await api.post('/incidentreports', newIncident);
    return response.data
}
