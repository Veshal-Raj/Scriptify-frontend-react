import { Skeleton } from '@mui/material'


const MobileFooterSkeleton = () => {
    return (
        <div className="container mx-auto">
            <Skeleton variant='text' width='100%' />
            <Skeleton variant='text' width='100%' />
            <Skeleton variant='text' width='100%' />
            <Skeleton variant='text' width='100%' />
            <Skeleton variant='text' width='100%' />
        </div>
    )
}

export default MobileFooterSkeleton