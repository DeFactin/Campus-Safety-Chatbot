import React, { useState, useRef, useEffect } from 'react';
import {
    Box,
    Paper,
    TextField,
    IconButton,
    InputAdornment,
    useTheme,
    Card,
    CardContent,
    Typography,
    Divider
} from '@mui/material';
import { Send, Bot, Shield, AlertCircle } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { Message } from '../../types/chat';
import { ChatHistory } from '../../types/chat';
import { sendChatMessage } from '../../services/ApiService';
import ChatMessage from './ChatMessage';
import ChatSuggestions from './ChatSuggestions';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';
import ChatHistorySidebar from './ChatHistorySidebar';


interface DecodedToken {
    name: string;
    role: string;
}

const initialSuggestions = [
    "How do I report an emergency?",
    "What should I do if I feel unsafe?",
    "Where can I find safety guidelines?",
    "What are the emergency exits in my building?",
    "Report suspicious activity",
    "First aid locations"
];

const ChatInterface: React.FC = () => {
    const theme = useTheme();
    const [username, setUsername] = useState<string | null>(null);
    useEffect(() => {
        const storedToken = Cookies.get('token');
        if (storedToken) {
            try {
                const decoded: DecodedToken = jwtDecode(storedToken);
                const cleanName = decoded.name.split(' ')[0];
                setUsername(cleanName);
            } catch (err) {
                Cookies.remove('token');
            }
        }
    }, []);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: uuidv4(),
            text: "Hello! I'm your IUS Campus Safety Assistant. How can I help you today?",
            sender: 'bot',
            timestamp: new Date()
        }
    ]);
    const [input, setInput] = useState('');
    const sessionId = useRef<string>(uuidv4());
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
        const currentInput = input;
        setInput('');

        try {
            const botReply = await sendChatMessage(sessionId.current, currentInput);

            const botMessage: Message = {
                id: uuidv4(),
                text: botReply,
                sender: 'bot',
                timestamp: new Date()
            };

            setMessages(prev => [...prev, botMessage]);
        } catch (error) {
            const errorMessage: Message = {
                id: uuidv4(),
                text: "Sorry, I couldn't reach the server. Please try again later.",
                sender: 'bot',
                timestamp: new Date()
            };

            setMessages(prev => [...prev, errorMessage]);
        }
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
    // Add these to your existing state declarations
    const [selectedChat, setSelectedChat] = useState<string | null>(null);
    const [chatHistory, setChatHistory] = useState<ChatHistory[]>([
        {
            id: '1',
            title: 'Emergency Procedures',
            lastMessage: 'Thank you for the information about emergency exits.',
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
            messages: []
        },
    ]); // You'll need to import ChatHistory type

// Add this handler function
    const handleChatSelect = (chatId: string) => {
        setSelectedChat(chatId);
        // Here you would typically load the messages for the selected chat
        // For now, we'll just show a placeholder message
        setMessages([
            {
                id: uuidv4(),
                text: "Previous chat loaded. How can I help you further?",
                sender: 'bot',
                timestamp: new Date()
            }
        ]);
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3, width: '100%' }}>
            {/* Chat History Sidebar */}
            <Box sx={{ flex: 1, display: { xs: 'none', md: 'block' } }}>
                <ChatHistorySidebar
                    chatHistory={chatHistory}
                    selectedChat={selectedChat}
                    onChatSelect={handleChatSelect}
                />
            </Box>
            {/* Main Chat Area */}
            <Box sx={{ flex: 2, minWidth: 0 }}>
                <Paper elevation={0} sx={{ height: '70vh', display: 'flex', flexDirection: 'column', borderRadius: 2, boxShadow: '0 4px 20px rgba(0,0,0,0.08)', overflow: 'hidden' }}>
                    <Box sx={{ flex: 1, overflowY: 'auto', p: 3, bgcolor: 'background.default' }}>
                        {messages.map((message) => (
                            <ChatMessage key={message.id} message={message} username={username}/>
                        ))}
                        <div ref={messagesEndRef} />
                    </Box>

                    <Divider />

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
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={handleSend}
                                            disabled={!input.trim()}
                                            color="primary"
                                            sx={{
                                                bgcolor: input.trim() ? 'primary.main' : 'transparent',
                                                color: input.trim() ? 'white' : 'inherit',
                                                '&:hover': {
                                                    bgcolor: input.trim() ? 'primary.dark' : 'rgba(0, 0, 0, 0.04)'
                                                }
                                            }}
                                        >
                                            <Send size={20} />
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Box>
                </Paper>
            </Box>

            {/* Sidebar */}
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 3, position: { md: 'sticky' }, top: 24, alignSelf: 'flex-start' }}>
                <Card elevation={0} sx={{ borderRadius: 2, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
                    <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <Bot size={24} color={theme.palette.primary.main} />
                            <Typography variant="h6" sx={{ ml: 1 }}>
                                Quick Actions
                            </Typography>
                        </Box>
                        <ChatSuggestions suggestions={initialSuggestions} onSuggestionClick={handleSuggestionClick} />
                    </CardContent>
                </Card>

                <Card elevation={0} sx={{ borderRadius: 2, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
                    <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <Shield size={24} color={theme.palette.warning.main} />
                            <Typography variant="h6" sx={{ ml: 1 }}>
                                Emergency Contacts
                            </Typography>
                        </Box>
                        <Box sx={{ mb: 2 }}>
                            <Typography variant="subtitle2" color="text.secondary">Campus Security</Typography>
                            <Typography variant="body1" fontWeight={500}>+387 33 957 101</Typography>
                        </Box>
                        <Box>
                            <Typography variant="subtitle2" color="text.secondary">Emergency Services</Typography>
                            <Typography variant="body1" fontWeight={500}>122 (Police) | 123 (Fire) | 124 (Ambulance)</Typography>
                        </Box>
                        <Divider sx={{ my: 2 }} />
                        <Box sx={{ display: 'flex', alignItems: 'center', color: 'error.main' }}>
                            <AlertCircle size={18} />
                            <Typography variant="body2" sx={{ ml: 1 }}>
                                For immediate assistance in emergencies, always call emergency services first.
                            </Typography>
                        </Box>
                    </CardContent>
                </Card>
            </Box>
        </Box>
    );
};

export default ChatInterface;