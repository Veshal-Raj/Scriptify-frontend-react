import { Avatar, Box, Button, CircularProgress, Grid, List, ListItem, ListItemText, Typography, useMediaQuery } from "@mui/material";
import logo from '../assests/imgs/logo.png';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { benefits, personAvatarUrl } from "../utils/constants/constants";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { annualSubscriptionApi, monthlySubscriptionApi } from "../api/user";
import { useNavigate } from "react-router-dom";



const SubscriptionPage = () => {
    const [isLoadingMonthly, setIsLoadingMonthly] = useState(false);
    const [isLoadingYearly, setIsLoadingYearly] = useState(false);
    const isSmallScreen = useMediaQuery('(max-width:600px)');
    const { userData } = useSelector(state => state.user)
    const navigate = useNavigate()

    const userId = userData._id

    const { mutate: monthlySubscription } = useMutation({
        mutationFn: monthlySubscriptionApi,
        onSuccess: (response) => {
            console.log('mutation working')
            console.log(response.data.response)
            if (response.data.response) {
                window.location.href = response.data.response;
            }
        }
    })

    const { mutate: annuallySubscription } = useMutation({
        mutationFn: annualSubscriptionApi,
        onSuccess: (response ) => {
            console.log(response.data.response) 
            if (response.data.response) {
                window.location.href = response.data.response;
            }
        }
    })

    const handleClickMonthly = () => {
        setIsLoadingMonthly(true);

        const data = {
            userId: userId,
            subscriptionType: 'monthly',
        }

        monthlySubscription(data)
       
    };

    const handleClickYearly = () => {
        setIsLoadingYearly(true);

        const data = {
            userId: userId,
            subscriptionType: 'annually',
        }

        annuallySubscription(data)
        
    };
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
                        <Button variant="contained" color="success" fullWidth sx={{ marginY: 2, borderRadius: 10 }}
                            disabled={isLoadingMonthly || isLoadingYearly} 
                            onClick={handleClickMonthly}
                        >
                        {isLoadingMonthly ? <CircularProgress size={24} color="inherit" /> : 'Select'}
                        </Button>
                        <hr />
                        <List>
                            {benefits.map((benefit, index) => (
                                <ListItem key={index}>
                                    <ListItemText>
                                        <Typography variant="subtitle2" >
                                            <CheckCircleOutlineIcon sx={{ fontSize: '25px', marginRight: '5px', verticalAlign: 'middle' }}
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
                        <Button variant="contained" color="success" fullWidth sx={{ marginY: 2, borderRadius: 10 }}
                            disabled={isLoadingMonthly || isLoadingYearly} 
                            onClick={handleClickYearly}
                        >
                        {isLoadingYearly ? <CircularProgress size={24} color="inherit" /> : 'Select'}
                        </Button>
                        <hr />
                        <List>
                            {benefits.map((benefit, index) => (
                                <ListItem key={index}>
                                    <ListItemText>
                                        <Typography variant="subtitle2" >
                                            <CheckCircleOutlineIcon sx={{ fontSize: '25px', marginRight: '5px', verticalAlign: 'middle', }}
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