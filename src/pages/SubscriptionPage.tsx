import { Avatar, Box, Button, Grid, List, ListItem, ListItemText, Typography, useMediaQuery } from "@mui/material";
import logo from '../assests/imgs/logo.png';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { benefits, personAvatarUrl } from "../utils/constants/constants";



const SubscriptionPage = () => {
    const isSmallScreen = useMediaQuery('(max-width:600px)');
    return (
        <>
            <div className="flex justify-center">
                <img src={logo} alt="logo" className="h-12 m-5 mt-10" />
            </div>
            <div className="px-10">
                <Typography variant={isSmallScreen ? "h5" : 'h4'} align="center" >
                    Go premium to chat with all authors{isSmallScreen ? <></> : <br />} and expand your professional network.
                </Typography>
            </div>
            <Grid container justifyContent="center" spacing={0} >
                <Grid item xs={12} md={4} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Box sx={{ border: '1px solid rgba(0, 0, 0, 0.3)', p: 2, marginY: isSmallScreen ? 5 : 10, maxWidth: 400, borderRadius: 5, marginX: isSmallScreen ? 5 : 0, textAlign: 'center' }}>
                        <Avatar alt="Person Avatar" src={personAvatarUrl} sx={{
                            width: 80, height: 80, marginY: 2,
                            marginLeft: 'auto',  // Center the Avatar horizontally
                            marginRight: 'auto', // Center the Avatar horizontally
                            display: 'block'
                        }} />
                        <Typography variant="h6" sx={{ fontWeight: 'bold', marginTop: 3 }}>Monthly Subscription</Typography>
                        <Typography variant="body1" sx={{ marginBottom: 3 }}>$5 USD/month</Typography>
                        <Typography variant="subtitle2" sx={{ opacity: 0.7 }}>
                            Subscribe to unlock direct author chat and unlimited access to our entire story collection.
                        </Typography>
                        <Button variant="contained" color="success" fullWidth sx={{ marginY: 2, borderRadius: 10 }}>Select</Button>
                        <hr />
                        <List>
                            {benefits.map((benefit, index) => (
                                <ListItem key={index}>
                                    <ListItemText>
                                        <Typography variant="subtitle2" >
                                            <CheckCircleOutlineIcon sx={{ fontSize: 'medium', marginRight: '5px', verticalAlign: 'middle' }}
                                                color="success"
                                            />
                                            {benefit}</Typography>
                                    </ListItemText>
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                </Grid>
                <Grid item xs={12} md={4} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Box sx={{ border: '1px solid rgba(0, 0, 0, 0.3)', p: 2, marginY: 10, maxWidth: 400, borderRadius: 5, marginX: isSmallScreen ? 5 : 0, textAlign: 'center' }}>
                        <Avatar alt="Person Avatar" src={personAvatarUrl} sx={{
                            width: 80, height: 80, marginY: 2,
                            marginLeft: 'auto',  // Center the Avatar horizontally
                            marginRight: 'auto', // Center the Avatar horizontally
                            display: 'block'
                        }} />
                        <Typography variant="h6" sx={{ fontWeight: 'bold', marginTop: 3 }}>Annually Subscription</Typography>
                        <Typography variant="body1" sx={{ marginBottom: 3 }}>$50 USD/month</Typography>
                        <Typography variant="subtitle2" sx={{ opacity: 0.7 }}>
                            Subscribe to unlock direct author chat and unlimited access to our entire story collection.
                        </Typography>
                        <Button variant="contained" color="success" fullWidth sx={{ marginY: 2, borderRadius: 10 }}>Select</Button>
                        <hr />
                        <List>
                            {benefits.map((benefit, index) => (
                                <ListItem key={index}>
                                    <ListItemText>
                                        <Typography variant="subtitle2" >
                                            <CheckCircleOutlineIcon sx={{ fontSize: 'medium', marginRight: '5px', verticalAlign: 'middle', }}
                                                color="success"
                                            />
                                            {benefit}</Typography>
                                    </ListItemText>
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                </Grid>
            </Grid>
        </>
    );
}

export default SubscriptionPage;