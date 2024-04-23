import { motion } from 'framer-motion';
import { Card, CardContent, Chip, Box, Skeleton } from '@mui/material';
import { Link } from "react-router-dom"; const DefaultSkeletionPage = () => {
    return (
        <motion.div>
            <motion.div >
                <Skeleton variant='rectangular' width='100%' height='100px' />
            </motion.div>
            <motion.div className="container mx-auto mt-8">
                <Card className="w-full mb-4 flex flex-col md:flex-row md:min-w-[1000px]" variant="outlined" sx={{ borderRadius: '15px', }}>
                    <CardContent>
                        <Link to="#">
                            <motion.div className="flex gap-2 items-center mb-7">
                                <Skeleton variant="circular" width={40} height={40} />
                                <Skeleton variant="text" width={100} />
                                <Skeleton variant="text" width={80} />
                            </motion.div>
                            <motion.div>
                                <Skeleton variant='rectangular' width='100%' height='100px' />
                                <Skeleton variant="text" width={200} height={30} />
                                <Skeleton variant="text" width={300} height={50} />
                            </motion.div>
                            <motion.div className="flex mt-7">
                                <Chip label={<Skeleton variant="text" width={50} />} variant="outlined" color="primary" />
                                <Skeleton variant="circular" width={40} height={40} />
                                <Skeleton variant="text" width={50} />
                            </motion.div>
                        </Link>
                    </CardContent>
                    <Box className="h-28 md:aspect-square mx-auto my-auto" sx={{ maxWidth: '1000px' }}>
                        <Skeleton variant="rectangular" width="100%" height="100%" />
                    </Box>
                </Card>
            </motion.div>
            <motion.div className=" p-4 mt-8">
                <div className="container mx-auto">
                    <Skeleton variant='text' width='100%' />
                    <Skeleton variant='text' width='100%' />
                    <Skeleton variant='text' width='100%' />
                    <Skeleton variant='text' width='100%' />
                    <Skeleton variant='text' width='100%' />
                </div>
            </motion.div>
        </motion.div>
    )
}

export default DefaultSkeletionPage