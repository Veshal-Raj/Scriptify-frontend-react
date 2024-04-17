const userRoutes = {
    signup: '/user/register',
    verifyOTP: '/user/verify-otp',
    login: '/user/login',
    latestBlog: '/user/latest-blog',
    trendingBlog: '/user/trending-blog',
    createBlog: '/user/create-blog',
    exploreTags:'/user/explore-tags',
    filterbyTags:'/user/filterbyTags',
    search: '/user/search',
    profileDetails: '/user/get-profile',
    fetchUserBlogs:'/user/fetchUserBlog',
    fetchSingleBlog: '/user/fetchSingleBlog',
    fetchSimilarBlogs: '/user/fetchSimilarBlogs',
    increaseReadCount: '/user/increaseReadCount',
    followUser: '/user/followUser',
    unfollowUser: '/user/unfollowUser',
    likeBlog: '/user/likeBlog',
    unlikeBlog: '/user/unlikeBlog',
    initialLike: '/user/initialLike',
    saveBlog: '/user/saveBlog',
    unSaveBlog: '/user/unSaveBlog',
    savedBlogs: '/user/savedBlogs',
    listFollowers: '/user/listFollowers',
    listFollowings:'/user/listFollowings',
    addComment: '/user/addComment',
    initialComments: '/user/initialComments',
    replyComment: '/user/replyComment',
    reportBlog: '/user/reportBlog',
    checkUserSubscribed: '/user/checkUserSubscribed',
    monthlySubscription: '/user/monthlySubscription',
    annualSubscription: '/user/annualSubscription',
    reciptUrl: '/user/reciptUrl',
    fetchAllUsers: '/user/fetchAllUsers',
    sendChat: '/user/sendChat',
    getChat: '/user/getChat',
    fetchAllUserNotification: '/user/fetchAllUserNotification',
    notificationSeen: '/user/notificationSeen',
    notificationCount: '/user/notificationCount',
    chatUserSearch: '/user/chatUserSearch',
    editUserProfile: '/user/editUserProfile',
    changePassword: '/user/changePassword',
    forgotPasswordEmail: '/user/forgotPasswordEmail',
    forgotPasswordOtp: '/user/forgotPasswordOtp',
    changePasswordNotLoggedIn: '/user/changePasswordNotLoggedIn',
    resendOtp: '/user/resendOtp'
}   

export default userRoutes;
