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
    listFollowings:'/user/listFollowings'
}   

export default userRoutes;
