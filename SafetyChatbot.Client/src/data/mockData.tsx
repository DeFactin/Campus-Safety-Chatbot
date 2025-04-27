import { Incident } from '../types/incident';

// Generate a random ID
const generateId = (): string => {
    return Math.random().toString(36).substring(2, 11);
};

// Generate random dates within the last month
const getRandomRecentDate = (): string => {
    const now = new Date();
    const pastDate = new Date(now.getTime() - Math.random() * 30 * 24 * 60 * 60 * 1000);
    return pastDate.toISOString();
};

// Generate mock incidents
export const mockIncidents: Incident[] = [
    {
        id: generateId(),
        type: 'Theft',
        location: 'Library Building, 2nd Floor',
        date: getRandomRecentDate(),
        description: 'Personal laptop was stolen while left unattended for approximately 10 minutes.',
        severityLevel: 'high',
        status: 'in_progress',
        reportedAt: getRandomRecentDate(),
        updatedAt: getRandomRecentDate(),
    },
    {
        id: generateId(),
        type: 'Vandalism',
        location: 'Parking Lot B',
        date: getRandomRecentDate(),
        description: 'Car was scratched on the driver\'s side door.',
        severityLevel: 'medium',
        status: 'pending',
        reportedAt: getRandomRecentDate(),
        updatedAt: getRandomRecentDate(),
    },
    {
        id: generateId(),
        type: 'Harassment',
        location: 'Student Center',
        date: getRandomRecentDate(),
        description: 'Verbal harassment from an unknown individual near the cafeteria entrance.',
        severityLevel: 'high',
        status: 'resolved',
        reportedAt: getRandomRecentDate(),
        updatedAt: getRandomRecentDate(),
    },
    {
        id: generateId(),
        type: 'Medical Emergency',
        location: 'Sports Hall',
        date: getRandomRecentDate(),
        description: 'Student fainted during basketball practice, medical assistance was called.',
        severityLevel: 'high',
        status: 'resolved',
        reportedAt: getRandomRecentDate(),
        updatedAt: getRandomRecentDate(),
    },
    {
        id: generateId(),
        type: 'Facility Issue',
        location: 'Faculty of Engineering, Room 302',
        date: getRandomRecentDate(),
        description: 'Ceiling leaking water after heavy rain, causing damage to equipment.',
        severityLevel: 'medium',
        status: 'in_progress',
        reportedAt: getRandomRecentDate(),
        updatedAt: getRandomRecentDate(),
    },
    {
        id: generateId(),
        type: 'Suspicious Activity',
        location: 'Campus Entry Gate',
        date: getRandomRecentDate(),
        description: 'Unknown person attempting to access campus without proper identification.',
        severityLevel: 'medium',
        status: 'pending',
        reportedAt: getRandomRecentDate(),
        updatedAt: getRandomRecentDate(),
    },
    {
        id: generateId(),
        type: 'Noise Complaint',
        location: 'Dormitory A, 3rd Floor',
        date: getRandomRecentDate(),
        description: 'Excessive noise after quiet hours, disrupting other residents.',
        severityLevel: 'low',
        status: 'resolved',
        reportedAt: getRandomRecentDate(),
        updatedAt: getRandomRecentDate(),
    },
    {
        id: generateId(),
        type: 'Power Outage',
        location: 'Faculty of Arts Building',
        date: getRandomRecentDate(),
        description: 'Sudden power outage affecting the entire building for over an hour.',
        severityLevel: 'medium',
        status: 'resolved',
        reportedAt: getRandomRecentDate(),
        updatedAt: getRandomRecentDate(),
    },
];

// Statistic calculations
export const calculateStatistics = () => {
    const totalIncidents = mockIncidents.length;
    const pendingCount = mockIncidents.filter(incident => incident.status === 'pending').length;
    const inProgressCount = mockIncidents.filter(incident => incident.status === 'in_progress').length;
    const resolvedCount = mockIncidents.filter(incident => incident.status === 'resolved').length;

    const highSeverityCount = mockIncidents.filter(incident => incident.severityLevel === 'high').length;
    const mediumSeverityCount = mockIncidents.filter(incident => incident.severityLevel === 'medium').length;
    const lowSeverityCount = mockIncidents.filter(incident => incident.severityLevel === 'low').length;

    return {
        totalIncidents,
        pendingCount,
        inProgressCount,
        resolvedCount,
        highSeverityCount,
        mediumSeverityCount,
        lowSeverityCount,

        // Calculate percentages
        pendingPercentage: Math.round((pendingCount / totalIncidents) * 100),
        inProgressPercentage: Math.round((inProgressCount / totalIncidents) * 100),
        resolvedPercentage: Math.round((resolvedCount / totalIncidents) * 100),

        highSeverityPercentage: Math.round((highSeverityCount / totalIncidents) * 100),
        mediumSeverityPercentage: Math.round((mediumSeverityCount / totalIncidents) * 100),
        lowSeverityPercentage: Math.round((lowSeverityCount / totalIncidents) * 100),
    };
};