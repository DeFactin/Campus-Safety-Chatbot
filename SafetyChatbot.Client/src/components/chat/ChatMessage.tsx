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
                    gap: 1.5, // cleaner spacing between avatar and bubble
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minWidth: 36,
                        minHeight: 36,
                        borderRadius: '50%',
                        bgcolor: isBot ? 'primary.main' : 'warning.main',
                        color: 'white',
                        flexShrink: 0, // prevents squishing on long messages
                    }}
                >
                    {isBot ? <Bot size={20} /> : <User size={20} />}
                </Box>

                <Paper
                    elevation={1}
                    sx={{
                        p: 2,
                        bgcolor: isBot ? 'grey.100' : 'primary.main',
                        color: isBot ? 'text.primary' : 'white',
                        borderRadius: 2,
                        wordBreak: 'break-word',
                        maxWidth: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <Typography variant="body1">{message.text}</Typography>
                    <Typography
                        variant="caption"
                        sx={{
                            mt: 1,
                            color: isBot ? 'text.secondary' : 'rgba(255, 255, 255, 0.7)',
                            alignSelf: isBot ? 'flex-start' : 'flex-end',
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