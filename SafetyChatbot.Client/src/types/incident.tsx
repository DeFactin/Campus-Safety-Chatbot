export type SeverityLevel = 'high' | 'medium' | 'low';
export type IncidentStatus = 'pending' | 'in_progress' | 'resolved';

export interface Incident {
    id: string;
    type: string;
    location: string;
    date: string;
    description: string;
    severityLevel: SeverityLevel;
    evidenceFile?: string;
    status: IncidentStatus;
    reportedAt: string;
    updatedAt: string;
}