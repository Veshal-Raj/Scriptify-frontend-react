import {  Container, Grid, Typography } from '@mui/material';

import { useNavigate } from 'react-router-dom';

import { Button } from "@mui/material";
import { useMediaQuery } from '@mui/material';
import paymentCancel from '../assests/imgs/payment_failed.jpg'


const PaymentError = () => {
   
    const navigate = useNavigate()

    const isSmallScreen = useMediaQuery('(max-width:600px)')

    return (
        <Container maxWidth="md">
        <Grid container spacing={2} justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
            <Grid item xs={12}>
                <Typography variant="h4" align="center" gutterBottom>
                    Payment Failed!
                </Typography>
                <Typography variant="body1" align="center" gutterBottom>
                   Please try again later.
                </Typography>
                <Typography variant="body1" align="center" gutterBottom>
                    Have a great day!
                </Typography>
            </Grid>
            <img src={paymentCancel} alt='paymentCancel' style={{ height: '500px' }} />
            <Grid item xs={6} sm={6}>
                <Button
                    fullWidth={!isSmallScreen}
                    variant="contained"
                    color="primary"
                    onClick={() => navigate('/user/feed')}
                >
                    GO BACK
                </Button>
            </Grid>
            
        </Grid>
    </Container>
    );
};

export default PaymentError;
