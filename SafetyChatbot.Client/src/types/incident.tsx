export type IncidentStatus = 'Pending' | 'In Progress' | 'Resolved';
export type SeverityLevel = 'high' | 'medium' | 'low';


export interface Incident {
    id: number; 
    incidentType: string;
    reportedBy?: string; // optional, in case it's null or undefined
    location: string;
    date: string; // ISO date string
    severity: SeverityLevel;
    status: IncidentStatus;
    description: string;
    reportedAt?: string;
    lastUpdated?: string;
    
}
