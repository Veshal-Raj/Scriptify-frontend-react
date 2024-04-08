import { CircularProgress, Container, Grid, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { reciptUrlApi } from '../api/user';
import { useEffect, useState } from 'react';
import { Button } from "@mui/material";
import { useMediaQuery } from '@mui/material';
import paymentSucces from '../assests/imgs/payment_success.jpg'


const SuccessPage = () => {
    const navigate = useNavigate();
    const { userData } = useSelector((state) => state.user);
    const userId = userData._id;
    const [fetchReceipt, setFetchReceipt] = useState(false);
    const [reciptData, setReciptData] = useState(null);
    const [isLoading, setIsLoading] = useState(false)
    const isSmallScreen = useMediaQuery('(max-width:600px)');

    const { data: reciptUrl, refetch: refetchViewDetails } = useQuery({
        queryKey: ['viewDetails'],
        queryFn: () => reciptUrlApi(userId),
    });

    const handleRecipt = async () => {
        console.log('recipt clicked..');
        // Call the API only if fetchReceipt is true
        console.log('recipt ', reciptUrl);
        setFetchReceipt(true);
        setIsLoading(true)
    };

    useEffect(() => {
        refetchViewDetails();
        console.log('recipt ', reciptUrl);
        if (reciptUrl?.data) {
            console.log(reciptUrl.data.response);
            window.location.href = reciptUrl.data.response;
        }
    }, [fetchReceipt]);

    return (
        <Container maxWidth="md">
        <Grid container spacing={2} justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
            <Grid item xs={12}>
                <Typography variant="h4" align="center" gutterBottom>
                    Payment Done!
                </Typography>
                <Typography variant="body1" align="center" gutterBottom>
                    Thank you for completing your secure online payment.
                </Typography>
                <Typography variant="body1" align="center" gutterBottom>
                    Have a great day!
                </Typography>
            </Grid>
            <img src={paymentSucces} alt='paymentsuccessfull' style={{ height: '500px' }} />
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
            <Grid item xs={6} sm={6}>
                <Button
                    fullWidth={!isSmallScreen}
                    variant="contained"
                    color="success"
                    onClick={handleRecipt}
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <CircularProgress size={24} color="inherit" />
                    ) : (
                        'View Receipt'
                    )}
                </Button>
            </Grid>
        </Grid>
    </Container>
    );
};

export default SuccessPage;
