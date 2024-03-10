import Api from '../services/axios';
import userRoutes from '../services/endpoints/userEndPoints';
import { userFormData } from "../@types/Tuser";

type UserOTP = {
    otp: string;
  };

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

export const getLatestBlog = async () => {
    try {
        const response = await Api.get(userRoutes.latestBlog)
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