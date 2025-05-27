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


// Send a message to Dialogflow chatbot
export const sendChatMessage = async (sessionId: string, message: string) => {
    const response = await api.post('/chatbot/message', { sessionId, message })
    return response.data.reply
}

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

// Fetch all notifications for the logged-in user
export const getNotifications = async () => {
    const response = await api.get('/push/get-notifications')
    return response.data
}

export const markAllNotificationsAsRead = async () => {
    await api.post('/push/mark-all-read');
};

export const getUnreadNotifications = async () => {
    const response = await api.get('/push/get-unread-notifications');
    return response.data;
};