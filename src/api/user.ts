import Api from '../services/axios';
import userRoutes from '../services/endpoints/userEndPoints';
import { userFormData } from "../@types/Tuser";
import { IConversation } from '../@types/Tchat';

type UserOTP = {
    otp: string;
  };

  interface IncreaseReadCountData {
    userId: string;
    blogId: string;
}

interface FollowUserData {
    authorId: string,
    userId: string
}

interface BlogData {
    blogId: string,
    userId: string
}

interface CommentData {
    commentData: {
        userId: string;
        authorId: string;
        blogId: string;
        _id: string;
    };
    comment: string[];
}

interface  Data {
    notificationId: string;
}

export const signup = async (userData: userFormData) => {
    try {
        const response = await Api.post(userRoutes.signup, userData);
        return response?.data;
    } catch (error) {
        console.error(error);
        throw error; 
    }
}

export const verifyOTP= async (userOTP: UserOTP)=>{
    try {
        const response = await Api.post(userRoutes.verifyOTP, userOTP)
        console.log('userotpn -->> ',userOTP)
        console.log(response)
        return response
    } catch (error) {
        console.error(error);
        throw error
    }
}

export const login = async (userData: userFormData) => {
    try {
        const response = await Api.post(userRoutes.login, userData)
        return response
    } catch (error) {
        console.error(error);
        throw error        
    }
}

export const getLatestBlog = async (page = 1) => {
    try {
        const response = await Api.get(userRoutes.latestBlog, { params: { page } })
        return response?.data
    } catch (error) {
        console.error(error);
        throw error    
    }
}

export const getTrendingBlogs = async () => {
    try {
        const response = await Api.get(userRoutes.trendingBlog)
        return response?.data
    } catch (error) {
        console.error(error);
        throw error  
    }
}

export const createBlog = async () => {
    try {
        const response = await Api.post(userRoutes.createBlog)
        return response
    } catch (error) {
        console.error(error);
        throw error
    }
}

export const fetchTags = async () => {
    try {
        const response = await Api.get(userRoutes.exploreTags)
        return response
    } catch (error) {
        console.error(error);
        throw error        
    }
}

export const filterbyTags = async (tag: string) => {
    try {
        console.log(tag)
        // return
        const response = await Api.post(userRoutes.filterbyTags, tag)
        return response
    } catch (error) {
        console.error(error)
        throw error
    }
}

export const searchQuery = async (query: string) => {
    try {
        console.log(query)
        const response = await Api.get(`${userRoutes.search}?query=${query}`)
        return response
    } catch (error) {
        console.error(error);
        throw error
        
    }
}

export const profileDetails = async (userId: string) => {
    try {
        const response = await Api.post(userRoutes.profileDetails, userId)
        return response
    } catch (error) {
        console.error(error);
        throw error        
    }
}

export const fetchUserBlogs = async (userId: string) =>{
    try {
        const response = await Api.get(`${userRoutes.fetchUserBlogs}?query=${userId}`)
        console.log('fetch blogs response -- >>',response)
        return response
    } catch (error) {
        console.error(error);
        throw error        
    }
}

export const fetchSingleBlog = async (blogId: string) => {
    try {
        const response = await Api.get(`${userRoutes.fetchSingleBlog}?query=${blogId}`)
        console.log('response -->',response)
        return response
    } catch (error) {
        console.error(error);
        throw error        
    }
}

export const fetchSimilarBlogs = async (tags: string[]) => {
    try {
        const response = await Api.post(userRoutes.fetchSimilarBlogs, tags)
        return response;
    } catch (error) {
        console.error(error);
        throw error        
    }
}

export const increaseReadCount = async (data: IncreaseReadCountData) => {
    try {
        console.log('data obj >>>>>>>>>>. ',data)
        const response = await Api.post(userRoutes.increaseReadCount, data)
        return response
    } catch (error) {
        console.error(error);
        throw error        
    }
}

export const followUserApi = async (data: FollowUserData ) => {
    try {
        console.log(data)
        const response = await Api.post(userRoutes.followUser, data)
        return response
    } catch (error) {
        console.error(error);
        throw error        
    }
}

export const unfollowUserApi = async (data: FollowUserData) => {
    try {
        console.log(data)
        const response = await Api.post(userRoutes.unfollowUser, data)
        return response
    } catch (error) {
        console.error(error);
        throw error
    }
}

export const likeBlogApi = async (data: BlogData) => {
    try {
        console.log(data)
        const response = await Api.post(userRoutes.likeBlog, data)
        return response
    } catch (error) {
        console.error(error);
        throw error        
    }
}

export const unLikeBlogApi = async (data: BlogData) => {
    try {
        console.log(data)
        const response = await Api.post(userRoutes.unlikeBlog, data)
        return response
    } catch (error) {
        console.error(error);
        throw error
    }
}

