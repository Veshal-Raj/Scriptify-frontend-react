import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import { SetStateAction, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useSelector } from 'react-redux';
import { useMutation } from '@tanstack/react-query';
import { sendChatApi } from '../../api/user';
import {  INewConversation } from '../../@types/Tchat';
import EmojiPicker from 'emoji-picker-react';


const InputArea =  ({ setConversationData, socket, selectedUserId }) => {
  const [message, setMessage] = useState('')
  const [showEmojiPicker, setShowEmojiPicker] = useState(false); 
  const selectedUser = useSelector((state) => state.chat.selectedUser);
  const { userData } = useSelector(state => state.user)

  const { mutate:sendChat } = useMutation({
    mutationFn: sendChatApi,
    onError: (error) => {
      toast.error(error.message)
    }
  })

  const handleMessageChange = (event: { target: { value: SetStateAction<string>; }; }) => {
    setMessage(event.target.value);
  };

  
  const handleSendMessage =async () => {
    if (message.trim().length === 0) {
      toast.info('Type something...')
      return; // Prevent sending message if it's empty
    }
    const newConversation: INewConversation = {
      sender: { id: userData._id, name: userData.personal_info.username, profile_img: userData.personal_info.profile_img},
      receiver: { id: selectedUser.userId, name: selectedUser.username, profile_img: selectedUser.profileImage},
      message,
      time: new Date()
    }

    sendChat(newConversation)

    setConversationData((prevData) => [...prevData, newConversation])
    await socket.emit("send_message", newConversation)
    setMessage('')
  }

  useEffect(()=> {
   selectedUser 
  },[sendChat])

  useEffect(()=>{
    socket.on("receive_message", (data: any) => {
      // console.log('receive_message -->> ', data)
      console.log('==============================', data)
      console.log(selectedUserId,'----', data.receiver.id)
      console.log(selectedUserId,'----', data.sender.id) 
       if (selectedUserId === data.sender.id) {

        // console.log('selecteduser from state -- ', selectedUser)
        // console.log('selecteduser form props -- ', selectedUserId)
        // if (data.sender.id === selectedUser)
          setConversationData((prevData: any) => [...prevData, data])
      }
      

    })
  },[socket])

  const handleKeyPress = (event: { key: string; }) => {
    if (event.key === 'Enter') {
      handleSendMessage();
      setShowEmojiPicker(false)
    }
  };

  const handleEmojiClick = (event: any) => {
    setMessage(prevmessage => prevmessage + event.emoji);
  };

  return (
    <div className=' relative '>
    <div className='absolute -translate-y-[485px]  '>

    {showEmojiPicker && <EmojiPicker onEmojiClick={handleEmojiClick} />}
    </div>

    <Box
      position="fixed"
      bottom={0}
      width="67%"
      bgcolor="#F5F7FB"
      padding={2}
      marginRight={10}
      border="1px solid #ccc"
      display="flex"
      alignItems="center"
      borderRadius={1}
      zIndex={1000} 
    >
        <EmojiEmotionsIcon color='primary' style={{ marginRight: '5px' }} onClick={() => setShowEmojiPicker(!showEmojiPicker)} />

      <TextField
        label="Type something..."
        variant="outlined"
        fullWidth
        // multiline  
        // rows={3}   
        value={message}
        onChange={handleMessageChange}
        onKeyDown={handleKeyPress}
        // Add any other props you need for the TextField
      />
      <IconButton color="primary" aria-label="send" onClick={handleSendMessage}>
        <SendIcon />
      </IconButton>
    </Box>
    </div>
  );
};

export default InputArea;
