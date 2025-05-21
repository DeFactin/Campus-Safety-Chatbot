import React, { useState, useRef, useEffect } from 'react';
import {
    Box,
    Paper,
    TextField,
    IconButton,
    Typography,
    Divider,
    InputAdornment,
    useTheme
} from '@mui/material';
import { Send, Minimize2, Maximize2 } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { Message } from '../../types/chat';
import ChatMessage from './ChatMessage';
import ChatSuggestions from './ChatSuggestions';

const initialSuggestions = [
    "How do I report an emergency?",
    "What should I do if I feel unsafe?",
    "Where can I find safety guidelines?",
    "How to contact campus security?"
];

const ChatWindow: React.FC = () => {
    const theme = useTheme();
    const [messages, setMessages] = useState<Message[]>([
        {
            id: uuidv4(),
            text: "Hello! I'm your IUS Campus Safety Assistant. How can I help you today?",
            sender: 'bot',
            timestamp: new Date()
        }
    ]);
    const [input, setInput] = useState('');
    const [isMinimized, setIsMinimized] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage: Message = {
            id: uuidv4(),
            text: input,
            sender: 'user',
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        setInput('');

        // Simulate bot response
        setTimeout(() => {
            const botMessage: Message = {
                id: uuidv4(),
                text: "I understand you're asking about " + input + ". Let me help you with that. [Bot response simulation]",
                sender: 'bot',
                timestamp: new Date()
            };
            setMessages(prev => [...prev, botMessage]);
        }, 1000);
    };

    const handleKeyPress = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            handleSend();
        }
    };

    const handleSuggestionClick = (suggestion: string) => {
        setInput(suggestion);
    };

    return (
        <Paper
            elevation={3}
            sx={{
                position: 'fixed',
                bottom: 20,
                right: 20,
                width: isMinimized ? 300 : 400,
                height: isMinimized ? 'auto' : 600,
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                borderRadius: 2,
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
            }}
        >
            {/* Header */}
            <Box
                sx={{
                    bgcolor: 'primary.main',
                    color: 'white',
                    p: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}
            >
                <Typography variant="h6" component="div">
                    Campus Safety Assistant
                </Typography>
                <IconButton
                    size="small"
                    onClick={() => setIsMinimized(!isMinimized)}
                    sx={{ color: 'white' }}
                >
                    {isMinimized ? <Maximize2 size={18} /> : <Minimize2 size={18} />}
                </IconButton>
            </Box>

            {!isMinimized && (
                <>
                    {/* Messages Container */}
                    <Box
                        sx={{
                            flex: 1,
                            overflowY: 'auto',
                            p: 2,
                            bgcolor: 'background.default',
                        }}
                    >
                        {messages.map((message) => (
                            <ChatMessage key={message.id} message={message} />
                        ))}
                        <div ref={messagesEndRef} />
                    </Box>

                    <Divider />

                    {/* Suggestions */}
                    <Box sx={{ p: 2, bgcolor: 'background.paper' }}>
                        <ChatSuggestions
                            suggestions={initialSuggestions}
                            onSuggestionClick={handleSuggestionClick}
                        />
                    </Box>

                    {/* Input Area */}
                    <Box sx={{ p: 2, bgcolor: 'background.paper' }}>
                        <TextField
                            fullWidth
                            multiline
                            maxRows={4}
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Type your message..."
                            variant="outlined"
                            size="small"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={handleSend}
                                            disabled={!input.trim()}
                                            color="primary"
                                        >
                                            <Send size={18} />
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Box>
                </>
            )}
        </Paper>
    );
};

export default ChatWindow;