export const initialLikeApi = async (userId: string, blogId: string) => {
    try {
        const response = await Api.get(`${userRoutes.initialLike}?userId=${userId}&blogId=${blogId}`)
        return response
    } catch (error) {
        console.error(error);
        throw error
    }
}

export const saveBlogApi = async ( data: BlogData) => {
    try {
        const response = await Api.post(userRoutes.saveBlog, data)
        return response
    } catch (error) {
        console.error(error);
        throw error
    }
}

export const unSaveBlogApi = async (data: BlogData) => {
    try {
        const response = await Api.post(userRoutes.unSaveBlog, data)
        return response
    } catch (error) {
        console.error(error);
        throw error
    }
}

export const savedBlogsApi = async (userId: string) => {
    try {
        const response = await Api.get(`${userRoutes.savedBlogs}?userId=${userId}`)
        return response
    } catch (error) {
        console.error(error);
        throw error
    }
}

export const listFollowersApi = async (userId: string) => {
    try {
        const response = await Api.get(`${userRoutes.listFollowers}?userId=${userId}`)
        return response
    } catch (error) {
        console.error(error);
        throw error
    }
}

export const listFollowingsApi = async (userId: string) => {
    try {
        const response = await Api.get(`${userRoutes.listFollowings}?userId=${userId}`)
        return response
    } catch (error) {
        console.error(error);
        throw error
    }
}

export const addCommentApi = async ( data: CommentData) => {
    try {
        console.log('commentData --- ', data)
        const response = await Api.post(userRoutes.addComment, data)
        return response
    } catch (error) {
        console.error(error);
        throw error
    }
}

export const initialCommentsApi = async ( blogId: string ) => {
    try {
        console.log('blogId --- ', blogId)
        const response = await Api.get(`${userRoutes.initialComments}?blogId=${blogId}`)
        console.log('response of initial comments --->>> ', response)
        return response
    } catch (error) {
        console.error(error);
        throw error
    }
}

export const replyCommentApi = async (data: any) => {
    try {
        console.log('reply data >>> ', data)
        const response = await Api.post(userRoutes.replyComment, data)
        return response
    } catch (error) {
        console.error(error);
        throw error
    }
}

export const reportBlogApi = async (data: any )=> {
    try {
        console.log('report data >> ', data)
        const response = await Api.post(userRoutes.reportBlog, data)
        return response
    } catch (error) {
        console.error(error);
        throw error
    }
}

export const checkUserSubscribedApi = async (userId: string) => {
    
    try {
        const response = await Api.post(userRoutes.checkUserSubscribed, userId)
        console.log('response -->> ', response)
        return response
    } catch (error) {
        console.error(error);
        throw error
    }
}

export const monthlySubscriptionApi = async (data: any) => {
    try {
        const response = await Api.post(userRoutes.monthlySubscription, data)
        return response
    } catch (error) {
        console.error(error);
        throw error        
    }
}

export const annualSubscriptionApi = async (data: any) => {
    try {
        const response = await Api.post(userRoutes.annualSubscription, data)
        return response
    } catch (error) {
        console.error(error);
        throw error
    }
}


export const reciptUrlApi = async (userId: string) => {
    try {
        const response = await Api.get(`${userRoutes.reciptUrl}?userId=${userId}`)
        return response
    } catch (error) {
        console.error(error);
        throw error
    }
}

export const sendChatApi = async (chatSendData: IConversation) => {
    try {
        const response = await Api.post(userRoutes.sendChat, chatSendData)
        return response
    } catch (error) {
        console.error(error);
        throw error
    }
}

export const getChatApi = async (senderId: string, receiverId: string) => {
    try {
        console.log('sender id ', senderId , ' --- ', 'reciverid ', receiverId)
        if (receiverId == null) return 
        const response = await Api.get(`${userRoutes.getChat}?senderId=${senderId}&receiverId=${receiverId}`)
        return response
    } catch (error) {
        console.error(error);
        throw error
    }
}

export const fetchAllUserNotification = async (userId: string) => {
    try {
        const response = await Api.get(`${userRoutes.fetchAllUserNotification}?userId=${userId}`)
        return response
    } catch (error) {
        console.error(error);
        throw error
    }
}

export const notificationSeenApi = async (Data: Data) =>{
    try {
        const response = await Api.post(userRoutes.notificationSeen, Data)
        return response
    } catch (error) {
        console.error(error);
        throw error
    }
}

export const notificationCountApi = async (userId: string) => {
    try {
        const response = await Api.get(`${userRoutes.notificationCount}?userId=${userId}`)
        return response
    } catch (error) {
        console.error(error);
        throw error
    }
}

export const chatUserSearchApi = async (searchText: string) => {
    try {
        const response = await Api.get(`${userRoutes.chatUserSearch}?searchText=${searchText}`)
        return response
    } catch(error) {
        console.error(error);
        throw error
    }
}

export const EditProfileDataApi = async (data) => {
    try {
        const response = await Api.post(userRoutes.editUserProfile, data)
        return response
    } catch (error) {
        console.error(error);
        throw error
    }
}