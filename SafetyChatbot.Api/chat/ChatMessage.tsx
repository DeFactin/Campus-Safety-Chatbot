import React from 'react';
import { Box, Paper, Typography, useTheme } from '@mui/material';
import { Message } from '../../types/chat';
import { Bot, User } from 'lucide-react';

interface ChatMessageProps {
    message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
    const theme = useTheme();
    const isBot = message.sender === 'bot';

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: isBot ? 'flex-start' : 'flex-end',
                mb: 2,
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: isBot ? 'row' : 'row-reverse',
                    alignItems: 'flex-start',
                    maxWidth: '80%',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 32,
                        height: 32,
                        borderRadius: '50%',
                        bgcolor: isBot ? 'primary.main' : 'warning.main',
                        color: 'white',
                        mr: isBot ? 1 : 0,
                        ml: isBot ? 0 : 1,
                    }}
                >
                    {isBot ? <Bot size={18} /> : <User size={18} />}
                </Box>

                <Paper
                    elevation={1}
                    sx={{
                        p: 2,
                        bgcolor: isBot ? 'grey.100' : 'primary.main',
                        color: isBot ? 'text.primary' : 'white',
                        borderRadius: 2,
                        maxWidth: '100%',
                    }}
                >
                    <Typography variant="body1">{message.text}</Typography>
                    <Typography
                        variant="caption"
                        sx={{
                            display: 'block',
                            mt: 1,
                            color: isBot ? 'text.secondary' : 'rgba(255, 255, 255, 0.7)',
                            textAlign: isBot ? 'left' : 'right'
                        }}
                    >
                        {message.timestamp.toLocaleTimeString()}
                    </Typography>
                </Paper>
            </Box>
        </Box>
    );
};

export default ChatMessage;