import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Badge from '@mui/material/Badge';
import { useMediaQuery } from '@mui/material';

// Placeholder profile image URL
const placeholderImageURL = 'https://via.placeholder.com/150';

const users = [
  { id: 1, name: 'User 1', lastMessage: 'Hello', time: '10:00 AM',online: true },
  { id: 2, name: 'User 2', lastMessage: 'Hi there!', time: '11:30 AM', online: false  },
  { id: 2, name: 'User 2', lastMessage: 'Hi there!', time: '11:30 AM', online: false  },
  { id: 1, name: 'User 1', lastMessage: 'Hello', time: '10:00 AM',online: true },
  { id: 1, name: 'User 1', lastMessage: 'Hello', time: '10:00 AM',online: true },

  { id: 2, name: 'User 2', lastMessage: 'Hi there!', time: '11:30 AM', online: false  },
  { id: 2, name: 'User 2', lastMessage: 'Hi there!', time: '11:30 AM', online: false  },
  { id: 1, name: 'User 1', lastMessage: 'Hello', time: '10:00 AM',online: true },
  { id: 1, name: 'User 1', lastMessage: 'Hello', time: '10:00 AM',online: true },

  { id: 2, name: 'User 2', lastMessage: 'Hi there!', time: '11:30 AM', online: false  },
  { id: 2, name: 'User 2', lastMessage: 'Hi there!', time: '11:30 AM', online: false  },
  { id: 2, name: 'User 2', lastMessage: 'Hi there!', time: '11:30 AM', online: false  },
  { id: 1, name: 'User 1', lastMessage: 'Hello', time: '10:00 AM',online: true },
  { id: 1, name: 'User 1', lastMessage: 'Hello', time: '10:00 AM',online: true },

  { id: 2, name: 'User 2', lastMessage: 'Hi there!', time: '11:30 AM', online: false  },
  { id: 1, name: 'User 1', lastMessage: 'Hello', time: '10:00 AM',online: true },

  { id: 2, name: 'User 2', lastMessage: 'Hi there!', time: '11:30 AM', online: false  },
  { id: 2, name: 'User 2', lastMessage: 'Hi there!', time: '11:30 AM', online: false  },
  // Add more users as needed
];

const UserList = ({ onUserClick}) => {
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const maxHeight = isSmallScreen ? 'auto' : '655px';
  return (
    <div className='my-4 px-4 ' style={{ maxHeight:  maxHeight, overflowY: 'auto' }}>
      <Stack spacing={2} >
        <List style={{ padding: 0 }}>
          {users.map((user, index) => (
            <ListItem key={index} alignItems="flex-start" style={{ border: '1px solid #ccc', display: 'flex', justifyContent: 'space-between', borderRadius: '10px', marginTop: '5px' }} onClick={() => onUserClick(user)}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <ListItemAvatar>
                  <Badge
                    overlap="circular"
                    color="primary"
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    variant="dot"
                    invisible={!user.online}
                    
                  >
                    <Avatar alt={user.name} src={placeholderImageURL} />
                  </Badge>
                </ListItemAvatar>
                <ListItemText
                  primary={user.name}
                  secondary={user.lastMessage.length > 15 ? user.lastMessage.substring(0, 15) + '...' : user.lastMessage}
                />
              </div>
              <div style={{ color: 'green' }}>{user.time}</div>
            </ListItem>
          ))}
        </List>
      </Stack>
    </div>
  );
};

export default UserList;
