import { Box, Skeleton, useMediaQuery } from "@mui/material";

const NotificationSkeleton = () => {
    const isSmallScreen = useMediaQuery('(max-width:600px)');
    return (
        <Box>
            {[1, 2, 3, 4, 5, 6, 7].map(index => (
                <div className="flex border-b mt-2">
                    <Skeleton variant="circular" width={70} height={70} sx={{ marginRight: "10px" }} />
                    <div>
                        <Skeleton key={index} animation="wave" variant="text" width={isSmallScreen ? 250 : 600} height={30} sx={{ marginBottom: "10px", borderRadius: "10px" }} />
                        <Skeleton key={index} animation="wave" variant="text" width={isSmallScreen ? 200 : 450} height={30} sx={{ marginBottom: "20px", borderRadius: "10px" }} />
                    </div>
                </div>
            ))}
        </Box>
    );
};

export default NotificationSkeleton;