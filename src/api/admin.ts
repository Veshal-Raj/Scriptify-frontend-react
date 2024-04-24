import Api from "../services/axios";
import adminRoutes from "../services/endpoints/adminEndPoints";

interface BlogStatus {
  blogId: string;
 }

export const getAllUsers = async () => {
  try {
    const response = await Api.get(adminRoutes.getAllUsers);
    return response?.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const changeUserStatus = async (userId: string | null) => {
  try {
    return await Api.post(
      `${adminRoutes.changeUserStatus}/${userId}`
    );
  } catch (error) {
    console.error(error);
    throw error;
  }
};


export const getAllBlogsApi = async () => {
  try {
    const response = await Api.get(adminRoutes.getAllBlogs)
    return response?.data
  } catch (error) {
    console.error(error);
    throw error
  }
}

export const changeBlogStatusApi = async (data: BlogStatus) => {
  try {
    return await Api.post(adminRoutes.changeBlogStatus, data)
  } catch (error) {
    console.error(error);
    throw error
  }
}

export const getAllReportsApi = async () => {
  try {
    return await Api.get(adminRoutes.getAllReports)
  } catch (error) {
    console.error(error);
    throw error
  }
}