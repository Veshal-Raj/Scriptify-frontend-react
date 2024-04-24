import Api from "../services/axios";
import userRoutes from "../services/endpoints/userEndPoints";
import { userFormData } from "../@types/Tuser";
import { IConversation } from "../@types/Tchat";
import { BlogData, ChangePasswordData, CommentData, Data, FollowUserData, ForgotPasswordData, GoogleAuthData, IncreaseReadCountData, SubscriptionData, UpdatedUserData, UserOTP, changePasswordLoggedData, reportBlogData } from "../@types/TuserApi";


export const signup = async (userData: userFormData) => {
  try {
    const response = await Api.post(userRoutes.signup, userData);
    return response?.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const verifyOTP = async (userOTP: UserOTP) => {
  try {
    return await Api.post(userRoutes.verifyOTP, userOTP);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const login = async (userData: userFormData) => {
  try {
    return await Api.post(userRoutes.login, userData);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getLatestBlog = async (page = 1) => {
  try {
    const response = await Api.get(userRoutes.latestBlog, { params: { page } });
    return response?.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getTrendingBlogs = async () => {
  try {
    const response = await Api.get(userRoutes.trendingBlog);
    return response?.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createBlog = async () => {
  try {
    return await Api.post(userRoutes.createBlog);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchTags = async () => {
  try {
    return await Api.get(userRoutes.exploreTags);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const filterbyTags = async (tag:  {
  tag: string;
}) => {
  try {
    return await Api.post(userRoutes.filterbyTags, {tag});
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const searchQuery = async (query: string) => {
  try {
    return await Api.get(`${userRoutes.search}?query=${query}`);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const profileDetails = async (userId: string) => {
  try {
    return await Api.post(userRoutes.profileDetails, userId);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchUserBlogs = async (userId: string) => {
  try {
    return await Api.get(`${userRoutes.fetchUserBlogs}?query=${userId}`);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchSingleBlog = async (blogId: string) => {
  try {
    return await Api.get(`${userRoutes.fetchSingleBlog}?query=${blogId}`);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchSimilarBlogs = async (tags: string[]) => {
  try {
    return await Api.post(userRoutes.fetchSimilarBlogs, tags);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const increaseReadCount = async (data: IncreaseReadCountData) => {
  try {
    return await Api.post(userRoutes.increaseReadCount, data);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const followUserApi = async (data: FollowUserData) => {
  try {
    return await Api.post(userRoutes.followUser, data);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const unfollowUserApi = async (data: FollowUserData) => {
  try {
    return await Api.post(userRoutes.unfollowUser, data);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const likeBlogApi = async (data: BlogData) => {
  try {
    return await Api.post(userRoutes.likeBlog, data);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const unLikeBlogApi = async (data: BlogData) => {
  try {
    return await Api.post(userRoutes.unlikeBlog, data);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const initialLikeApi = async (userId: string, blogId: string) => {
  try {
    return await Api.get(
      `${userRoutes.initialLike}?userId=${userId}&blogId=${blogId}`
    );
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const saveBlogApi = async (data: BlogData) => {
  try {
    return await Api.post(userRoutes.saveBlog, data);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const unSaveBlogApi = async (data: BlogData) => {
  try {
    return await Api.post(userRoutes.unSaveBlog, data);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const savedBlogsApi = async (userId: string) => {
  try {
    return await Api.get(`${userRoutes.savedBlogs}?userId=${userId}`);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const listFollowersApi = async (userId: string) => {
  try {
    return await Api.get(`${userRoutes.listFollowers}?userId=${userId}`);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const listFollowingsApi = async (userId: string) => {
  try {
    return await Api.get(`${userRoutes.listFollowings}?userId=${userId}`);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const addCommentApi = async (data: CommentData) => {
  try {
    return await Api.post(userRoutes.addComment, data);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const initialCommentsApi = async (blogId: string) => {
  try {
    return await Api.get(`${userRoutes.initialComments}?blogId=${blogId}`);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const reportBlogApi = async (data: reportBlogData) => {
  try {
    return await Api.post(userRoutes.reportBlog, data);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const checkUserSubscribedApi = async (userId: string) => {
  try {
    return await Api.post(userRoutes.checkUserSubscribed, userId);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const monthlySubscriptionApi = async (data: SubscriptionData) => {
  try {
    return await Api.post(userRoutes.monthlySubscription, data);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const annualSubscriptionApi = async (data: SubscriptionData) => {
  try {
    return await Api.post(userRoutes.annualSubscription, data);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const reciptUrlApi = async (userId: string) => {
  try {
    return await Api.get(`${userRoutes.reciptUrl}?userId=${userId}`);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const sendChatApi = async (chatSendData: IConversation) => {
  try {
    return await Api.post(userRoutes.sendChat, chatSendData);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getChatApi = async (senderId: string, receiverId: string) => {
  try {
    if (receiverId == null) return;
    return await Api.get(
      `${userRoutes.getChat}?senderId=${senderId}&receiverId=${receiverId}`
    );
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchAllUserNotification = async (userId: string) => {
  try {
    return await Api.get(
      `${userRoutes.fetchAllUserNotification}?userId=${userId}`
    );
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const notificationSeenApi = async (Data: Data) => {
  try {
    return await Api.post(userRoutes.notificationSeen, Data);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const notificationCountApi = async (userId: string) => {
  try {
    return await Api.get(`${userRoutes.notificationCount}?userId=${userId}`);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const chatUserSearchApi = async (searchText: string) => {
  try {
    return await Api.get(
      `${userRoutes.chatUserSearch}?searchText=${searchText}`
    );
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const EditProfileDataApi = async (data: UpdatedUserData) => {
  try {
    return await Api.post(userRoutes.editUserProfile, data);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const changePasswordApi = async (data: changePasswordLoggedData) => {
  try {
    return await Api.put(userRoutes.changePassword, data);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const ForgotPasswordEmailApi = async (data: ForgotPasswordData) => {
  try {
    return await Api.post(userRoutes.forgotPasswordEmail, data);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const forgotPasswordOtpApi = async (otp: UserOTP) => {
  try {
    return await Api.post(userRoutes.forgotPasswordOtp, otp);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const changePasswordNotLoggedInApi = async (
  data: ChangePasswordData
) => {
  try {
    return await Api.post(userRoutes.changePasswordNotLoggedIn, data);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const resentOtpApi = async () => {
  try {
    return await Api.get(userRoutes.resendOtp);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const googleAuthUserApi = async (data: GoogleAuthData) => {
  try {
    return await Api.post(userRoutes.googleAuthUser, data);
  } catch (error) {
    console.error(error);
    throw error;
  }
};