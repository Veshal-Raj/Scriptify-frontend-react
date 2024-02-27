import Api from "../services/axios";
import adminRoutes from "../services/endpoints/adminEndPoints";



export const getAllUsers = async (role: string) => {
    try {
        const response = await Api.get(adminRoutes.getAllUsers, role);

        return response?.data
    } catch (error) {
        console.error(error);
        throw error
    }
}