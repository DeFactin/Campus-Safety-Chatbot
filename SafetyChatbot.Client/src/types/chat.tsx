export interface Message {
    id: string;
    text: string;
    sender: 'user' | 'bot';
    timestamp: Date;
}

export interface ChatResponse {
    text: string;
    suggestions?: string[];
}