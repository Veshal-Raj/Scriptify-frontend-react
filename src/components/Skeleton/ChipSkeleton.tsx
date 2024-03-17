import { motion } from 'framer-motion';
import { Skeleton } from '@mui/material';

const TagSkeleton = ({ count = 15 }) => {
    const skeletonChips = Array.from({ length: count }, (_, i) => i);

    return (
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="mt-5">
            <div className="flex flex-wrap gap-3" style={{ flexWrap: 'wrap', justifyContent: 'flex-start' }}>
                {skeletonChips.map((_, i) => (
                    <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.1 * i }}>
                        <Skeleton variant="text" width={60} height={32} animation="wave" />
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};

export default TagSkeleton;
