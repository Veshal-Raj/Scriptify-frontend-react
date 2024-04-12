import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import { Box } from '@mui/material';
import { IConversation } from '../../@types/Tchat';
import { useSelector } from 'react-redux';
import { useEffect, useRef } from 'react';
import { timeAgo } from '../../hooks/useDate';


interface Props {
    conversationData: IConversation[];
    selectedUserId: string;
}

const ChatWindow: React.FC<Props> = ({ conversationData, selectedUserId }) => {
    const messagesEndRef =  useRef<HTMLDivElement>(null);
    const { userData } = useSelector(state => state.user)
    const cData = conversationData[0]
    const { selectedUser } = useSelector(state => state.chat)

    console.log('select user from store in chatwindow --- ', selectedUser)
    // if (cData?.receiver.id !== selectedUserId) return <></>
   

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }


    const userId = userData._id

    // console.log('receiver id --> ', conversationData[0])
    // console.log('selected user id -->',selectedUserId)

    useEffect(()=>{
        scrollToBottom()
    }, [conversationData])

    
    // console.log('selected user from state --- ', sel)

   
    return (
        <>
            <Box className='bg-[#E1DFEA] h-[100%] pt-5 pb-10 relative' sx={{ overflowY: 'auto', maxHeight: 'calc(100vh - 130px)' }} >
                {conversationData.map((conversation, index) => (
                    <Grid key={index} container spacing={2} >

                        {/* Sender's message */}
                        <Grid item xs={12} container justifyContent={conversation.sender.id === userId ? "flex-end" : "flex-start"} sx={{ padding: '5px' }}>
                            <Grid item >
                                <Box sx={{ padding: 1 }} >
                                    {conversation.sender.id !== userId && conversation.receiver && ( /* Add null check */
                                        <Avatar src={conversation.receiver?.profile_img} />
                                    )}
                                </Box>
                            </Grid>
                            <Grid item sx={{ maxWidth: '80%' }} >
                                <Paper
                                    variant="outlined"
                                    sx={{
                                        padding: '10px',
                                        backgroundColor: conversation.sender.id === userId ? '#0087FD' : '#E1E5EC',
                                        wordWrap: 'break-word',
                                        overflowWrap: 'break-word',
                                        borderRadius: '10px', // All corners curved
                                        borderTopRightRadius: conversation.sender.id === userId ? '0px' : '10px',
                                        borderTopLeftRadius: conversation.sender.id !== userId ? '0px' : '10px',
                                    }}
                                >
                                    <Typography variant="body1" color={conversation.sender.id === userId ? "white" : "black"}>{conversation.message}</Typography>
                                </Paper>
                                <div className={`flex ${conversation.sender.id === userId ? 'justify-end' : 'justify-start'}`}>
                                    <Typography variant="caption" color="textSecondary">
                                        {timeAgo(conversation.time)}
                                    </Typography>
                                </div>
                            </Grid>
                            <Grid item >
                                <Box sx={{ padding: 1 }}>
                                    {/** need to change the avatar logic, ( !== ) change this into ( === ) */}
                                    {conversation.sender.id === userId ? <Avatar  src={conversation.sender.profile_img} /> : null}
                                </Box>
                            </Grid>
                        </Grid>
                    </Grid>
                ))}
            <div ref={messagesEndRef} />
            </Box>
            {/** for rendering this window */}
            <p className='hidden' >{selectedUserId}</p>
        </>
    );
};

export default ChatWindow;
