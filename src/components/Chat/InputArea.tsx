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
import { IConversation, IUserList } from '../../@types/Tchat';
import EmojiPicker from 'emoji-picker-react';
import { RootState } from '../../redux/appStore';

interface InputAreaProps {
  setConversationData: (data: any) => void;
  socket: any; 
  selectedUserId: string | IUserList; 
 }

const InputArea = ({ setConversationData, socket, selectedUserId }: InputAreaProps) => {
  const [message, setMessage] = useState('')
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const selectedUser = useSelector((state: RootState) => state.chat.selectedUser);
  const { userData } = useSelector((state: RootState) => state.user)

  const { mutate: sendChat } = useMutation({
    mutationFn: sendChatApi,
    onError: (error) => {
      toast.error(error.message)
    }
  })

  const handleMessageChange = (event: { target: { value: SetStateAction<string>; }; }) => {
    setMessage(event.target.value);
  };


  const handleSendMessage = async () => {
    if (message.trim().length === 0) {
      toast.info('Type something...')
      return; // Prevent sending message if it's empty
    }
    const newConversation: IConversation = {
      sender: { id: userData?._id, name: userData?.personal_info.username ?? '', profile_img: userData?.personal_info.profile_img ?? '' },
      receiver: { id: selectedUser ? selectedUser?.userId ?? undefined : undefined, name: selectedUser.username, profile_img: selectedUser.profileImage },
      message,
      time: new Date(),
    } 

    
    sendChat(newConversation)

    setConversationData((prevData: IConversation[]) => [...prevData, newConversation])
    await socket.emit("send_message", newConversation)
    setMessage('')
  }

  useEffect(() => {
    selectedUser
  }, [sendChat])

  useEffect(() => {
    socket.on("receive_message", (data: any) => {
      if (selectedUserId === data.sender.id) {
        setConversationData((prevData: any) => [...prevData, data])
      }
    })
  }, [socket])

  const handleKeyPress = (event: { key: string; }) => {
    if (event.key === 'Enter') {
      handleSendMessage();
      setShowEmojiPicker(false)
    }
  };

  const handleEmojiClick = (event: any) => setMessage(prevmessage => prevmessage + event.emoji);

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
          value={message}
          onChange={handleMessageChange}
          onKeyDown={handleKeyPress}
        />
        <IconButton color="primary" aria-label="send" onClick={handleSendMessage}>
          <SendIcon />
        </IconButton>
      </Box>
    </div>
  );
};

export default InputArea;