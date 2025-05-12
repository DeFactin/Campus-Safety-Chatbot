export type SeverityLevel = 'High' | 'Medium' | 'Low';
export type IncidentStatus = 'pending' | 'in_progress' | 'resolved';

export interface Incident {
    id: number;
    incidentType: string;
    location: string;
    date: string;
    description: string;
    severityLevel: SeverityLevel;
    evidenceFile?: string;
    status: IncidentStatus;
    reportedBy: string;
    reportedAt: string;
    updatedAt: string;
}