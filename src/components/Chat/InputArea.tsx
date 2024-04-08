import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';

const InputArea = () => {
  return (
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
    >
        <EmojiEmotionsIcon color='primary' style={{ marginRight: '5px'}}/>
      <TextField
        label="Type something..."
        variant="outlined"
        fullWidth
        // Add any other props you need for the TextField
      />
      <IconButton color="primary" aria-label="send">
        <SendIcon />
      </IconButton>
    </Box>
  );
};

export default InputArea;
