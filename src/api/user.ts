// import { QueryFunctionContext } from "@tanstack/react-query";
import Api from '../services/axios';
import userRoutes from '../services/endpoints/userEndPoints';
import { userFormData } from "../@types/Tuser";


export const signup = async (userData: userFormData) => {
    try {
        
        const response = await Api.post(userRoutes.signup, userData)
        return response
    } catch (error) {
        console.error(error);
        
    }
};
