import React from 'react';
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';

interface NotificationBellProps {
    unreadCount: number;
}

const NotificationBell: React.FC<NotificationBellProps> = ({ unreadCount }) => {
    return (
        <Badge 
      badgeContent= { unreadCount }
    color = "error"
    overlap = "circular"
    invisible = { unreadCount === 0
}
    >
    <NotificationsIcon 
        style={ { cursor: 'pointer' } }
    />
    </Badge>
  );
};

export default NotificationBell;
