import { Skeleton } from '@mui/material'

const SingleBlogSkeleton = () => {
  return (
    
    <div className="max-w-[900px] block mx-auto py-10 max-lg:px-[5vw]">
                <Skeleton variant="rectangular" width={600} height={300}  animation="wave" />
                <div className="mt-12">
                    <Skeleton variant="text" width="70%" animation="wave" />
                    <Skeleton variant="text" width="50%" animation="wave" />
                    <Skeleton variant="text" width="20%" animation="wave" />
                    <Skeleton variant="text" width="70%" animation="wave" />
                    <Skeleton variant="text" width="70%" animation="wave" />
                    <Skeleton variant="text" width="70%" animation="wave" />
                    <Skeleton variant="text" width="70%" animation="wave" />
                    <Skeleton variant="text" width="70%" animation="wave" />
                    <Skeleton variant="text" width="70%" animation="wave" />
                    <Skeleton variant="text" width="70%" animation="wave" />
                </div>
            </div>
  )
}

export default SingleBlogSkeleton