import Api from "../services/axios";
import adminRoutes from "../services/endpoints/adminEndPoints";



export const getAllUsers = async () => {
    try {
        const response = await Api.get(adminRoutes.getAllUsers);
        return response?.data
    } catch (error) {
        console.error(error);
        throw error
    }
}

export const changeUserStatus = async ( userId: string |  null) => {
    console.log('user id -->> ', userId)
    try {
        const response = await Api.post(`${adminRoutes.changeUserStatus}/${userId}`);
        return response
    } catch (error) {
        console.error(error);
        throw error
    }
}