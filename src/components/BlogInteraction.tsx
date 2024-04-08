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
import SubscriptionModal from "./SubscriptionModal";


const BlogInteraction = () => {
    const { singleBlogData: { title, _id, blog_id, activity, activity: { total_likes, total_comments }, author: { personal_info: { username: author_username }, _id: authorId } },
        setSingleBlogData } = useContext(BlogContext)
    const { userData } = useSelector(state => state.user)

    const [isLiked, setIsLiked] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [isCommentsDrawerOpen, setIsCommentsDrawerOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [reportReason, setReportReason] = useState('');
    const [chatClicked, setChatClicked] = useState(false)
    

    const userId = userData._id

    const blogId = _id

    const commentData = {
        userId : userId,
        authorId: authorId,
        blogId: blog_id,
        _id: _id 
    }

    const { data: initialBlogQuery } = useQuery({
        queryKey: ["initialQuery"],
        queryFn: () => initialLikeApi(userId, blogId)
    })

   
    const navigate = useNavigate()
    

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
            setSingleBlogData(prevState => ({
                ...prevState,
                activity: {
                    ...prevState.activity,
                    total_likes: prevState.activity.total_likes + 1
                }
            }));
        },
        onError: () => {
            toast.error('Something went wrong, Please try again later.')
        }
    })

    const { mutate: unLikeBlog } = useMutation({
        mutationFn: unLikeBlogApi,
        onSuccess: () => {
            setIsLiked(false)
            setSingleBlogData(prevState => ({
                ...prevState,
                activity: {
                    ...prevState.activity,
                    total_likes: prevState.activity.total_likes - 1
                }
            }));
        },
        onError: () => {
            toast.error('Something went wrong, Please try again later.')
        }
    })

    const { mutate: saveBlog } = useMutation({
        mutationFn: saveBlogApi,
        onSuccess: (response) => {
            console.log('response form save blog -->>> ', response.data.response.success)
            const result = response.data.response.success
            if (result) {
                setIsSaved(true)
                toast.success('Blog Saved Successfully')
            }
        },
        onError: () => {
            toast.error('Something went wrong, Please try again later.')
        }
    })

    const { mutate: unSaveBlog } = useMutation({
        mutationFn: unSaveBlogApi,
        onSuccess: (response) => {
            console.log('response from unsave blog -->> ', response.data.response.success)
            const result = response.data.response.success
            if (result) {
                setIsSaved(false)
                toast.success('Blog Unsaved Successfully')
            }
        },
        onError: () => {
            toast.error('Something went wrong, Please try agian later.')
        }
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
            console.log('report blog errro')
            toast.error('Blog reported successfully!', {
                description: 'Please try again later',
              })
        }
    })

    const { mutate: userSubscribed } = useMutation({
        mutationFn: checkUserSubscribedApi,
        onSuccess: (response) => {
            console.log('success....')
            console.log(response)
            if (response.data.response === true) {
                // alert('true')
                navigate('/user/chat')
            } else navigate('/subscription')
        }
    })

   
    

    const handlePopoverOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);


    const isSameUser = userId === authorId


    const handleLike = () => {

        const data = {
            blogId: blogId,
            userId: userId
        }
        likeBlog(data)
    }

    const handleUnLike = () => {

        const data = {
            blogId: blogId,
            userId: userId
        }
        unLikeBlog(data)
    }

    const handleSave = () => {
        const data = {
            blogId: blogId,
            userId: userId
        }
        saveBlog(data)
    }

    const handleUnSave = () => {
        const data = {
            blogId: blogId,
            userId: userId
        }
        unSaveBlog(data)
    }

    const handleCommentsDrawerOpen = () => {
        setIsCommentsDrawerOpen(true);
      };
    
      const handleCommentsDrawerClose = () => {
        setIsCommentsDrawerOpen(false);
      };

      const handleReportClick = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleReportReasonChange = (event) => {
        setReportReason(event.target.value);
    };

    const handleReportSubmit = () => {
        // You can send the reportReason to your API endpoint or take further action here
        console.log('Report Reason:', reportReason);
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
        // checkUserSubscribedApi(userId);
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

                        <CommentDrawer
                            open={isCommentsDrawerOpen}
                            onClose={handleCommentsDrawerClose}
                            title={ title }
                            commentData  = {commentData}
                            
                        />

                        {!isSameUser && <Tooltip title="Chat" placement="right">
                            <IconButton onClick={handleChatClick}>
                                <ForumIcon />
                            </IconButton>
                        </Tooltip>}


                    </div>
                </div>

                <div className="flex gap-6 items-center">
                    { /** <<<---- Edit Blog --->>> */}
                    {/* {isSameUser && <Link to={`/editor/${blog_id}`} className="hover:text-blue-600">Edit</Link>} */}
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
                            <Popover
                                open={open}
                                anchorEl={anchorEl}
                                onClose={handlePopoverClose}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'center',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'center',
                                }}
                            >
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
                    <TextField
                        autoFocus
                        margin="dense"
                        id="report-reason"
                        label="Reason for report *"
                        type="text"
                        fullWidth
                        value={reportReason}
                        onChange={handleReportReasonChange}
                        multiline
                        rows={4}
                    />
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
            {/* <SubscriptionModal open={showHelloWorldModal} onClose={handleCloseHelloWorldModal} /> */}
        </>
    )
}

export default BlogInteraction