import Api from '../services/axios';
import userRoutes from '../services/endpoints/userEndPoints';
import { userFormData } from "../@types/Tuser";

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