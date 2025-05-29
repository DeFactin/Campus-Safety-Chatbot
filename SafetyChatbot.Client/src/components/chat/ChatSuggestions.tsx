import React from 'react';
import { Box, Chip } from '@mui/material';

interface ChatSuggestionsProps {
    suggestions: string[];
    onSuggestionClick: (suggestion: string) => void;
}

const ChatSuggestions: React.FC<ChatSuggestionsProps> = ({ suggestions, onSuggestionClick }) => {
    return (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
            {suggestions.map((suggestion, index) => (
                <Chip
                    key={index}
                    label={suggestion}
                    onClick={() => onSuggestionClick(suggestion)}
                    sx={{
                        bgcolor: 'background.paper',
                        '&:hover': {
                            bgcolor: 'primary.light',
                            color: 'white',
                        },
                    }}
                />
            ))}
        </Box>
    );
};

export default ChatSuggestions;