import React from 'react';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

const placeholderImageURL = 'https://via.placeholder.com/150';

const user = {
    id: 1,
    name: 'John Doe',
    online: true,
    lastSeen: 'Just now', // Assuming it's a string representation of the last seen time
  };


const ChatWindowHeader = () => {

    const renderOnlineStatus = () => {
        if (user.online) {
          return <Typography variant="caption" style={{ color: 'green' }}>Online</Typography>;
        } else {
          // Assuming 'lastSeen' is a property representing the last seen time
          return <Typography variant="caption">Last seen: {user.lastSeen}</Typography>;
        }
      };

      return (
<div className="flex items-center py-3 px-3 border-b ">
          <Avatar alt={user.name} src={placeholderImageURL} />
          <div style={{ marginLeft: '10px' }}>
            <Typography variant="subtitle1">{user.name}</Typography>
            {renderOnlineStatus()}
          </div>
        </div>
      );
}

export default ChatWindowHeader