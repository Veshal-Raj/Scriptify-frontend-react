import { Button, ButtonGroup, Drawer, IconButton, Typography, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { listFollowersApi, listFollowingsApi } from "../api/user";
import { Link, useParams } from "react-router-dom";

interface ProfileFollowersDrawerProps {
    open: boolean;
    onClose: () => void;
   }

   interface FollowerInfo {
    _id: string;
    personal_info: {
        profile_img: string;
        username: string;
    };
}

const ProfileFollowersDrawer = ({ open, onClose }: ProfileFollowersDrawerProps) => {
    const [, setDrawerOpen] = useState(open);
    const [viewFollowers, setViewFollowers] = useState(true);
    const [followersArray, setFollowersArray] = useState<FollowerInfo[]>([])
    const [followingsArray, setFollowingsArray] = useState<FollowerInfo[]>([])

    const { id: userId } = useParams()

    const { data: listFollowers, refetch: refetchFollowers } = useQuery({
        queryKey: ["listFollowersQuery"],
        queryFn: async () => {
            if (userId) {
            const result = await  listFollowersApi(userId)
            return result
            }
        }

    });

    const { data: listFollowings, refetch: refetchFollowings } = useQuery({
        queryKey: ["listFollowingQuery"],
        queryFn: async () => {
            if (userId) {
            const result = await listFollowingsApi(userId)
            return result
            }
        }
    })

    useEffect(() => {
        if (listFollowers)  setFollowersArray(listFollowers.data.response); 
    }, [listFollowers]);

    useEffect(() => {
        if (listFollowings) setFollowingsArray(listFollowings.data.response)
    }, [listFollowings])

    useEffect(() => {
        if (open) refetchFollowers();
    }, [open, refetchFollowers])

    const handleDrawerClose = () => {
        setDrawerOpen(false);
        onClose();
    };

    const closeDrawer = () =>  onClose();

    const fetchFollowings = async () => await refetchFollowings();

    const isSmallScreen = useMediaQuery('(max-width:600px)');

    return (
        <Drawer anchor={isSmallScreen ? 'bottom' : 'right'} open={open} onClose={handleDrawerClose}
            PaperProps={{ style: isSmallScreen ? { borderTopLeftRadius: '12px', borderTopRightRadius: '12px' } : {} }}
        >
            <div className="my-[16px] mx-[20px]">
                <ButtonGroup fullWidth variant="text" aria-label="outlined primary button group">
                    <Button onClick={() => setViewFollowers(true)} >
                        Followers
                    </Button>
                    <Button sx={{ marginRight: 1 }} onClick={() => { setViewFollowers(false); fetchFollowings(); }} >
                        Followings
                    </Button>
                </ButtonGroup>
            </div>
            <div className="my-[16px] mx-[20px]">
                {viewFollowers ? (
                    followersArray.length === 0 ? (
                        <div className="flex justify-center border border-black border-opacity-50 p-5 rounded-lg">
                            <Typography>No Followers</Typography>
                        </div>
                    ) : (
                        followersArray.map((follower, index) => (
                            <Link to={`/user/${follower._id}`} key={index} className="text-black text-opacity-50">
                                <motion.div key={index} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.2 }}
                                    style={{ marginBottom: '8px', display: 'flex', alignItems: 'center' }}
                                    className="border border-black border-opacity-50 px-5 py-3 rounded-lg flex cursor-pointer"
                                    onClick={() => closeDrawer()}
                                >
                                    <img src={follower.personal_info.profile_img} alt={follower.personal_info.username} style={{ width: '50px', height: '50px', borderRadius: '50%', marginRight: '8px' }} />
                                    <div >
                                        <Typography variant="h5" sx={{ paddingTop: '5px' }}>{follower.personal_info.username}</Typography>
                                    </div>
                                </motion.div>
                            </Link>
                        ))
                    )
                ) : (
                    followingsArray.length === 0 ? (
                        <div className="flex justify-center border border-black border-opacity-50 p-5 rounded-lg ">
                            <Typography>No Following</Typography>
                        </div>
                    ) : (
                        followingsArray.map((following, index) => (
                            <Link to={`/user/${following._id}`} key={index} className="text-black text-opacity-50">
                                <motion.div key={index} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.2 }}
                                    style={{ marginBottom: '8px', display: 'flex', alignItems: 'center' }}
                                    className="border border-black border-opacity-50 px-5 py-3 rounded-lg flex cursor-pointer"
                                >
                                    <img src={following?.personal_info.profile_img} alt={following?.personal_info.username} style={{ width: '50px', height: '50px', borderRadius: '50%', marginRight: '8px' }} />
                                    <div>
                                        <Typography>{following?.personal_info.username}</Typography>
                                    </div>
                                </motion.div>
                            </Link>
                        ))
                    )
                )}
            </div>
            {isSmallScreen && (
                <div style={{ textAlign: 'center', paddingBottom: '16px' }}>
                    <IconButton onClick={handleDrawerClose} sx={{ border: '1px solid rgba(0, 0, 0, 0.5)', borderRadius: '50%' }}>
                        <CloseIcon />
                    </IconButton>
                </div>
            )}
        </Drawer>
    );
};

export default ProfileFollowersDrawer;