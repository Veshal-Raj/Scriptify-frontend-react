import { Avatar, Box, Typography, useMediaQuery } from '@mui/material';

interface Notification {
   
    text: string;
    image: string;
    timestamp: string;
}


const NotificationBox = ({ text, image, timestamp }: Notification) => {
    const isLargeScreen = useMediaQuery('(min-width:700px)');
    const isExtraLargeScreen = useMediaQuery('(min-width:800px)');
    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: isLargeScreen ? "10px" : "auto",
                marginY: '5px',
                borderBottom: "1px solid #ccc",
                borderRadius: "5px",
                minWidth: isLargeScreen ? "700px" : "auto", 
                maxWidth: isExtraLargeScreen ? "800px" : "100%",
                minHeight: isLargeScreen ? "70px": "auto"
            }}
        >
            <Avatar  sx={{ mx: isLargeScreen? 2: 1 , width: isLargeScreen? 70: 50, height: isLargeScreen ? 70: 50 }} src={image} alt="Notification" />
            <Typography sx={{ mx: isLargeScreen? 2: 0 }}>{text}</Typography>
            <Typography variant='caption' sx={{ mx: isLargeScreen? 2: 1}} alignItems="end">{timestamp}</Typography>
        </Box>
    );
};


export default NotificationBox