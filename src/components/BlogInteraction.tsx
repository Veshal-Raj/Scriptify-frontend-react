import { useContext, useEffect, useState } from "react"
import { BlogContext } from "./ShowBlogContent"
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CommentIcon from '@mui/icons-material/Comment';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, List, ListItem, ListItemIcon, ListItemText, Paper, Popover, TextField, Tooltip } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import XIcon from '@mui/icons-material/X';
import { useSelector } from "react-redux";
import ForumIcon from '@mui/icons-material/Forum';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useMutation, useQuery } from "@tanstack/react-query";
import { checkUserSubscribedApi, initialLikeApi, likeBlogApi, reportBlogApi, saveBlogApi, unLikeBlogApi, unSaveBlogApi } from "../api/user";
import { toast } from 'sonner'
import CommentDrawer from "./CommentDrawer";
import { RootState } from "../redux/appStore";


interface BlogData {
    // title: string;
    // _id: string;
    // blog_id: string;
    // activity: {
    //     total_likes: number;
    //     total_comments: number;
    // };
    // author: {
    //     personal_info: {
    //         username: string;
    //     };
    //     _id: string;
    // };
    activity: any;
    blogId: string;
    title: string;
    userId: string | undefined;
}


const BlogInteraction = () => {
    const blogContext = useContext(BlogContext);
    const { userData } = useSelector((state: RootState) => state.user)
    const [isLiked, setIsLiked] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const [isCommentsDrawerOpen, setIsCommentsDrawerOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [reportReason, setReportReason] = useState('');
    const [, setChatClicked] = useState(false)
    const navigate = useNavigate()

    const { data: initialBlogQuery } = useQuery({
        queryKey: ["initialQuery"],
        queryFn: async () => {
            if (userId) {
                const result = await initialLikeApi(userId, blogId.toString())
                return result
            }
        }
    })

    useEffect(() => {
        initialBlogQuery
    }, [])

    useEffect(() => {
        if (initialBlogQuery && initialBlogQuery.data && initialBlogQuery.data.response) {
            setIsLiked(initialBlogQuery.data.response.isLiked);
            setIsSaved(initialBlogQuery.data.response.isSaved);
        }
    }, [initialBlogQuery]);

    const { mutate: likeBlog } = useMutation({
        mutationFn: likeBlogApi,
        onSuccess: () => {
            setIsLiked(true)
            setSingleBlogData((prevState: BlogData) => ({
                ...prevState,
                activity: {
                    ...prevState.activity,
                    total_likes: prevState.activity.total_likes + 1
                }
            }));
        },
        onError: () => toast.error('Something went wrong, Please try again later.')
    })

    const { mutate: unLikeBlog } = useMutation({
        mutationFn: unLikeBlogApi,
        onSuccess: () => {
            setIsLiked(false)
            setSingleBlogData((prevState: BlogData) => ({
                ...prevState,
                activity: {
                    ...prevState.activity,
                    total_likes: prevState.activity.total_likes - 1
                }
            }));
        },
        onError: () => toast.error('Something went wrong, Please try again later.')
    })

    const { mutate: saveBlog } = useMutation({
        mutationFn: saveBlogApi,
        onSuccess: (response) => {
            const result = response.data.response.success
            if (result) {
                setIsSaved(true)
                toast.success('Blog Saved Successfully')
            }
        },
        onError: () => toast.error('Something went wrong, Please try again later.')
    })

    const { mutate: unSaveBlog } = useMutation({
        mutationFn: unSaveBlogApi,
        onSuccess: (response) => {
            const result = response.data.response.success
            if (result) {
                setIsSaved(false)
                toast.success('Blog Unsaved Successfully')
            }
        },
        onError: () => toast.error('Something went wrong, Please try agian later.')
    })

    const { mutate: reportBlog } = useMutation({
        mutationFn: reportBlogApi,
        onSuccess: (response) => {
            if (response.status == 200) {
                setAnchorEl(null)
                toast.success('Blog reported successfully!')
            }
        },
        onError: () => {
            toast.error('Blog reported successfully!', {
                description: 'Please try again later',
            })
        }
    })

    const { mutate: userSubscribed } = useMutation({
        mutationFn: checkUserSubscribedApi,
        onSuccess: (response) => {
            if (response.data.response === true) navigate('/user/chat')
            else navigate('/subscription')
        }
    })


    // Check if the context is defined
    if (!blogContext.singleBlogData) {
        // Handle the case where the context is undefined, e.g., by returning null or a loading state
        return null;
    }

    const { singleBlogData: { title, _id, blog_id, activity, author: { _id: authorId } },
        setSingleBlogData } = blogContext
    const total_likes = activity?.total_likes ?? 0;
    const total_comments = activity?.total_comments ?? 0;

    const userId = userData?._id

    const blogId = _id

    const data = {
        blogId: blogId,
        userId: userId
    }

    const commentData = {
        userId: userId,
        authorId: authorId,
        blogId: blog_id || '',
        _id: _id 
    }





    const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);

    const handlePopoverClose = () => setAnchorEl(null);

    const open = Boolean(anchorEl);

    const isSameUser = userId === authorId

    const handleLike = () => likeBlog(data)

    const handleUnLike = () => unLikeBlog(data)

    const handleSave = () => saveBlog(data)

    const handleUnSave = () => unSaveBlog(data)

    const handleCommentsDrawerOpen = () => setIsCommentsDrawerOpen(true);

    const handleCommentsDrawerClose = () => setIsCommentsDrawerOpen(false);

    const handleReportClick = () => setIsModalOpen(true);

    const handleCloseModal = () => setIsModalOpen(false);

    const handleReportReasonChange = (event: React.ChangeEvent<HTMLInputElement>) => setReportReason(event.target.value);

    const handleReportSubmit = () => {
        if (reportReason.trim() === '') {
            toast.error("Please write the reason for reporting.")
            return
        }
        const data = {
            blog_id: blogId,
            reportedBy: userId,
            reason: reportReason
        }
        reportBlog(data)
        handleCloseModal();
    };

    const handleChatClick = () => {
        setChatClicked(true)
        userSubscribed(userId)
    }

    return (
        <>
            <hr className="border-gray-200 my-2" />
            <div className="flex gap-6 justify-between">
                <div>
                    <div className="flex gap-3 items-center">
                        {!isLiked ? <>
                            <Tooltip title="Like" placement="left">
                                <IconButton onClick={handleLike}>
                                    <FavoriteBorderIcon />
                                </IconButton>
                            </Tooltip>
                        </> : <>
                            <Tooltip title="Unlike" placement="left">
                                <IconButton onClick={handleUnLike}>
                                    <FavoriteIcon color="warning" />
                                </IconButton>
                            </Tooltip>
                        </>
                        }
                        <p className="text-xl text-gray-600">{total_likes}</p>
                        <Tooltip title="Comment" placement="bottom">
                            <IconButton onClick={handleCommentsDrawerOpen}>
                                <CommentIcon />
                            </IconButton>
                        </Tooltip>
                        <p className="text-xl text-gray-600">{total_comments}</p>
                        <CommentDrawer open={isCommentsDrawerOpen} onClose={handleCommentsDrawerClose}
                            title={title} commentData={commentData} />
                        {!isSameUser && <Tooltip title="Chat" placement="right">
                            <IconButton onClick={handleChatClick}>
                                <ForumIcon />
                            </IconButton>
                        </Tooltip>}
                    </div>
                </div>
                <div className="flex gap-6 items-center">
                    <Tooltip title="Twitter" placement="top">
                        <div>
                            <Link to={`https://twitter.com/intent/tweet?text=Read${title}&url=${location.href}`}>
                                <XIcon />
                            </Link>
                        </div>
                    </Tooltip>
                    {!isSameUser &&
                        <>
                            <IconButton onClick={handlePopoverOpen}>
                                <MoreVertRoundedIcon />
                            </IconButton>
                            <Popover open={open} anchorEl={anchorEl} onClose={handlePopoverClose}
                                anchorOrigin={{ vertical: 'bottom', horizontal: 'center', }}
                                transformOrigin={{ vertical: 'top', horizontal: 'center', }} >
                                <Paper>
                                    <List>
                                        <ListItem button>
                                            {isSaved ? (
                                                <ListItemIcon onClick={handleUnSave}>
                                                    <BookmarkIcon color="primary" />
                                                </ListItemIcon>
                                            ) : (
                                                <ListItemIcon onClick={handleSave}>
                                                    <BookmarkBorderIcon />
                                                </ListItemIcon>
                                            )}
                                            <ListItemText primary="Save" />
                                        </ListItem>
                                        <ListItem button onClick={handleReportClick}>
                                            <ListItemIcon>
                                                <ReportGmailerrorredIcon />
                                            </ListItemIcon>
                                            <ListItemText primary="Report" />
                                        </ListItem>
                                    </List>
                                </Paper>
                            </Popover>
                            <Dialog open={isModalOpen} onClose={handleCloseModal} sx={{ borderRadius: '12px' }} >
                                <DialogTitle>Report Blog</DialogTitle>
                                <DialogContent>
                                    <TextField autoFocus margin="dense" id="report-reason" label="Reason for report *" type="text"
                                        fullWidth value={reportReason} onChange={handleReportReasonChange} multiline rows={4} />
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleCloseModal} color="secondary">Cancel</Button>
                                    <Button onClick={handleReportSubmit} color="primary">Report</Button>
                                </DialogActions>
                            </Dialog>
                        </>
                    }
                </div>
            </div>
            <hr className="border-gray-200 my-2" />
        </>
    )
}

export default BlogInteraction