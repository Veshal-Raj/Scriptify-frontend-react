import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import { Box } from '@mui/material';

const dummyData = [
    { id: 1, sender: { id: 1, name: 'John', image: 'sender1.jpg' }, receiver: { id: 2, name: 'Jane', image: 'receiver1.jpg' }, message: 'Hello there! ....................................kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkklllllllllllllllll-----------------------------------------------------------llllllllllllllllllllllllllllllllllllllllllllll ', time: '11:30 AM' },
    { id: 2, sender: { id: 2, name: 'Jane', image: 'receiver1.jpg' }, receiver: { id: 1, name: 'John', image: 'sender1.jpg' }, message: 'Hi! How are you?', time: '11:35 AM' },
    { id: 2, sender: { id: 2, name: 'Jane', image: 'receiver1.jpg' }, receiver: { id: 1, name: 'John', image: 'sender1.jpg' }, message: 'Hi! How are you?', time: '11:35 AM' },
    { id: 1, sender: { id: 1, name: 'John', image: 'sender1.jpg' }, receiver: { id: 2, name: 'Jane', image: 'receiver1.jpg' }, message: 'Hello there! ....................................kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkklllllllllllllllll-----------------------------------------------------------llllllllllllllllllllllllllllllllllllllllllllll ', time: '11:30 AM' },
    { id: 1, sender: { id: 1, name: 'John', image: 'sender1.jpg' }, receiver: { id: 2, name: 'Jane', image: 'receiver1.jpg' }, message: 'Hello there! ....................................kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkklllllllllllllllll-----------------------------------------------------------llllllllllllllllllllllllllllllllllllllllllllll ', time: '11:30 AM' },
    { id: 2, sender: { id: 2, name: 'Jane', image: 'receiver1.jpg' }, receiver: { id: 1, name: 'John', image: 'sender1.jpg' }, message: 'Hi! How are you?', time: '11:35 AM' },
    { id: 2, sender: { id: 2, name: 'Jane', image: 'receiver1.jpg' }, receiver: { id: 1, name: 'John', image: 'sender1.jpg' }, message: 'Hi! How are you?', time: '11:35 AM' },
    { id: 2, sender: { id: 2, name: 'Jane', image: 'receiver1.jpg' }, receiver: { id: 1, name: 'John', image: 'sender1.jpg' }, message: 'Hi! How are you?', time: '11:35 AM' },
    { id: 2, sender: { id: 2, name: 'Jane', image: 'receiver1.jpg' }, receiver: { id: 1, name: 'John', image: 'sender1.jpg' }, message: 'Hi! How are you?', time: '11:35 AM' },
    { id: 2, sender: { id: 2, name: 'Jane', image: 'receiver1.jpg' }, receiver: { id: 1, name: 'John', image: 'sender1.jpg' }, message: 'Hi! How are you?', time: '11:35 AM' },
    { id: 2, sender: { id: 2, name: 'Jane', image: 'receiver1.jpg' }, receiver: { id: 1, name: 'John', image: 'sender1.jpg' }, message: 'Hi! How are you?', time: '11:35 AM' },
    { id: 2, sender: { id: 2, name: 'Jane', image: 'receiver1.jpg' }, receiver: { id: 1, name: 'John', image: 'sender1.jpg' }, message: 'Hi! How are you?', time: '11:35 AM' },
    { id: 1, sender: { id: 1, name: 'John', image: 'sender1.jpg' }, receiver: { id: 2, name: 'Jane', image: 'receiver1.jpg' }, message: 'Hello there! ....................................kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkklllllllllllllllll-----------------------------------------------------------llllllllllllllllllllllllllllllllllllllllllllll ', time: '11:30 AM' },
    { id: 1, sender: { id: 1, name: 'John', image: 'sender1.jpg' }, receiver: { id: 2, name: 'Jane', image: 'receiver1.jpg' }, message: 'Hello there! ....................................kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkklllllllllllllllll-----------------------------------------------------------llllllllllllllllllllllllllllllllllllllllllllll ', time: '11:30 AM' },
    { id: 1, sender: { id: 1, name: 'John', image: 'sender1.jpg' }, receiver: { id: 2, name: 'Jane', image: 'receiver1.jpg' }, message: 'Hello there! ....................................kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkklllllllllllllllll-----------------------------------------------------------llllllllllllllllllllllllllllllllllllllllllllll ', time: '11:30 AM' },
    { id: 1, sender: { id: 1, name: 'John', image: 'sender1.jpg' }, receiver: { id: 2, name: 'Jane', image: 'receiver1.jpg' }, message: 'Hello there! ....................................kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkklllllllllllllllll-----------------------------------------------------------llllllllllllllllllllllllllllllllllllllllllllll ', time: '11:30 AM' },
    { id: 1, sender: { id: 1, name: 'John', image: 'sender1.jpg' }, receiver: { id: 2, name: 'Jane', image: 'receiver1.jpg' }, message: 'Hello there! ....................................kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkklllllllllllllllll-----------------------------------------------------------llllllllllllllllllllllllllllllllllllllllllllll ', time: '11:30 AM' },

    // Add more dummy conversations as needed
];

const ChatWindow = () => {
    return (
        <Box className='bg-[#E1DFEA]  pt-5 pb-10' sx={{ overflowY: 'auto', maxHeight: 'calc(100vh - 130px)' }}>
            {dummyData.map(conversation => (
                <Grid key={conversation.id} container spacing={2} >
                    {/* Sender's message */}
                    <Grid item xs={12} container justifyContent={conversation.sender.id === 1 ? "flex-end" : "flex-start"} sx={{ padding: '5px' }}>
                        <Grid item >
                            <Box sx={{ padding: 1 }} >
                                {conversation.sender.id === 2 ? <Avatar alt={conversation.sender.name} src={conversation.sender.image} /> : null}
                            </Box>
                        </Grid>
                        <Grid item sx={{ maxWidth: '80%' }} >
                            <Paper
                                variant="outlined"
                                sx={{
                                    padding: '10px',
                                    backgroundColor: conversation.sender.id === 1 ? '#0087FD' : '#E1E5EC',
                                    wordWrap: 'break-word',
                                    overflowWrap: 'break-word',
                                    borderRadius: '10px', // All corners curved
                                    borderTopRightRadius: conversation.sender.id === 1 ? '0px' : '10px', 
                                    borderTopLeftRadius: conversation.sender.id === 2 ? '0px' : '10px', 
                                }}
                            >
                                <Typography variant="body1" color={conversation.sender.id === 1 ? "white" : "black"}>{conversation.message}</Typography>
                            </Paper>
                            <div className={`flex ${conversation.sender.id === 1 ? 'justify-end' : 'justify-start'}`}>
    <Typography variant="caption" color="textSecondary">{conversation.time}</Typography>
</div>
                        </Grid>
                        <Grid item >
                            <Box sx={{ padding: 1 }}>
                                {conversation.sender.id === 1 ? <Avatar alt={conversation.sender.name} src={conversation.sender.image} /> : null}
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
            ))}
        </Box>
    );
};

export default ChatWindow;
