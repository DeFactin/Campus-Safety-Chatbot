import React from 'react';
import {
    Card,
    CardContent,
    Typography,
    Divider,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Box,
    Button
} from '@mui/material';
import { MessageSquare, Clock } from 'lucide-react';
import { useTheme } from '@mui/material/styles';
import { ChatHistory } from '../../types/chat';

interface ChatHistorySidebarProps {
    chatHistory: ChatHistory[];
    selectedChat: string | null;
    onChatSelect: (chatId: string) => void;
    onNewChat: () => void;
}

const ChatHistorySidebar: React.FC<ChatHistorySidebarProps> = ({
                                                                   chatHistory,
                                                                   selectedChat,
                                                                   onChatSelect,
                                                                   onNewChat
                                                               }) => {
    const theme = useTheme();

    return (
        <Card
            elevation={0}
            sx={{
                height: '70vh',
                borderRadius: 2,
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                overflow: 'hidden'
            }}
        >
            <CardContent sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                    Chat History
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={onNewChat}
                    sx={{ mb: 2, mt:2 }}
                >
                    Start New Conversation
                </Button>
                <Divider sx={{ mb: 2 }} />
                <List sx={{ overflow: 'auto', flexGrow: 1 }}>
                    {chatHistory.length === 0 && (
                        <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', mt: 3 }}>
                            No chat history available.
                        </Typography>
                    )}
                    {chatHistory.map((chat) => (
                        <ListItemButton
                            key={chat.id}
                            selected={selectedChat === chat.id}
                            onClick={() => onChatSelect(chat.id)}
                            sx={{
                                mb: 1,
                                borderRadius: 1,
                                '&.Mui-selected': {
                                    backgroundColor: 'primary.light',
                                    color: 'white',
                                    '&:hover': {
                                        backgroundColor: 'primary.main',
                                    }
                                }
                            }}
                        >
                            <ListItemIcon>
                                <MessageSquare
                                    size={20}
                                    color={selectedChat === chat.id ? 'white' : theme.palette.primary.main}
                                />
                            </ListItemIcon>
                            <ListItemText
                                primary={chat.title}
                                secondary={
                                    <Box component="span" sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        color: selectedChat === chat.id ? 'rgba(255,255,255,0.7)' : 'text.secondary',
                                        gap: 1,
                                        fontSize: '0.75rem'
                                    }}>
                                        <Clock size={14} />
                                        {new Date(chat.timestamp).toLocaleDateString()}
                                    </Box>
                                }
                                secondaryTypographyProps={{
                                    sx: {
                                        color: selectedChat === chat.id ? 'rgba(255,255,255,0.7)' : 'text.secondary'
                                    }
                                }}
                            />
                        </ListItemButton>
                    ))}
                </List>
            </CardContent>
        </Card>
    );
};

export default ChatHistorySidebar;
