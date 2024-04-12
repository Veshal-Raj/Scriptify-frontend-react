import Api from '../services/axios';
import userRoutes from "../services/endpoints/userEndPoints";



export const fetchAllUsersApi = async () => {
    try {
        const response = await Api.get(userRoutes.fetchAllUsers)
        return response
    } catch (error) {
        console.error(error);
        throw error
    }
}